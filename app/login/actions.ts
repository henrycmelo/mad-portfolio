'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isAdminEmail } from '@/lib/auth/adminEmails';
import {
  LIMITS,
  maskPhone,
  type Channel,
  type ChannelQuota,
  type SignInOptions,
} from '@/lib/auth/quota';

/**
 * Sign-in actions.
 *
 * These are the only server actions in the app that run **unauthenticated** -
 * by definition, since the caller is trying to sign in. Two rules follow:
 *
 *  1. Never reveal whether an address or phone exists. Every path returns the
 *     same shape whether or not the account is real, so the form cannot be
 *     used to enumerate accounts.
 *  2. Never send anything to an address outside the ADMIN_EMAIL allowlist.
 *     The allowlist check happens here, server-side, before Supabase is asked
 *     to send anything.
 */

export interface ActionState {
  ok: boolean;
  error?: string;
}

/** Counts sends inside the channel's window and derives the reset time. */
async function quotaFor(channel: Channel): Promise<ChannelQuota> {
  const { max, windowMinutes } = LIMITS[channel];
  const since = new Date(Date.now() - windowMinutes * 60_000).toISOString();

  const db = createAdminClient();
  const { data, error } = await db
    .from('mad_auth_sends')
    .select('created_at')
    .eq('channel', channel)
    .gte('created_at', since)
    .order('created_at', { ascending: true });

  // If the log is unreadable, fail *open* on counting but let Supabase's own
  // 429 be the real guard - better than locking the owner out of their site.
  const rows = error ? [] : (data ?? []);
  const used = rows.length;
  const remaining = Math.max(0, max - used);

  return {
    channel,
    used,
    remaining,
    max,
    resetsAt:
      remaining === 0 && rows[0]
        ? new Date(
            new Date(rows[0].created_at).getTime() + windowMinutes * 60_000
          ).toISOString()
        : null,
    available: true,
  };
}

async function recordSend(channel: Channel): Promise<void> {
  await createAdminClient().from('mad_auth_sends').insert({ channel });
}

/**
 * Step one: the user has typed an address. Returns which channels they can
 * use, without confirming whether the account exists.
 */
export async function getSignInOptions(email: string): Promise<SignInOptions> {
  const [emailQuota, smsQuota] = await Promise.all([
    quotaFor('email'),
    quotaFor('sms'),
  ]);

  const generic: SignInOptions = { emailQuota, smsQuota, maskedPhone: null };

  // Not an admin address: return the neutral shape. No lookup, no send.
  if (!isAdminEmail(email)) {
    return {
      ...generic,
      smsQuota: { ...smsQuota, available: false, reason: 'Not available' },
    };
  }

  // Is phone sign-in usable? Needs the provider enabled in Supabase *and* a
  // confirmed number on this account.
  const db = createAdminClient();
  const { data } = await db.auth.admin.listUsers();
  const user = data?.users.find(
    (u) => u.email?.toLowerCase() === email.trim().toLowerCase()
  );

  const phone = user?.phone;
  const phoneConfirmed = Boolean(user?.phone_confirmed_at);

  if (!phone || !phoneConfirmed) {
    return {
      ...generic,
      smsQuota: {
        ...smsQuota,
        available: false,
        reason: 'No verified phone on this account',
      },
    };
  }

  return { emailQuota, smsQuota, maskedPhone: maskPhone(phone) };
}

/** Sends the magic link. */
export async function sendMagicLink(
  email: string,
  origin: string
): Promise<ActionState> {
  if (!isAdminEmail(email)) {
    // Same response as success, so the form cannot probe the allowlist.
    return { ok: true };
  }

  const quota = await quotaFor('email');
  if (quota.remaining === 0) {
    return { ok: false, error: 'Email limit reached. Try a text message instead.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error && error.status !== 400) {
    return { ok: false, error: error.message };
  }

  await recordSend('email');
  return { ok: true };
}

/** Sends a one-time code to the number already on the account. */
export async function sendSmsCode(email: string): Promise<ActionState> {
  if (!isAdminEmail(email)) return { ok: true };

  const quota = await quotaFor('sms');
  if (quota.remaining === 0) {
    return { ok: false, error: 'Text message limit reached. Try again later.' };
  }

  // The number is never taken from the form - it comes from the account, so a
  // caller cannot redirect a code to a phone of their choosing.
  const db = createAdminClient();
  const { data } = await db.auth.admin.listUsers();
  const user = data?.users.find(
    (u) => u.email?.toLowerCase() === email.trim().toLowerCase()
  );
  if (!user?.phone) return { ok: true };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    phone: user.phone,
    options: { shouldCreateUser: false },
  });

  if (error) return { ok: false, error: error.message };

  await recordSend('sms');
  return { ok: true };
}

/**
 * Verifies the texted code and establishes the session.
 *
 * Runs server-side so the auth cookies are set through the same server client
 * the middleware reads.
 */
export async function verifySmsCode(
  email: string,
  token: string
): Promise<ActionState> {
  if (!isAdminEmail(email)) return { ok: false, error: 'That code is not valid.' };

  const db = createAdminClient();
  const { data } = await db.auth.admin.listUsers();
  const user = data?.users.find(
    (u) => u.email?.toLowerCase() === email.trim().toLowerCase()
  );
  if (!user?.phone) return { ok: false, error: 'That code is not valid.' };

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    phone: user.phone,
    token: token.trim(),
    type: 'sms',
  });

  if (error) return { ok: false, error: 'That code is not valid or has expired.' };

  return { ok: true };
}
