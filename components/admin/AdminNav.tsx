'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, Box, Button, Flex, Separator, Text, VStack } from '@chakra-ui/react';
import { LuLogOut } from 'react-icons/lu';
import { ADMIN_SECTIONS } from '@/components/admin/sections';

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <Flex
      direction="column"
      w={{ base: 'full', lg: '280px' }}
      flexShrink={0}
      // Without a height cap the sidebar stretches to the full document height,
      // which pushes sign-out far below the fold on long editor pages.
      position={{ base: 'static', lg: 'sticky' }}
      top={{ lg: '0' }}
      // Opt out of the row's align-items:stretch so the 100vh height applies.
      alignSelf={{ lg: 'flex-start' }}
      h={{ lg: '100vh' }}
      overflowY={{ lg: 'auto' }}
      bg="bg.warm"
      borderRightWidth={{ base: '0', lg: '1px' }}
      borderBottomWidth={{ base: '1px', lg: '0' }}
      borderColor="border.default"
    >
      {/* Identity block - mirrors the public sidebar's avatar + name. */}
      <Flex align="center" gap="3" px="6" py="6">
        <Avatar.Root size="sm" shape="full" colorPalette="brand" flexShrink={0}>
          <Avatar.Fallback name={email || 'Admin'} />
        </Avatar.Root>
        <Box minW="0">
          <NextLink href="/admin">
            <Text textStyle="bodyBold" color="text.primary">
              Site editor
            </Text>
          </NextLink>
          <Text textStyle="caption" color="text.secondary" truncate>
            {email}
          </Text>
        </Box>
      </Flex>

      <Separator borderColor="border.default" />

      <VStack as="nav" align="stretch" gap="0" flex="1" py="2">
        {ADMIN_SECTIONS.map((section) => {
          const active = pathname === section.href;
          const Icon = section.icon;
          return (
            <Button
              key={section.href}
              asChild
              variant={active ? 'subtle' : 'ghost'}
              colorPalette="brand"
              justifyContent="flex-start"
              gap="3"
              px="6"
              py="5"
              borderRadius="none"
              borderLeftWidth="3px"
              borderLeftColor={active ? 'accent.brand' : 'transparent'}
              color={active ? 'accent.brand' : 'text.secondary'}
              fontWeight={active ? 'semibold' : 'normal'}
              textStyle="appUI"
            >
              <NextLink
                href={section.href}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={17} aria-hidden />
                {section.label}
              </NextLink>
            </Button>
          );
        })}
      </VStack>

      <Separator borderColor="border.default" />

      <VStack align="stretch" gap="3" px="6" py="5">
        <NextLink href="/" target="_blank">
          <Text textStyle="captionBold" color="accent.brand" px="3">
            View live site
          </Text>
        </NextLink>

        <form action="/auth/signout" method="post">
          <Flex
            asChild
            w="full"
            align="center"
            justify="center"
            gap="2"
            px="3"
            py="2"
            borderWidth="1px"
            borderColor="border.default"
            borderRadius="md"
            cursor="pointer"
            color="text.secondary"
            _hover={{ bg: 'bg.secondary', color: 'text.primary' }}
          >
            <button type="submit">
              <LuLogOut size={15} />
              <Text textStyle="captionBold">
                Sign out
              </Text>
            </button>
          </Flex>
        </form>
      </VStack>
    </Flex>
  );
}
