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
        fontSize={{ base: '12px', md: '14px' }}
        fontWeight="400"
        gap="2"
      >
        <Text>&copy; Copyright {year}</Text>
        <Text>
          Designed and built with{' '}
          <FontAwesomeIcon icon={faHeart} size="sm" color="#107c7c" />{' '}
          by Madeline using Next.js & Chakra UI
        </Text>
        {contactEmail && <Text>{contactEmail}</Text>}
      </Flex>
    </Box>
  );
}
