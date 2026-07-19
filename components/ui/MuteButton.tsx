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
      color="#212529"
      backgroundColor="transparent"
      border="1px solid #212529"
      borderRadius="10px"
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
          backgroundColor: '#E9ECEF',
          color: '#212529',
        },
      }}
    >
      {children}
    </Button>
  );
}
