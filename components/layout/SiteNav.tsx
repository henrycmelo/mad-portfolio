'use client';

import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  IconButton,
  Portal,
  Text,
} from '@chakra-ui/react';
import { LuMenu, LuMail } from 'react-icons/lu';
import { PAGE_MAX_WIDTH } from './PageSection';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'career', label: 'Background' },
  { id: 'aboutme', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

/** Keep in sync with the nav height and PageSection's scrollMarginTop. */
export const NAV_HEIGHT = '72px';

interface SiteNavProps {
  profileImage?: string;
  contactEmail?: string;
}

export function SiteNav({ profileImage, contactEmail }: SiteNavProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Scroll-spy against the window. The old sidebar watched a dedicated
   * scroll container; with a top nav the document itself scrolls.
   */
  useEffect(() => {
    const handleScroll = () => {
      // At the very bottom, the last section may be too short to ever cross
      // the trigger line - select it explicitly.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;
      if (atBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      const triggerPoint = window.innerHeight / 3;
      let current = sections[0].id;

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerPoint && rect.bottom >= 0) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <Box
      as="header"
      data-testid="site-nav"
      position="sticky"
      top="0"
      zIndex="1400"
      bg="bg.surface"
      borderBottomWidth="1px"
      borderColor="border.default"
    >
      <Flex
        maxW={PAGE_MAX_WIDTH}
        mx="auto"
        h={NAV_HEIGHT}
        align="center"
        justify="space-between"
        gap="4"
        px={{ base: '6', md: '10', lg: '12' }}
      >
        {/* Identity */}
        <Flex
          as="button"
          align="center"
          gap="3"
          minW="0"
          cursor="pointer"
          onClick={() => scrollToSection('home')}
          aria-label="Back to top"
        >
          <Avatar.Root size="sm" shape="full" colorPalette="brand" flexShrink={0}>
            <Avatar.Fallback name="Madeline" />
            {profileImage && <Avatar.Image src={profileImage} alt="" />}
          </Avatar.Root>
          <Text textStyle="label" color="text.primary" truncate>
            Madeline
          </Text>
        </Flex>

        {/* Section links - desktop */}
        <Flex
          as="nav"
          data-testid="nav-links"
          display={{ base: 'none', lg: 'flex' }}
          align="center"
          gap="1"
        >
          {sections.map((section) => {
            const active = activeSection === section.id;
            return (
              <Button
                key={section.id}
                data-testid={`nav-link-${section.id}`}
                variant="ghost"
                colorPalette="brand"
                size="sm"
                px="3"
                borderRadius="base"
                textStyle="appUI"
                color={active ? 'accent.brand' : 'text.secondary'}
                fontWeight={active ? 'semibold' : 'normal'}
                aria-current={active ? 'true' : undefined}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </Button>
            );
          })}
        </Flex>

        {/* Actions */}
        <Flex align="center" gap="2" flexShrink={0}>
          {contactEmail && (
            <Button
              asChild
              variant="solid"
              colorPalette="brand"
              borderRadius="button"
              display={{ base: 'none', md: 'inline-flex' }}
            >
              <a href={`mailto:${contactEmail}`}>
                Email me
                <LuMail />
              </a>
            </Button>
          )}

          {/* Mobile menu */}
          <Drawer.Root open={menuOpen} onOpenChange={(e) => setMenuOpen(e.open)}>
            <Drawer.Trigger asChild>
              <IconButton
                data-testid="nav-menu-trigger"
                aria-label="Open menu"
                variant="ghost"
                colorPalette="brand"
                display={{ base: 'inline-flex', lg: 'none' }}
              >
                <LuMenu />
              </IconButton>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title textStyle="label">Menu</Drawer.Title>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Header>
                  <Drawer.Body>
                    <Flex direction="column" align="stretch" gap="1">
                      {sections.map((section) => (
                        <Button
                          key={section.id}
                          variant="ghost"
                          colorPalette="brand"
                          justifyContent="flex-start"
                          textStyle="appUI"
                          color={
                            activeSection === section.id
                              ? 'accent.brand'
                              : 'text.secondary'
                          }
                          onClick={() => scrollToSection(section.id)}
                        >
                          {section.label}
                        </Button>
                      ))}
                      {contactEmail && (
                        <Button
                          asChild
                          variant="solid"
                          colorPalette="brand"
                          borderRadius="button"
                          mt="3"
                        >
                          <a href={`mailto:${contactEmail}`}>
                            Email me
                            <LuMail />
                          </a>
                        </Button>
                      )}
                    </Flex>
                  </Drawer.Body>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </Flex>
      </Flex>
    </Box>
  );
}
