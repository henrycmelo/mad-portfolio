/**
 * TypeScript interfaces for all data models
 */

export interface HeroContent {
  id: string;
  /** Small line above the headline, e.g. "Hi, I'm Madeline". HTML from TipTap. */
  greeting?: string;
  title: string;
  subtitle?: string;
  description?: string;
  cta_text?: string;
  cta_link?: string;
  background_image?: string;
  profile_image?: string;
  updated_at: string;
}

export interface AboutContent {
  id: string;
  heading: string;
  bio: string; // HTML string from TipTap
  profile_image?: string;
  skills?: string[];
  updated_at: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  description?: string;
  icon?: string; // Icon name from react-icons
  order_index: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  short_description?: string;
  full_description?: string; // HTML string from TipTap
  image?: string;
  technologies?: string[]; // Array of tech tags
  metrics?: ProjectMetric[]; // Key achievements
  order_index: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface WorkHistory {
  id: string;
  company: string;
  position: string;
  location?: string;
  start_date: string; // ISO date string
  end_date?: string; // ISO date string, null for current position
  is_current: boolean;
  description?: string; // HTML string from TipTap
  achievements?: string[]; // Array of bullet points
  skills_used?: string[]; // Array of skills
  logos?: string[]; // Array of company logo URLs
  order_index: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactContent {
  id: string;
  heading: string;
  subheading?: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  twitter_url?: string;
  github_url?: string;
  location?: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  site_description?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  updated_at: string;
}

// Form types for admin CMS
export interface HeroFormData extends Omit<HeroContent, 'id' | 'updated_at'> {}
export interface AboutFormData extends Omit<AboutContent, 'id' | 'updated_at'> {}
export interface StatFormData extends Omit<Stat, 'id' | 'created_at' | 'updated_at'> {}
export interface ProjectFormData extends Omit<Project, 'id' | 'created_at' | 'updated_at'> {}
export interface WorkHistoryFormData extends Omit<WorkHistory, 'id' | 'created_at' | 'updated_at'> {}
export interface ContactFormData extends Omit<ContactContent, 'id' | 'updated_at'> {}
