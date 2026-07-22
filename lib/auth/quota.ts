/**
 * Sign-in send quotas.
 *
 * Supabase enforces these server-side and only tells us via a 429. Mirroring
 * them here lets the UI disable a channel *before* the user spends an attempt,
 * and show when it frees up.
 *
 * If you change a limit in Supabase, change it here too - nothing keeps them
 * in step automatically.
 */
export type Channel = 'email' | 'sms';

export interface ChannelLimit {
  /** How many sends are allowed inside the window. */
  max: number;
  /** Window length in minutes. */
  windowMinutes: number;
}

export const LIMITS: Record<Channel, ChannelLimit> = {
  // Supabase's built-in SMTP. Custom SMTP would lift this substantially.
  email: { max: 2, windowMinutes: 60 },
  // Twilio via Supabase.
  sms: { max: 30, windowMinutes: 60 },
};

export interface ChannelQuota {
  channel: Channel;
  used: number;
  remaining: number;
  max: number;
  /** ISO timestamp when the oldest send in the window ages out, if exhausted. */
  resetsAt: string | null;
  /** False when the channel is not configured in Supabase at all. */
  available: boolean;
  /** Why it cannot be used, for the UI to show. */
  reason?: string;
}

export interface SignInOptions {
  emailQuota: ChannelQuota;
  smsQuota: ChannelQuota;
  /** e.g. "•••• •••• 89" - never the full number. */
  maskedPhone: string | null;
}

/** Masks a phone number for display: +14155550189 -> "••• ••• 0189". */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const tail = digits.slice(-4);
  return `••• ••• ${tail}`;
}
