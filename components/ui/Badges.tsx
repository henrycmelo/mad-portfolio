'use client';

import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <Box
      as="span"
      display="inline-block"
      px="3"
      py="1"
      fontSize={{ base: '12px', md: '14px' }}
      fontWeight="400"
      color="#E9ECEF"
      bg="gray.600"
      borderRadius="md"
    >
      {children}
    </Box>
  );
}
