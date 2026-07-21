'use client';

import { Button } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface MuteButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function MuteButton({ children, onClick, type = 'button' }: MuteButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      color="text.primary"
      backgroundColor="transparent"
      border="1px solid"
      borderColor="text.primary"
      borderRadius="10px"
      textStyle="button"
      px="6"
      py="6"
      shadow="lg"
      textTransform="capitalize"
      cursor="pointer"
      transition="all 0.2s"
      css={{
        '&:hover': {
          backgroundColor: 'var(--chakra-colors-bg-secondary)',
          color: 'var(--chakra-colors-text-primary)',
        },
      }}
    >
      {children}
    </Button>
  );
}
