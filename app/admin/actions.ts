'use server';

import { revalidatePath } from 'next/cache';
import { getAdmin } from '@/lib/auth/requireAdmin';
import { sanitizeRichText } from '@/lib/sanitize';

const BUCKET = 'mad-portfolio-images';

export interface ActionResult {
  ok: boolean;
  error?: string;
  /** Public URL, returned by uploadImage. */
  url?: string;
}

const UNAUTHORIZED: ActionResult = {
  ok: false,
  error: 'Your session expired. Please sign in again.',
};

/** Revalidates the public homepage plus the admin page that was just saved. */
function revalidateAll(adminPath?: string) {
  revalidatePath('/');
  if (adminPath) revalidatePath(adminPath);
}

/* -------------------------------------------------------------------------- */
/* Field helpers                                                              */
/* -------------------------------------------------------------------------- */

function rich(formData: FormData, key: string): string {
  return sanitizeRichText(formData.get(key)?.toString() ?? '');
}

function plain(formData: FormData, key: string): string {
  return formData.get(key)?.toString().trim() ?? '';
}

/** Optional plain field - empty string becomes null so the column stays clean. */
function nullable(formData: FormData, key: string): string | null {
  return plain(formData, key) || null;
}

function bool(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === 'true' || value === 'on' || value === '1';
}

