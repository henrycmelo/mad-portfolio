import { Box, Heading, Text, Image, HStack, Badge, VStack } from '@chakra-ui/react';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      shadow="md"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        shadow: 'lg',
        transform: 'translateY(-4px)',
      }}
    >
      {project.image && (
        <Box position="relative" h="200px" overflow="hidden">
          <Image
            src={project.image}
            alt={project.title}
            w="full"
            h="full"
            objectFit="cover"
          />
        </Box>
      )}

      <Box p="6">
        <VStack align="start" gap="3">
          <Heading
            as="h3"
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="bold"
            color="brand.primary.900"
          >
            {project.title}
          </Heading>

          {project.short_description && (
            <Text fontSize="md" color="text.secondary">
              {project.short_description}
            </Text>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <HStack gap="2" flexWrap="wrap">
              {project.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  colorScheme="teal"
                  fontSize="xs"
                  px="2"
                  py="1"
                  borderRadius="md"
                >
                  {tech}
                </Badge>
              ))}
            </HStack>
          )}

          {project.metrics && project.metrics.length > 0 && (
            <Box mt="2" w="full">
              {project.metrics.map((metric, index) => (
                <HStack key={index} justifyContent="space-between" mt="1">
                  <Text fontSize="sm" color="text.secondary">
                    {metric.label}:
                  </Text>
                  <Text fontSize="sm" fontWeight="semibold" color="brand.secondary.500">
                    {metric.value}
                  </Text>
                </HStack>
              ))}
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
