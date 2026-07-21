'use client';

import { useState } from 'react';
import { Box, Flex, Image, Separator, Text, VStack } from '@chakra-ui/react';
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
        bg="bg.warm"
        zIndex="1400"
        boxShadow="raised"
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
              <Text textStyle="bodyBold" color="text.primary">
                Madeline
              </Text>
              <Text textStyle="caption" color="text.tertiary">
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
        <Separator borderColor="border.default" />

        {/* Collapse Menu */}
        {isOpen && (
          <Box bg="bg.warm" color="text.secondary" boxShadow="overlay">
            <VStack gap="0" w="full">
              {sections.map((section) => (
                <Box
                  key={section.id}
                  w="full"
                  py="4"
                  px="6"
                  cursor="pointer"
                  onClick={() => scrollToSection(section.id)}
                  textStyle="appUI"
                  transition="all 0.2s"
                  _hover={{ bg: 'bg.surface', color: 'accent.brand' }}
                >
                  <Flex gap="3" textTransform="capitalize" align="center">
                    <FontAwesomeIcon icon={section.icon} size="lg" />
                    <Text>{section.label}</Text>
                  </Flex>
                </Box>
              ))}

              {/* Divider */}
              <Separator borderColor="border.default" w="full" />

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
            <Separator borderColor="border.default" />
          </Box>
        )}
      </Box>
    </Box>
  );
}
