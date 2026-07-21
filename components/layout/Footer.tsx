'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface FooterProps {
  contactEmail?: string;
}

export function Footer({ contactEmail }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <Box p="6" mt="auto">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        alignItems="center"
        color="text.tertiary"
        textStyle="caption"
        gap="2"
      >
        <Text>&copy; Copyright {year}</Text>
        <Text>
          Designed and built with{' '}
          <FontAwesomeIcon icon={faHeart} size="sm" color="var(--chakra-colors-accent-teal)" />{' '}
          by Madeline using Next.js & Chakra UI
        </Text>
        {contactEmail && <Text>{contactEmail}</Text>}
      </Flex>
    </Box>
  );
}
