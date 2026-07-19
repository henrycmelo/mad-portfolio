import { Box, Heading, Text, HStack, VStack, Badge } from '@chakra-ui/react';
import { format } from 'date-fns';
import type { WorkHistory } from '@/lib/types';

interface TimelineItemProps {
  item: WorkHistory;
  isLast?: boolean;
}

export function TimelineItem({ item, isLast = false }: TimelineItemProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy');
  };

  const dateRange = item.is_current
    ? `${formatDate(item.start_date)} - Present`
    : `${formatDate(item.start_date)} - ${item.end_date ? formatDate(item.end_date) : 'Present'}`;

  return (
    <Box position="relative" pb={isLast ? '0' : '12'}>
      {/* Timeline line */}
      {!isLast && (
        <Box
          position="absolute"
          left="4"
          top="8"
          bottom="0"
          w="0.5"
          bg="gray.200"
        />
      )}

      <HStack align="start" gap="6">
        {/* Timeline dot */}
        <Box
          position="relative"
          zIndex="1"
          w="8"
          h="8"
          borderRadius="full"
          bg="brand.secondary.500"
          border="4px solid"
          borderColor="white"
          shadow="md"
          flexShrink="0"
          mt="1"
        />

        {/* Content */}
        <Box flex="1" bg="white" p="6" borderRadius="lg" shadow="md">
          <VStack align="start" gap="3">
            <Box>
              <Heading
                as="h3"
                fontSize={{ base: 'lg', md: 'xl' }}
                fontWeight="bold"
                color="brand.primary.900"
              >
                {item.position}
              </Heading>
              <Text
                fontSize="md"
                fontWeight="semibold"
                color="brand.secondary.500"
                mt="1"
              >
                {item.company}
              </Text>
              <HStack gap="2" mt="2" flexWrap="wrap">
                <Text fontSize="sm" color="text.secondary">
                  {dateRange}
                </Text>
                {item.location && (
                  <>
                    <Text fontSize="sm" color="text.tertiary">•</Text>
                    <Text fontSize="sm" color="text.secondary">
                      {item.location}
                    </Text>
                  </>
                )}
              </HStack>
            </Box>

            {item.description && (
              <Box
                fontSize="sm"
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: item.description }}
                css={{
                  '& p': { marginBottom: '0.5rem' },
                  '& ul': { paddingLeft: '1rem', marginBottom: '0.5rem' },
                  '& li': { marginBottom: '0.25rem' },
                }}
              />
            )}

            {item.achievements && item.achievements.length > 0 && (
              <Box w="full">
                <Text fontSize="sm" fontWeight="semibold" color="text.primary" mb="2">
                  Key Achievements:
                </Text>
                <VStack align="start" gap="1">
                  {item.achievements.map((achievement, index) => (
                    <HStack key={index} align="start" gap="2">
                      <Text fontSize="sm" color="brand.secondary.500">•</Text>
                      <Text fontSize="sm" color="text.secondary">
                        {achievement}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            )}

            {item.skills_used && item.skills_used.length > 0 && (
              <HStack gap="2" flexWrap="wrap" mt="2">
                {item.skills_used.map((skill, index) => (
                  <Badge
                    key={index}
                    colorScheme="blue"
                    fontSize="xs"
                    px="2"
                    py="1"
                    borderRadius="md"
                  >
                    {skill}
                  </Badge>
                ))}
              </HStack>
            )}
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}
