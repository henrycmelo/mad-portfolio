-- Madeline Portfolio Database Schema
-- Initial migration for all content tables
-- All tables prefixed with "mad_" for easy identification

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Hero Section Content
CREATE TABLE mad_hero_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cta_text TEXT,
  cta_link TEXT,
  background_image TEXT,
  profile_image TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About Section
CREATE TABLE mad_about_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  heading TEXT NOT NULL,
  bio TEXT NOT NULL, -- Rich text HTML from TipTap
  profile_image TEXT,
  skills JSONB DEFAULT '[]'::jsonb, -- Array of skills
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stats/Metrics
CREATE TABLE mad_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Icon name from react-icons
  order_index INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects
CREATE TABLE mad_projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT, -- Rich text HTML from TipTap
  image TEXT,
  technologies JSONB DEFAULT '[]'::jsonb, -- Array of tech tags
  metrics JSONB DEFAULT '[]'::jsonb, -- Array of {label, value} objects
  order_index INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Work History
CREATE TABLE mad_work_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL for current position
  is_current BOOLEAN DEFAULT false,
  description TEXT, -- Rich text HTML from TipTap
  achievements JSONB DEFAULT '[]'::jsonb, -- Array of bullet points
  skills_used JSONB DEFAULT '[]'::jsonb, -- Array of skills
  order_index INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Information
CREATE TABLE mad_contact_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  heading TEXT NOT NULL,
  subheading TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  github_url TEXT,
  location TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Settings
CREATE TABLE mad_site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_title TEXT DEFAULT 'Madeline Portfolio',
  site_description TEXT,
  primary_color TEXT DEFAULT '#1A365D',
  secondary_color TEXT DEFAULT '#319795',
  accent_color TEXT DEFAULT '#4299E1',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE mad_hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE mad_about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE mad_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE mad_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE mad_work_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE mad_contact_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE mad_site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for all content
CREATE POLICY "Public read access" ON mad_hero_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON mad_about_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON mad_stats FOR SELECT USING (true);
CREATE POLICY "Public read access" ON mad_projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON mad_work_history FOR SELECT USING (true);
CREATE POLICY "Public read access" ON mad_contact_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON mad_site_settings FOR SELECT USING (true);

-- Authenticated users can modify (admin only)
CREATE POLICY "Authenticated users can modify" ON mad_hero_content
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify" ON mad_about_content
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify" ON mad_stats
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify" ON mad_projects
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify" ON mad_work_history
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify" ON mad_contact_content
  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify" ON mad_site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert default/placeholder content
INSERT INTO mad_hero_content (title, subtitle, description, cta_text, cta_link)
VALUES (
  'Madeline',
  'Customer Success Professional & Educational Leader',
  'Combining customer success expertise with educational program leadership to drive impact and build meaningful relationships.',
  'Get in Touch',
  '#contact'
);

INSERT INTO mad_about_content (heading, bio, skills)
VALUES (
  'About Me',
  '<p>Community School Director overseeing non-academic programs for a NYC public school. Previously worked in Customer Success at ed-tech companies and Success Academy.</p><p>I specialize in building relationships, driving adoption, and creating programs that deliver measurable impact.</p>',
  '["Customer Success", "Program Management", "Stakeholder Relations", "Data Analysis", "Educational Technology"]'::jsonb
);

INSERT INTO mad_contact_content (heading, subheading, email, location)
VALUES (
  'Let''s Connect',
  'I''m always open to discussing new opportunities in customer success',
  'madeline@example.com',
  'New York, NY'
);

-- Create storage bucket for images (run this in Supabase dashboard)
-- CREATE BUCKET mad-portfolio-images WITH (public = true);
