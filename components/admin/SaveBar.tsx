'use client';

import { useFormStatus } from 'react-dom';
import { Button, Flex, Text } from '@chakra-ui/react';
import type { ActionResult } from '@/app/admin/actions';

interface SaveBarProps {
  result: ActionResult | null;
  label?: string;
  children?: React.ReactNode;
}

/**
 * Sticky submit row. Must be rendered inside the <form> so useFormStatus can
 * read the pending state.
 */
export function SaveBar({ result, label = 'Save changes', children }: SaveBarProps) {
  const { pending } = useFormStatus();

  return (
    <Flex
      position="sticky"
      bottom="0"
      align="center"
      gap="4"
      wrap="wrap"
      mt="2"
      py="4"
      bg="bg.primary"
      borderTopWidth="1px"
      borderColor="border.default"
    >
      <Button type="submit" variant="solid" borderRadius="md" loading={pending}>
        {label}
      </Button>

      {children}

      {!pending && result?.ok && (
        <Text textStyle="captionBold" color="accent.brand">
          Saved. Your site is updated.
        </Text>
      )}
      {!pending && result && !result.ok && (
        <Text textStyle="captionBold" color="status.error">
          {result.error}
        </Text>
      )}
    </Flex>
  );
}
