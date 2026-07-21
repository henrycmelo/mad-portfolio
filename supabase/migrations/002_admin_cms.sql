-- Madeline Portfolio - Admin CMS migration
--
-- 1. Adds the `logos` column that the app already reads but 001 never created.
-- 2. Narrows write access from "any authenticated user" to the admin allowlist.
-- 3. Adds storage policies so admins can upload images.
--
-- Safe to re-run: every object is dropped or replaced first.
--
-- TO ADD OR REMOVE AN ADMIN: edit mad_is_admin() below and re-run this file,
-- then update ADMIN_EMAIL in .env.local (and in Netlify) to match.

-- ---------------------------------------------------------------------------
-- 1. Schema drift
-- ---------------------------------------------------------------------------

ALTER TABLE mad_work_history
  ADD COLUMN IF NOT EXISTS logos JSONB DEFAULT '[]'::jsonb;

-- ---------------------------------------------------------------------------
-- 2. The allowlist
--
-- One function, so the addresses live in exactly one place instead of being
-- repeated across ten policies. Must stay in sync with ADMIN_EMAIL, which is
-- the comma-separated list the app checks before rendering the CMS.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION mad_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public, auth
AS $$
  SELECT lower(coalesce(auth.jwt() ->> 'email', '')) IN (
    'nelsonmad3@gmail.com',
    'henrycastillome@gmail.com'
  );
$$;

-- ---------------------------------------------------------------------------
-- 3. Admin-scoped write policies
--
-- 001 used `auth.role() = 'authenticated'`, which lets ANY signed-in user of
-- this Supabase project write to these tables. Since the project may be shared
-- with other apps, scope writes to the admin identities instead.
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "Authenticated users can modify" ON mad_hero_content;
DROP POLICY IF EXISTS "Authenticated users can modify" ON mad_about_content;
DROP POLICY IF EXISTS "Authenticated users can modify" ON mad_stats;
DROP POLICY IF EXISTS "Authenticated users can modify" ON mad_projects;
DROP POLICY IF EXISTS "Authenticated users can modify" ON mad_work_history;
DROP POLICY IF EXISTS "Authenticated users can modify" ON mad_contact_content;
DROP POLICY IF EXISTS "Authenticated users can modify" ON mad_site_settings;

DROP POLICY IF EXISTS "Admin can modify" ON mad_hero_content;
DROP POLICY IF EXISTS "Admin can modify" ON mad_about_content;
DROP POLICY IF EXISTS "Admin can modify" ON mad_stats;
DROP POLICY IF EXISTS "Admin can modify" ON mad_projects;
DROP POLICY IF EXISTS "Admin can modify" ON mad_work_history;
DROP POLICY IF EXISTS "Admin can modify" ON mad_contact_content;
DROP POLICY IF EXISTS "Admin can modify" ON mad_site_settings;

CREATE POLICY "Admin can modify" ON mad_hero_content
  FOR ALL TO authenticated USING (mad_is_admin()) WITH CHECK (mad_is_admin());

CREATE POLICY "Admin can modify" ON mad_about_content
  FOR ALL TO authenticated USING (mad_is_admin()) WITH CHECK (mad_is_admin());

CREATE POLICY "Admin can modify" ON mad_stats
  FOR ALL TO authenticated USING (mad_is_admin()) WITH CHECK (mad_is_admin());

CREATE POLICY "Admin can modify" ON mad_projects
  FOR ALL TO authenticated USING (mad_is_admin()) WITH CHECK (mad_is_admin());

CREATE POLICY "Admin can modify" ON mad_work_history
  FOR ALL TO authenticated USING (mad_is_admin()) WITH CHECK (mad_is_admin());

CREATE POLICY "Admin can modify" ON mad_contact_content
  FOR ALL TO authenticated USING (mad_is_admin()) WITH CHECK (mad_is_admin());

CREATE POLICY "Admin can modify" ON mad_site_settings
  FOR ALL TO authenticated USING (mad_is_admin()) WITH CHECK (mad_is_admin());

-- ---------------------------------------------------------------------------
-- 4. Storage policies for the mad-portfolio-images bucket
--
-- A public bucket grants public READ. Uploads still require an explicit policy.
-- Create the bucket first (Storage -> New bucket -> mad-portfolio-images,
-- public) or uncomment the insert below.
-- ---------------------------------------------------------------------------

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('mad-portfolio-images', 'mad-portfolio-images', true)
-- ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Admin can upload portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete portfolio images" ON storage.objects;

CREATE POLICY "Admin can upload portfolio images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'mad-portfolio-images' AND mad_is_admin());

CREATE POLICY "Admin can update portfolio images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'mad-portfolio-images' AND mad_is_admin());

CREATE POLICY "Admin can delete portfolio images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'mad-portfolio-images' AND mad_is_admin());

-- ---------------------------------------------------------------------------
-- Verify: run while signed in as an admin (or from the SQL editor, where it
-- returns false because there is no JWT).
-- ---------------------------------------------------------------------------
-- SELECT mad_is_admin();
