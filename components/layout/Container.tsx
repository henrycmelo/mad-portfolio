import { Box } from '@chakra-ui/react';

interface ContainerProps {
  children: React.ReactNode;
  maxW?: string;
}

export function Container({ children, maxW = '1200px' }: ContainerProps) {
  return (
    <Box
      maxW={maxW}
      mx="auto"
      px={{ base: '4', md: '6', lg: '8' }}
      w="full"
    >
      {children}
    </Box>
  );
}
