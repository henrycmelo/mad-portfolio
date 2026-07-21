'use client';

import { Box, VStack, Text, Flex } from '@chakra-ui/react';
import { CustomizedButton } from '@/components/ui/CustomizedButton';
import { MuteButton } from '@/components/ui/MuteButton';
import type { HeroContent } from '@/lib/types';

interface LandingSectionProps {
  content: HeroContent;
}

export function LandingSection({ content }: LandingSectionProps) {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <VStack align="start" gap="6" w="full" maxW="1280px">
      <Text fontSize="md" color="text.tertiary">
        Hi, I&apos;m Madeline
      </Text>
      <Text
        as="h1"
        textStyle="h1"
        color="text.primary"
      >
        {content.title}
        {content.subtitle && (
          <Box as="span" color="accent.teal">
            {' '}{content.subtitle}
          </Box>
        )}
      </Text>
      {content.description && (
        <Text textStyle="body" color="text.tertiary">
          {content.description}
        </Text>
      )}

      <Flex gap="4" flexWrap="wrap">
        <CustomizedButton onClick={() => scrollToSection('projects')}>
          {content.cta_text || 'See My Work'}
        </CustomizedButton>
        <MuteButton onClick={() => scrollToSection('contact')}>
          Let&apos;s Talk
        </MuteButton>
      </Flex>
    </VStack>
  );
}
