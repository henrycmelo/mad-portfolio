'use client';

import { Grid, Box } from '@chakra-ui/react';
import { VerticalProgressBar } from './VerticalProgressBar';
import { ResponsiveMenu } from './ResponsiveMenu';

interface MainLayoutProps {
  children: React.ReactNode;
  profileImage?: string;
  contactEmail?: string;
  linkedinUrl?: string;
}

export function MainLayout({ children, profileImage, contactEmail, linkedinUrl }: MainLayoutProps) {
  return (
    <Grid
      templateColumns={{ base: '1fr', md: '230px 1fr', lg: '280px 1fr' }}
      h="100vh"
      alignItems="start"
      w="full"
      overflow="hidden"
    >
      {/* Sidebar - Desktop only. A 1px border replaces the old 3px black
          divider column, matching the admin shell. */}
      <Box
        display={{ base: 'none', md: 'block' }}
        position="sticky"
        h="fit-content"
        borderRightWidth="1px"
        borderColor="border.default"
      >
        <VerticalProgressBar
          profileImage={profileImage}
          contactEmail={contactEmail}
          linkedinUrl={linkedinUrl}
        />
      </Box>

      {/* Mobile menu - Mobile only */}
      <Box display={{ base: 'block', md: 'none' }} position="fixed" top="0" left="0" right="0" zIndex="1400">
        <ResponsiveMenu
          profileImage={profileImage}
          contactEmail={contactEmail}
          linkedinUrl={linkedinUrl}
        />
      </Box>

      {/* Scrollable Content Area */}
      <Box overflowY="auto" h="100vh" data-scroll-container="true">
        {children}
      </Box>
    </Grid>
  );
}
