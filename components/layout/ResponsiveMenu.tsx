'use client';

import { useState } from 'react';
import { Box, Flex, Text, VStack, Image } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faClose,
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

interface ResponsiveMenuProps {
  profileImage?: string;
  contactEmail?: string;
  linkedinUrl?: string;
}

export function ResponsiveMenu({ profileImage, contactEmail, linkedinUrl }: ResponsiveMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  };

  return (
    <Box as="nav" position="relative">
      {/* Mobile Header */}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bg="bg.primary"
        zIndex="1400"
        boxShadow="lg"
      >
        <Flex justify="space-between" align="center" py="4" px="4">
          <Flex gap="3" align="center">
            <Box w="40px" h="40px" borderRadius="full" overflow="hidden" flexShrink={0}>
              {profileImage ? (
                <Image src={profileImage} alt="Madeline" w="full" h="full" objectFit="cover" />
              ) : (
                <Box w="full" h="full" bg="border.default" borderRadius="full" />
              )}
            </Box>
            <Box>
              <Text fontSize={{ base: '16px', md: '18px' }} fontWeight="800" color="text.primary">
                Madeline
              </Text>
              <Text fontSize="12px" fontWeight="400" color="text.tertiary">
                Strategic Partnerships & Operations
              </Text>
            </Box>
          </Flex>
          <Box
            as="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            p="2"
            cursor="pointer"
          >
            <FontAwesomeIcon icon={isOpen ? faClose : faBars} size="lg" />
          </Box>
        </Flex>

        {/* Divider line */}
        <Box w="full" h="3px" bg="text.primary" />

        {/* Collapse Menu */}
        {isOpen && (
          <Box bg="bg.primary" color="text.secondary" boxShadow="lg">
            <VStack gap="0" w="full">
              {sections.map((section) => (
                <Box
                  key={section.id}
                  w="full"
                  py="4"
                  px="6"
                  cursor="pointer"
                  onClick={() => scrollToSection(section.id)}
                  fontSize={{ base: '12px', md: '14px' }}
                  transition="all 0.2s"
                  css={{
                    '&:hover': {
                      backgroundColor: 'var(--chakra-colors-text-primary)',
                      color: 'var(--chakra-colors-text-inverse)',
                    },
                  }}
                >
                  <Flex gap="3" textTransform="capitalize" align="center">
                    <FontAwesomeIcon icon={section.icon} size="lg" />
                    <Text>{section.label}</Text>
                  </Flex>
                </Box>
              ))}

              {/* Divider */}
              <Box w="full" h="3px" bg="text.primary" />

              {/* Social links */}
              <Flex direction="row" p="6" gap="6" color="text.tertiary" justify="center" w="full">
                {contactEmail && (
                  <a href={`mailto:${contactEmail}`}>
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                  </a>
                )}
                {linkedinUrl && (
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </a>
                )}
              </Flex>
            </VStack>

            {/* Bottom divider */}
            <Box w="full" h="3px" bg="text.primary" />
          </Box>
        )}
      </Box>
    </Box>
  );
}
