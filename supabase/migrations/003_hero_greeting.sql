-- Madeline Portfolio - hero greeting
--
-- The hero opens with three separate pieces:
--   greeting  "Hi, I'm Madeline"   - small line above the headline
--   title     the headline
--   subtitle  the headline continuation, runs on from the headline in coral
--
-- The greeting used to be hardcoded in components/sections/LandingSection.tsx,
-- so it could not be edited from the CMS. This gives it a column.
--
-- Safe to re-run.

ALTER TABLE mad_hero_content
  ADD COLUMN IF NOT EXISTS greeting TEXT;

-- Restore the line that was previously hardcoded, for any row that has none.
UPDATE mad_hero_content
   SET greeting = '<p>Hi, I''m Madeline</p>'
 WHERE greeting IS NULL OR greeting = '';
