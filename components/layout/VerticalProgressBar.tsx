'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faTimeline,
  faUser,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Section {
  id: string;
  label: string;
  icon: IconDefinition;
}

const sections: Section[] = [
  { id: 'home', label: 'Home', icon: faHome },
  { id: 'projects', label: 'Projects', icon: faBriefcase },
  { id: 'career', label: 'Background', icon: faTimeline },
  { id: 'aboutme', label: 'About Me', icon: faUser },
  { id: 'contact', label: 'Contact', icon: faEnvelope },
];

interface VerticalProgressBarProps {
  profileImage?: string;
  contactEmail?: string;
  linkedinUrl?: string;
}

export function VerticalProgressBar({
  profileImage,
  contactEmail,
  linkedinUrl,
}: VerticalProgressBarProps) {
  const [activeSection, setActiveSection] = useState('');
  const contentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    contentRef.current = document.querySelector('[data-scroll-container="true"]');
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const container = contentRef.current;

    const handleScroll = () => {
      if (!container) return;

      // If scrolled to the bottom, activate the last section
      const isAtBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 50;
      if (isAtBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      let currentSection = '';
      const containerRect = container.getBoundingClientRect();
      const triggerPoint = containerRect.top + containerRect.height / 3;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= triggerPoint && rect.bottom >= containerRect.top) {
            currentSection = section.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <VStack
      position="sticky"
      top="0"
      left="0"
      zIndex="10"
      h="100vh"
      gap="0"
      align="stretch"
      bg="bg.warm"
    >
      {/* Avatar + Name */}
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        py="10"
        px="6"
        align="center"
        gap="3"
      >
        <Avatar.Root size="lg" shape="full" flexShrink={0} colorPalette="brand">
          <Avatar.Fallback name="Madeline" />
          {profileImage && <Avatar.Image src={profileImage} alt="Madeline" />}
        </Avatar.Root>

        <Box textAlign={{ base: 'center', lg: 'left' }} minW="0">
          <Text textStyle="bodyBold" color="text.primary">
            Madeline
          </Text>
          <Text textStyle="caption" color="text.secondary">
            Strategic Partnerships &amp; Operations
          </Text>
        </Box>
      </Flex>

      <Separator borderColor="border.default" />

      {/* Navigation */}
      <VStack as="nav" align="stretch" gap="0" py="2">
        {sections.map((section) => {
          const active = activeSection === section.id;
          return (
            <Button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              variant={active ? 'subtle' : 'ghost'}
              colorPalette="brand"
              justifyContent={{ base: 'center', lg: 'flex-start' }}
              gap="3"
              px="6"
              py="6"
              borderRadius="none"
              borderLeftWidth="3px"
              borderLeftColor={active ? 'accent.brand' : 'transparent'}
              color={active ? 'accent.brand' : 'text.secondary'}
              fontWeight={active ? 'semibold' : 'normal'}
              textStyle="appUI"
              aria-current={active ? 'true' : undefined}
            >
              <FontAwesomeIcon icon={section.icon} size="lg" />
              <Box as="span" display={{ base: 'none', lg: 'inline' }}>
                {section.label}
              </Box>
            </Button>
          );
        })}
      </VStack>

      <Box flex="1" />

      <Separator borderColor="border.default" />

      {/* Social links */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        p="6"
        gap="2"
        align="center"
        justify={{ base: 'center', lg: 'flex-start' }}
      >
        {contactEmail && (
          <IconButton
            asChild
            aria-label={`Email ${contactEmail}`}
            title={contactEmail}
            variant="ghost"
            colorPalette="brand"
            size="sm"
          >
            <Link href={`mailto:${contactEmail}`}>
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </Link>
          </IconButton>
        )}
        {linkedinUrl && (
          <IconButton
            asChild
            aria-label="LinkedIn profile"
            title="LinkedIn"
            variant="ghost"
            colorPalette="brand"
            size="sm"
          >
            <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </Link>
          </IconButton>
        )}
      </Flex>
    </VStack>
  );
}
