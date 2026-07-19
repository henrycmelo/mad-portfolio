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
      templateColumns={{ base: '1fr', md: '230px 3px 1fr', lg: '320px 3px 1fr' }}
      h="100vh"
      alignItems="start"
      w="full"
      overflow="hidden"
    >
      {/* Sidebar - Desktop only */}
      <Box display={{ base: 'none', md: 'block' }} position="sticky" h="fit-content">
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

      {/* Vertical Divider - Desktop only */}
      <Box display={{ base: 'none', md: 'block' }} w="3px" bg="text.primary" h="100vh" />

      {/* Scrollable Content Area */}
      <Box overflowY="auto" h="100vh" data-scroll-container="true">
        {children}
      </Box>
    </Grid>
  );
}
