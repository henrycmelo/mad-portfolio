import { Box } from '@chakra-ui/react';
import { createClient } from '@/lib/supabase/server';
import { MainLayout } from '@/components/layout/MainLayout';
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

  return {
    hero: heroData.data as HeroContent | null,
    about: aboutData.data as AboutContent | null,
    projects: (projectsData.data as Project[]) || [],
    workHistory: (workHistoryData.data as WorkHistory[]) || [],
    contact: contactData.data as ContactContent | null,
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
      {/* Landing Section */}
      <section>
        <Box id="home" pb="16" px="12" pt={{ base: '32', md: '16' }}>
          {data.hero && <LandingSection content={data.hero} />}
        </Box>
      </section>

      {/* Divider */}
      <Box w="full" h="1px" bg="border.default" />

      {/* Projects Section */}
      <section>
        <Box id="projects" py="16" px="12">
          {data.projects.length > 0 && <ProjectsSection projects={data.projects} />}
        </Box>
      </section>

      {/* Divider */}
      <Box w="full" h="1px" bg="border.default" />

      {/* Background */}
      <section>
        <Box id="career" py="16" px="12">
          {data.workHistory.length > 0 && <BackgroundSection workHistory={data.workHistory} />}
        </Box>
      </section>

      {/* Divider */}
      <Box w="full" h="1px" bg="border.default" />

      {/* About Me */}
      <section>
        <Box id="aboutme" py="16" px="12">
          {data.about && <AboutMeSection content={data.about} />}
        </Box>
      </section>

      {/* Divider */}
      <Box w="full" h="1px" bg="border.default" />

      {/* Contact + Footer */}
      <section>
        <Box id="contact" py={{ base: '24', md: '32' }} px="12" minH="50vh" display="flex" alignItems="center">
          {data.contact && <ContactSection content={data.contact} />}
        </Box>
      </section>
    </MainLayout>
  );
}
