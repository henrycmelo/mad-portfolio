'use client';

import { Box, Grid, VStack, Text, Image, Flex } from '@chakra-ui/react';
import { Badge } from '@/components/ui/Badges';
import type { Project } from '@/lib/types';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const visibleProjects = projects
    .filter(p => p.is_visible)
    .sort((a, b) => a.order_index - b.order_index);

  if (visibleProjects.length === 0) return null;

  return (
    <Box>
      <Text
        as="h2"
        fontSize={{ base: '32px', sm: '36px', md: '42px', lg: '48px' }}
        fontWeight="400"
        color="text.primary"
        pb="6"
      >
        Recent Projects
      </Text>

      <Grid
        w="full"
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)', '2xl': 'repeat(3, 1fr)' }}
        gap={{ base: '6', md: '6' }}
      >
        {visibleProjects.map((project) => (
          <Box
            key={project.id}
            color="text.primary"
            border="1px solid"
            borderColor="border.dark"
            boxShadow="md"
            transition="transform 0.3s ease-in-out"
            css={{
              '&:hover': {
                transform: 'scale(1.05)',
                cursor: 'pointer',
              },
            }}
            maxW="lg"
          >
            <VStack
              m="8"
              textAlign="start"
              justifyContent="flex-start"
              alignItems="start"
              gap="2"
            >
              {/* Project Image */}
              {project.image && (
                <Box w="full" h={{ base: '180px', md: '200px' }} overflow="hidden" mb="4" bg="bg.secondary" display="flex" alignItems="center" justifyContent="center">
                  <Image
                    src={project.image}
                    alt={project.title}
                    maxW="full"
                    maxH="full"
                    css={{
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              )}

              {/* Title */}
              <Box h="4.5em" overflow="hidden">
                <Text
                  fontSize={{ base: '16px', sm: '18px', md: '20px' }}
                  fontWeight="800"
                  lineClamp={2}
                >
                  {project.title}
                </Text>
              </Box>

              {/* Description */}
              <Box h="6em">
                <Text
                  fontSize={{ base: '12px', md: '14px' }}
                  fontWeight="400"
                  color="text.tertiary"
                  lineClamp={4}
                >
                  {project.short_description}
                </Text>
              </Box>

              {/* Technology Badges */}
              {project.technologies && project.technologies.length > 0 && (
                <Flex gap="2" flexWrap="wrap" h="4em">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index}>{tech}</Badge>
                  ))}
                </Flex>
              )}
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
