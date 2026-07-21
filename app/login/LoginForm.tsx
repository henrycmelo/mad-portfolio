'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Button, Flex, VStack, Text, Input } from '@chakra-ui/react';
import { createClient } from '@/lib/supabase/client';

const ERRORS: Record<string, string> = {
  unauthorized: 'That account is not allowed to edit this site.',
  invalid_link: 'That link has expired or was already used. Request a new one.',
  missing_code: 'Something went wrong with the sign-in link. Try again.',
};

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/admin';

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    ERRORS[searchParams.get('error') ?? ''] ?? null
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const callback = new URL('/auth/callback', window.location.origin);
    callback.searchParams.set('next', next);

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        // Never provision a new account from this form - the admin user is
        // created once in the Supabase dashboard.
        shouldCreateUser: false,
        emailRedirectTo: callback.toString(),
      },
    });

    setLoading(false);

    // Deliberately show the same confirmation for unknown addresses so the
    // form can't be used to probe which email is the admin.
    if (otpError && otpError.status !== 400) {
      setError('Could not send the sign-in link. Please try again.');
      return;
    }

    setSent(true);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" px="6" bg="bg.primary">
      <Box
        w="full"
        maxW="440px"
        bg="bg.surface"
        border="1px solid"
        borderColor="border.default"
        borderRadius="md"
        boxShadow="lg"
        p={{ base: '8', md: '10' }}
      >
        <VStack align="start" gap="6">
          <VStack align="start" gap="2">
            <Text as="h1" textStyle="h3" fontWeight="extrabold" color="text.primary">
              Edit your site
            </Text>
            <Text textStyle="caption" color="text.tertiary">
              We&apos;ll email you a one-time sign-in link. No password needed.
            </Text>
          </VStack>

          {sent ? (
            <Box
              w="full"
              p="4"
              borderRadius="md"
              bg="bg.secondary"
              borderLeft="3px solid"
              borderLeftColor="accent.brand"
            >
              <Text textStyle="bodyBold" color="text.primary" mb="1">
                Check your inbox
              </Text>
              <Text textStyle="caption" color="text.tertiary">
                If {email} is the admin address, a sign-in link is on its way.
                The link expires in one hour.
              </Text>
            </Box>
          ) : (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack align="stretch" gap="4">
                <Box>
                  <Text
                    asChild
                    display="block"
                    textStyle="captionBold"
                    color="text.primary"
                    mb="2"
                  >
                    <label htmlFor="email">Email address</label>
                  </Text>
                  <Input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    borderColor="border.default"
                    borderRadius="md"
                    px="3"
                    py="6"
                    _focusVisible={{
                      borderColor: 'accent.brand',
                      outline: '2px solid',
                      outlineColor: 'accent.brand',
                      outlineOffset: '0px',
                    }}
                  />
                </Box>

                {error && (
                  <Text textStyle="caption" color="status.error">
                    {error}
                  </Text>
                )}

                <Button
                  type="submit"
                  variant="solid"
                  borderRadius="md"
                  loading={loading}
                  w="full"
                >
                  Send sign-in link
                </Button>
              </VStack>
            </form>
          )}
        </VStack>
      </Box>
    </Flex>
  );
}
