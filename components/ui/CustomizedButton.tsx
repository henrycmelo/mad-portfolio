'use client';

import { Button } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface CustomizedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  width?: string;
}

export function CustomizedButton({ children, onClick, type = 'button', loading, width }: CustomizedButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      loading={loading}
      w={width}
      color="text.inverse"
      borderRadius="10px"
      border="1px solid"
      borderColor="accent.teal"
      backgroundColor="text.primary"
      fontWeight="800"
      px="6"
      py="6"
      fontSize={{ base: '16px', md: '18px' }}
      shadow="lg"
      textTransform="capitalize"
      cursor="pointer"
      transition="all 0.2s"
      css={{
        '&:hover': {
          backgroundColor: 'var(--chakra-colors-text-secondary)',
        },
      }}
    >
      {children}
    </Button>
  );
}
