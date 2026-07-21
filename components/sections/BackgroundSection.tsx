'use client';

import { Box, Heading, Text, VStack, Flex, Image } from '@chakra-ui/react';
import { RichText } from '@/components/ui/RichText';
import type { WorkHistory } from '@/lib/types';

interface BackgroundSectionProps {
  workHistory: WorkHistory[];
}

export function BackgroundSection({ workHistory }: BackgroundSectionProps) {
  const visibleHistory = workHistory
    .filter(item => item.is_visible)
    .sort((a, b) => a.order_index - b.order_index);

  if (visibleHistory.length === 0) return null;

  const getYearRange = (item: WorkHistory) => {
    const startYear = item.start_date.split('-')[0];
    if (item.is_current) return { start: startYear, end: 'present' };
    const endYear = item.end_date ? item.end_date.split('-')[0] : 'present';
    return { start: startYear, end: endYear };
  };

  return (
    <Box>
      {/* Section Title */}
      <Heading
        as="h2"
        textStyle="h2"
        color="text.primary"
        pb={{ base: '8', md: '12' }}
      >
        Background
      </Heading>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="center"
        gap="0"
      >
        {visibleHistory.map((item, idx) => {
          const years = getYearRange(item);
          return (
            <Flex
              key={item.id}
              align="center"
              direction={{ base: 'column', md: 'row' }}
              flex="1"
            >
              {/* Arrow connector between items */}
              {idx > 0 && (
                <>
                  {/* Horizontal arrow - desktop */}
                  <Flex
                    display={{ base: 'none', md: 'flex' }}
                    align="center"
                    flexShrink={0}
                  >
                    {/* Line */}
                    <Box
                      h="3px"
                      w={{ md: '30px', lg: '50px' }}
                      bg="accent.brand"
                    />
                    {/* Arrow tip */}
                    <Box
                      w="0"
                      h="0"
                      borderTop="8px solid transparent"
                      borderBottom="8px solid transparent"
                      borderLeft="12px solid"
                      borderLeftColor="accent.brand"
                    />
                  </Flex>
                  {/* Vertical arrow - mobile */}
                  <Flex
                    display={{ base: 'flex', md: 'none' }}
                    direction="column"
                    align="center"
                    flexShrink={0}
                    my="2"
                  >
                    {/* Line */}
                    <Box
                      w="3px"
                      h="30px"
                      bg="accent.brand"
                    />
                    {/* Arrow tip */}
                    <Box
                      w="0"
                      h="0"
                      borderLeft="8px solid transparent"
                      borderRight="8px solid transparent"
                      borderTop="12px solid"
                      borderTopColor="accent.brand"
                    />
                  </Flex>
                </>
              )}

              <VStack gap="5" textAlign="center" flex="1">
                {/* Circular Year Badge */}
                <Box
                  w={{ base: '110px', md: '120px', lg: '130px' }}
                  h={{ base: '110px', md: '120px', lg: '130px' }}
                  borderRadius="full"
                  border="3px solid"
                  borderColor="accent.brand"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mx="auto"
                >
                  <VStack gap="0">
                    <Text
                      color="accent.brand"
                      fontSize={{ base: 'lg', md: 'xl' }}
                      fontWeight="bold"
                      lineHeight="1.2"
                    >
                      {years.start}-
                    </Text>
                    <Text
                      color="accent.brand"
                      fontSize={{ base: 'lg', md: 'xl' }}
                      fontWeight="bold"
                      lineHeight="1.2"
                    >
                      {years.end}
                    </Text>
                  </VStack>
                </Box>

                {/* Category Title */}
                <RichText
                  html={item.position}
                  spacing="tight"
                  textStyle="h3"
                  color="text.primary"
                />

                {/* Accent divider */}
                <Box w="60%" h="2px" bg="accent.brand" mx="auto" />

                {/* Company Logos */}
                {Array.isArray(item.logos) && item.logos.length > 0 && (
                  <Flex
                    gap="4"
                    justify="center"
                    align="center"
                    flexWrap="wrap"
                    minH="80px"
                  >
                    {item.logos.map((logo, index) => (
                      <Box
                        key={index}
                        h={{ base: '50px', md: '60px', lg: '70px' }}
                        w={{ base: '80px', md: '100px', lg: '120px' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image
                          src={logo}
                          alt={`${item.company} logo ${index + 1}`}
                          maxH="100%"
                          maxW="100%"
                          objectFit="contain"
                        />
                      </Box>
                    ))}
                  </Flex>
                )}
              </VStack>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
