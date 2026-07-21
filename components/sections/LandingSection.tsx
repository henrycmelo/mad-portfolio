'use client';

import { Box, Button, VStack, Flex } from '@chakra-ui/react';
import { RichText } from '@/components/ui/RichText';
import type { HeroContent } from '@/lib/types';

interface LandingSectionProps {
  content: HeroContent;
}

export function LandingSection({ content }: LandingSectionProps) {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Width is owned by PageSection now - no local max-width here.
  return (
    <VStack align="start" gap="6" w="full">
      {/* Greeting, headline and continuation are three separate CMS fields.
          The greeting used to be hardcoded here. */}
      <RichText
        html={content.greeting}
        spacing="tight"
        textStyle="label"
        color="text.secondary"
      />

      <Box as="h1" textStyle="display" color="text.primary">
        <RichText html={content.title} spacing="inline" />
        {content.subtitle && (
          <>
            {' '}
            <RichText html={content.subtitle} spacing="inline" color="accent.coral" />
          </>
        )}
      </Box>
      <RichText
        html={content.description}
        textStyle="body"
        color="text.tertiary"
      />

      <Flex gap="4" flexWrap="wrap">
        <Button
          variant="solid"
          size="lg"
          borderRadius="md"
          onClick={() => scrollToSection('projects')}
        >
          {content.cta_text || 'See My Work'}
        </Button>
        <Button
          variant="outline"
          size="lg"
          borderRadius="md"
          onClick={() => scrollToSection('contact')}
        >
          Let&apos;s Talk
        </Button>
      </Flex>
    </VStack>
  );
}
