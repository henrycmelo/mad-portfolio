'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, VStack, Text, Image, Flex } from '@chakra-ui/react';
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

export function VerticalProgressBar({ profileImage, contactEmail, linkedinUrl }: VerticalProgressBarProps) {
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
    >
      {/* Avatar + Name */}
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        py="12"
        align="center"
        textTransform="capitalize"
        w="90%"
        gap="3"
      >
        <Box
          w="48px"
          h="48px"
          borderRadius="full"
          overflow="hidden"
          flexShrink={0}
        >
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Madeline"
              w="full"
              h="full"
              objectFit="cover"
            />
          ) : (
            <Box w="full" h="full" bg="border.default" />
          )}
        </Box>
        <Box textAlign={{ base: 'center', lg: 'left' }}>
          <Text
            fontSize={{ base: '16px', md: '18px', lg: '20px' }}
            fontWeight="800"
            color="text.primary"
          >
            Madeline
          </Text>
          <Text
            fontSize={{ base: '12px', md: '14px' }}
            fontWeight="400"
            color="text.tertiary"
          >
            Strategic Partnerships & Operations
          </Text>
        </Box>
      </Flex>

      {/* Divider */}
      <Box w="full" h="3px" bg="text.primary" />

      {/* Navigation Items */}
      {sections.map((section) => (
        <Box
          key={section.id}
          w="full"
          onClick={() => scrollToSection(section.id)}
          color={activeSection === section.id ? 'text.inverse' : 'text.secondary'}
          fontWeight={activeSection === section.id ? 'bold' : 'normal'}
          backgroundColor={activeSection === section.id ? 'text.primary' : 'transparent'}
          cursor="pointer"
          transition="background-color 0.3s"
          py="6"
          px="6"
          display="flex"
          justifyContent={{ base: 'center', lg: 'start' }}
          alignItems="center"
          fontSize={{ base: '12px', md: '14px' }}
        >
          <Box display="flex" alignItems="center" gap="2" textTransform="capitalize">
            <FontAwesomeIcon icon={section.icon} size="lg" />
            <Box as="span" display={{ base: 'none', lg: 'inline' }}>
              {section.label}
            </Box>
          </Box>
        </Box>
      ))}

      {/* Spacer */}
      <Box flex="1" />

      {/* Divider */}
      <Box w="full" h="3px" bg="text.primary" />

      {/* Social Links */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        p="6"
        gap="6"
        color="text.tertiary"
        alignItems="center"
      >
        {contactEmail && (
          <a href={`mailto:${contactEmail}`} title={contactEmail}>
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
          </a>
        )}
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
        )}
      </Flex>
    </VStack>
  );
}