function number(formData: FormData, key: string, fallback = 0): number {
  const parsed = Number(formData.get(key));
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** JSON-encoded string arrays produced by TagListInput. */
function stringArray(formData: FormData, key: string): string[] {
  const raw = formData.get(key)?.toString();
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((item) => String(item).trim()).filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

/* -------------------------------------------------------------------------- */
/* Single-row sections                                                        */
/* -------------------------------------------------------------------------- */

export async function updateHero(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const admin = await getAdmin();
  if (!admin) return UNAUTHORIZED;

  const { error } = await admin.supabase
    .from('mad_hero_content')
    .update({
      greeting: rich(formData, 'greeting'),
      title: rich(formData, 'title'),
      subtitle: rich(formData, 'subtitle'),
      description: rich(formData, 'description'),
      cta_text: nullable(formData, 'cta_text'),
      cta_link: nullable(formData, 'cta_link'),
      profile_image: nullable(formData, 'profile_image'),
      background_image: nullable(formData, 'background_image'),
      updated_at: new Date().toISOString(),
    })
    .eq('id', plain(formData, 'id'));

  if (error) return { ok: false, error: error.message };

  revalidateAll('/admin/hero');
  return { ok: true };
}

export async function updateAbout(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const admin = await getAdmin();
  if (!admin) return UNAUTHORIZED;

  const { error } = await admin.supabase
    .from('mad_about_content')
    .update({
      heading: rich(formData, 'heading'),
      bio: rich(formData, 'bio'),
      profile_image: nullable(formData, 'profile_image'),
      skills: stringArray(formData, 'skills'),
      updated_at: new Date().toISOString(),
    })
    .eq('id', plain(formData, 'id'));

  if (error) return { ok: false, error: error.message };

  revalidateAll('/admin/about');
  return { ok: true };
}

export async function updateContact(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const admin = await getAdmin();
  if (!admin) return UNAUTHORIZED;

  const email = plain(formData, 'email');
  if (!email) return { ok: false, error: 'An email address is required.' };

  const { error } = await admin.supabase
    .from('mad_contact_content')
    .update({
      heading: rich(formData, 'heading'),
      subheading: nullable(formData, 'subheading'),
      email,
      phone: nullable(formData, 'phone'),
      linkedin_url: nullable(formData, 'linkedin_url'),
      twitter_url: nullable(formData, 'twitter_url'),
      github_url: nullable(formData, 'github_url'),
      location: nullable(formData, 'location'),
      updated_at: new Date().toISOString(),
    })
    .eq('id', plain(formData, 'id'));

  if (error) return { ok: false, error: error.message };

  revalidateAll('/admin/contact');
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export async function saveProject(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const admin = await getAdmin();
  if (!admin) return UNAUTHORIZED;

  const id = plain(formData, 'id');
  const row = {
    title: rich(formData, 'title'),
    short_description: rich(formData, 'short_description'),
    full_description: rich(formData, 'full_description'),
    image: nullable(formData, 'image'),
    technologies: stringArray(formData, 'technologies'),
    order_index: number(formData, 'order_index'),
    is_visible: bool(formData, 'is_visible'),
    updated_at: new Date().toISOString(),
  };

  const { error } = id
    ? await admin.supabase.from('mad_projects').update(row).eq('id', id)
    : await admin.supabase.from('mad_projects').insert(row);

  if (error) return { ok: false, error: error.message };

  revalidateAll('/admin/projects');
  return { ok: true };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  const admin = await getAdmin();
  if (!admin) return UNAUTHORIZED;

  const { error } = await admin.supabase.from('mad_projects').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };

  revalidateAll('/admin/projects');
  return { ok: true };
}

export async function moveProject(
  id: string,
  direction: 'up' | 'down'
): Promise<ActionResult> {
  return swapOrder('mad_projects', id, direction, '/admin/projects');
}

/* -------------------------------------------------------------------------- */
/* Work history                                                                */
/* -------------------------------------------------------------------------- */

export async function saveWorkHistory(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const admin = await getAdmin();
  if (!admin) return UNAUTHORIZED;

  const company = plain(formData, 'company');
  const startDate = plain(formData, 'start_date');
  if (!company) return { ok: false, error: 'Company is required.' };
  if (!startDate) return { ok: false, error: 'A start date is required.' };

  const isCurrent = bool(formData, 'is_current');
  const id = plain(formData, 'id');

  const row = {
    company,
    position: rich(formData, 'position'),
    location: nullable(formData, 'location'),
    start_date: startDate,
    end_date: isCurrent ? null : nullable(formData, 'end_date'),
    is_current: isCurrent,
    description: rich(formData, 'description'),
    achievements: stringArray(formData, 'achievements'),
    skills_used: stringArray(formData, 'skills_used'),
    logos: stringArray(formData, 'logos'),
    order_index: number(formData, 'order_index'),
    is_visible: bool(formData, 'is_visible'),
    updated_at: new Date().toISOString(),
  };

  const { error } = id
    ? await admin.supabase.from('mad_work_history').update(row).eq('id', id)
    : await admin.supabase.from('mad_work_history').insert(row);

  if (error) return { ok: false, error: error.message };

  revalidateAll('/admin/background');
  return { ok: true };
}

export async function deleteWorkHistory(id: string): Promise<ActionResult> {
  const admin = await getAdmin();
  if (!admin) return UNAUTHORIZED;

  const { error } = await admin.supabase
    .from('mad_work_history')
    .delete()
    .eq('id', id);
  if (error) return { ok: false, error: error.message };

  revalidateAll('/admin/background');
  return { ok: true };
}

export async function moveWorkHistory(
  id: string,
  direction: 'up' | 'down'
): Promise<ActionResult> {
  return swapOrder('mad_work_history', id, direction, '/admin/background');
}

/**
 * Swaps order_index with the adjacent row. Both list sections sort by
 * order_index on the public site, so this is what reordering means.
 */
async function swapOrder(
  table: 'mad_projects' | 'mad_work_history',
  id: string,
  direction: 'up' | 'down',
  adminPath: string
): Promise<ActionResult> {
  const admin = await getAdmin();
  if (!admin) return UNAUTHORIZED;

  const { data: rows, error: listError } = await admin.supabase
    .from(table)
    .select('id, order_index')
    .order('order_index');

  if (listError) return { ok: false, error: listError.message };
  if (!rows) return { ok: false, error: 'Nothing to reorder.' };

  const index = rows.findIndex((row) => row.id === id);
  const target = direction === 'up' ? index - 1 : index + 1;
  if (index === -1 || target < 0 || target >= rows.length) {
    return { ok: true }; // Already at the end - nothing to do.
  }

  // Rewrite the whole list to 0..n-1 so duplicate or missing indexes from
  // hand-edited rows can't make reordering a no-op.
  const reordered = [...rows];
  [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

  for (let position = 0; position < reordered.length; position++) {
    const { error } = await admin.supabase
      .from(table)
      .update({ order_index: position })
      .eq('id', reordered[position].id);
    if (error) return { ok: false, error: error.message };
  }

  revalidateAll(adminPath);
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/* Images                                                                      */
/* -------------------------------------------------------------------------- */

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];

export async function uploadImage(formData: FormData): Promise<ActionResult> {
  const admin = await getAdmin();
  if (!admin) return UNAUTHORIZED;

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: 'No file selected.' };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: 'Images must be 5 MB or smaller.' };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { ok: false, error: 'Use a JPG, PNG, WebP, GIF or SVG image.' };
  }

  const folder = plain(formData, 'folder') || 'uploads';
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
  const path = `${folder}/${Date.now()}-${safeName}`;

  const { error } = await admin.supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) return { ok: false, error: error.message };

  const {
    data: { publicUrl },
  } = admin.supabase.storage.from(BUCKET).getPublicUrl(path);

  return { ok: true, url: publicUrl };
}
