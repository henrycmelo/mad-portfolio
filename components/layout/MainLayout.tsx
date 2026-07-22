'use client';

import { Box } from '@chakra-ui/react';
import { SiteNav } from './SiteNav';

interface MainLayoutProps {
  children: React.ReactNode;
  profileImage?: string;
  contactEmail?: string;
  linkedinUrl?: string;
}

/**
 * Public site shell: a sticky top nav over a normally-scrolling document.
 *
 * This used to be a grid with a fixed left rail whose content area was its own
 * scroll container. The document scrolls now, which is what lets the nav's
 * scroll-spy listen to the window.
 */
export function MainLayout({ children, profileImage, contactEmail }: MainLayoutProps) {
  return (
    <Box minH="100vh" bg="bg.primary">
      <SiteNav profileImage={profileImage} contactEmail={contactEmail} />
      <Box as="main">{children}</Box>
    </Box>
  );
}
