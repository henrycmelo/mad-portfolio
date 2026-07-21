'use client';

import { Badge, Box, Card, Grid, Heading, Image, Flex } from '@chakra-ui/react';
import { RichText } from '@/components/ui/RichText';
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
      <Heading as="h2" textStyle="h2" color="text.primary" pb="6">
        Recent Projects
      </Heading>

      <Grid
        w="full"
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)', '2xl': 'repeat(3, 1fr)' }}
        gap="6"
      >
        {visibleProjects.map((project) => (
          <Card.Root key={project.id} variant="elevated" maxW="lg" overflow="hidden">
            {project.image && (
              <Box
                w="full"
                h={{ base: '180px', md: '200px' }}
                bg="bg.warm"
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
              >
                <Image
                  src={project.image}
                  alt=""
                  maxW="full"
                  maxH="full"
                  objectFit="contain"
                />
              </Box>
            )}

            <Card.Body gap="3">
              <Box minH="3em">
                <RichText html={project.title} spacing="tight" textStyle="bodyBold" />
              </Box>

              <Box minH="5em">
                <RichText
                  html={project.short_description}
                  spacing="tight"
                  textStyle="caption"
                  color="text.secondary"
                />
              </Box>

              {project.technologies && project.technologies.length > 0 && (
                <Flex gap="2" wrap="wrap">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="subtle" colorPalette="brand">
                      {tech}
                    </Badge>
                  ))}
                </Flex>
              )}
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </Box>
  );
}
