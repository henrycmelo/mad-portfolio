import { createClient } from '@/lib/supabase/server';
import {
  sanitizeHero,
  sanitizeAbout,
  sanitizeProject,
  sanitizeWorkHistory,
  sanitizeContact,
} from '@/lib/sanitizeContent';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageSection } from '@/components/layout/PageSection';
import { LandingSection } from '@/components/sections/LandingSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { BackgroundSection } from '@/components/sections/BackgroundSection';
import { AboutMeSection } from '@/components/sections/AboutMeSection';
import { ContactSection } from '@/components/sections/ContactSection';
import type {
  HeroContent,
  AboutContent,
  Project,
  WorkHistory,
  ContactContent,
} from '@/lib/types';

async function getPortfolioData() {
  const supabase = await createClient();

  const [heroData, aboutData, projectsData, workHistoryData, contactData] =
    await Promise.all([
      supabase.from('mad_hero_content').select('*').single(),
      supabase.from('mad_about_content').select('*').single(),
      supabase.from('mad_projects').select('*').order('order_index'),
      supabase.from('mad_work_history').select('*').order('start_date', { ascending: false }),
      supabase.from('mad_contact_content').select('*').single(),
    ]);

  // Sanitised here rather than in the components: every rich-text field below
  // is rendered with dangerouslySetInnerHTML, and writing is not the only way
  // content reaches these tables. See lib/sanitizeContent.ts.
  return {
    hero: sanitizeHero(heroData.data as HeroContent | null),
    about: sanitizeAbout(aboutData.data as AboutContent | null),
    projects: ((projectsData.data as Project[]) || []).map(sanitizeProject),
    workHistory: ((workHistoryData.data as WorkHistory[]) || []).map(
      sanitizeWorkHistory
    ),
    contact: sanitizeContact(contactData.data as ContactContent | null),
  };
}

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <MainLayout
      profileImage={data.hero?.profile_image}
      contactEmail={data.contact?.email}
      linkedinUrl={data.contact?.linkedin_url}
    >
      {/* Landing - extra top padding clears the fixed mobile menu */}
      <PageSection id="home" pt={{ base: '16', md: '24' }} pb="24">
        {data.hero && (
          <LandingSection
            content={data.hero}
            contactEmail={data.contact?.email}
            linkedinUrl={data.contact?.linkedin_url}
          />
        )}
      </PageSection>

      <PageSection id="projects" surface="frost">
        {data.projects.length > 0 && <ProjectsSection projects={data.projects} />}
      </PageSection>

      <PageSection id="career">
        {data.workHistory.length > 0 && <BackgroundSection workHistory={data.workHistory} />}
      </PageSection>

      <PageSection id="aboutme" surface="frost">
        {data.about && <AboutMeSection content={data.about} />}
      </PageSection>

      <PageSection id="contact" pt={{ base: '24', md: '28' }} pb={{ base: '24', md: '28' }}>
        {data.contact && <ContactSection content={data.contact} />}
      </PageSection>
    </MainLayout>
  );
}
