'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import * as Icons from 'react-icons/fa';

interface StatCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

export function StatCard({ value, label, description, icon }: StatCardProps) {
  // Dynamically get icon component
  const IconComponent = icon ? (Icons as any)[icon] : null;

  return (
    <Box
      bg="white"
      p={{ base: '6', md: '8' }}
      borderRadius="lg"
      shadow="md"
      textAlign="center"
      transition="all 0.2s"
      _hover={{
        shadow: 'lg',
        transform: 'translateY(-4px)',
      }}
    >
      <VStack gap="3">
        {IconComponent && (
          <Box color="brand.secondary.500">
            <IconComponent size={40} />
          </Box>
        )}

        <Heading
          as="h3"
          fontSize={{ base: '3xl', md: '4xl' }}
          fontWeight="bold"
          color="brand.primary.900"
        >
          {value}
        </Heading>

        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          fontWeight="semibold"
          color="text.primary"
        >
          {label}
        </Text>

        {description && (
          <Text
            fontSize="sm"
            color="text.secondary"
            mt="1"
          >
            {description}
          </Text>
        )}
      </VStack>
    </Box>
  );
}
