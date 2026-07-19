import { Heading, Text, Box } from '@chakra-ui/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <Box mb={{ base: '8', md: '12' }} textAlign={centered ? 'center' : 'left'}>
      <Heading
        as="h2"
        fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
        fontWeight="bold"
        color="brand.primary.900"
        mb={subtitle ? '3' : '0'}
      >
        {title}
      </Heading>
      {subtitle && (
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color="text.secondary"
          maxW={centered ? '2xl' : 'full'}
          mx={centered ? 'auto' : '0'}
        >
          {subtitle}
        </Text>
      )}
    </Box>
  );
}
