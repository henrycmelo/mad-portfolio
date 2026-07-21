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
      textStyle="caption"
      color="text.inverse"
      bg="text.tertiary"
      borderRadius="md"
    >
      {children}
    </Box>
  );
}
