'use client';

import { Box, Grid, Text, Image, VStack } from '@chakra-ui/react';
import type { AboutContent } from '@/lib/types';

interface AboutMeSectionProps {
  content: AboutContent;
}

export function AboutMeSection({ content }: AboutMeSectionProps) {
  return (
    <Box>
      <Text
        as="h2"
        fontSize={{ base: '32px', sm: '36px', md: '42px', lg: '48px' }}
        fontWeight="400"
        color="text.primary"
        pb="6"
      >
        {content.heading || 'About Me'}
      </Text>

      <Grid
        w="full"
        templateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }}
        gap={{ base: '6', md: '6', '2xl': '24' }}
      >
        {/* Left column - Bio text */}
        <Box>
          <Box
            color="text.tertiary"
            dangerouslySetInnerHTML={{ __html: content.bio }}
            css={{
              '& p': {
                marginBottom: '1.5rem',
                fontSize: 'clamp(16px, 2vw, 20px)',
                fontWeight: 400,
                lineHeight: 1.7,
              },
              '& strong': {
                fontWeight: 800,
                color: 'var(--chakra-colors-text-primary)',
              },
              '& h3, & h4': {
                fontSize: 'clamp(16px, 2vw, 20px)',
                fontWeight: 800,
                color: 'var(--chakra-colors-text-primary)',
                marginBottom: '0.5rem',
              },
              '& a': {
                textDecoration: 'underline',
                color: 'var(--chakra-colors-accent-teal)',
              },
            }}
          />
        </Box>

        {/* Right column - Profile Image */}
        <Box>
          {content.profile_image ? (
            <Box
              maxW="400px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              bg="bg.surface"
            >
              <Image
                src={content.profile_image}
                alt="About Madeline"
                objectFit="cover"
                w="full"
              />
            </Box>
          ) : (
            <Box
              maxW="400px"
              borderRadius="lg"
              bg="bg.secondary"
              h="400px"
            />
          )}

          {/* Skills section */}
          {content.skills && content.skills.length > 0 && (
            <VStack align="start" mt="6" gap="2">
              <Text fontSize={{ base: '16px', md: '18px' }} fontWeight="800" color="text.primary">
                Core Skills
              </Text>
              <Box display="flex" flexWrap="wrap" gap="2">
                {content.skills.map((skill, index) => (
                  <Box
                    key={index}
                    px="3"
                    py="1"
                    fontSize={{ base: '12px', md: '14px' }}
                    fontWeight="400"
                    color="text.inverse"
                    bg="text.tertiary"
                    borderRadius="md"
                  >
                    {skill}
                  </Box>
                ))}
              </Box>
            </VStack>
          )}
        </Box>
      </Grid>
    </Box>
  );
}
