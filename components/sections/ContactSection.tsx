'use client';

import { useState } from 'react';
import { Box, VStack, Text, Input, Textarea } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomizedButton } from '@/components/ui/CustomizedButton';
import type { ContactContent } from '@/lib/types';

interface ContactSectionProps {
  content: ContactContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  const [isLoading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      comment: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      comment: Yup.string()
        .min(10, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Required'),
    }),
    onSubmit: (values, submitProps) => {
      setLoading(true);
      const encode = (data: Record<string, string>) => {
        return Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&');
      };

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...values }),
      })
        .then((response) => {
          if (response.ok) {
            setStatusMessage(`Thanks for your message, ${values.firstName}!`);
            submitProps.resetForm();
          } else {
            throw new Error(`${response.status}`);
          }
        })
        .catch(() => {
          setStatusMessage('Something went wrong, please try again later!');
        })
        .finally(() => setLoading(false));
    },
  });

  return (
    <Box>
      <Text
        as="h2"
        fontSize={{ base: '32px', sm: '36px', md: '42px', lg: '48px' }}
        fontWeight="400"
        color="text.primary"
        pb="6"
      >
        Drop Me A Message!
      </Text>

      <VStack w="full" alignItems="start" justifyContent="flex-start">
        <Box p="6" w="full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            method="post"
            name="contact"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />

            <VStack gap="4" color="text.tertiary">
              {/* Name Field */}
              <Box w="full">
                <label htmlFor="firstName" style={{ display: 'block', marginBottom: '4px' }}>
                  <Text fontSize={{ base: '16px', sm: '18px', md: '20px' }} fontWeight="400">
                    Name
                  </Text>
                </label>
                <Input
                  id="firstName"
                  placeholder="Your full name"
                  border="1px solid"
                  borderColor="border.dark"
                  borderRadius="md"
                  px="4"
                  py="2"
                  fontSize="md"
                  w="full"
                  css={{
                    '&:focus': {
                      borderColor: 'var(--chakra-colors-accent-teal)',
                      boxShadow: '0 0 0 1px var(--chakra-colors-accent-teal)',
                    },
                  }}
                  {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    {formik.errors.firstName}
                  </Text>
                )}
              </Box>

              {/* Email Field */}
              <Box w="full">
                <label htmlFor="email" style={{ display: 'block', marginBottom: '4px' }}>
                  <Text fontSize={{ base: '16px', sm: '18px', md: '20px' }} fontWeight="400">
                    Email Address
                  </Text>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your@email.com"
                  border="1px solid"
                  borderColor="border.dark"
                  borderRadius="md"
                  px="4"
                  py="2"
                  fontSize="md"
                  w="full"
                  css={{
                    '&:focus': {
                      borderColor: 'var(--chakra-colors-accent-teal)',
                      boxShadow: '0 0 0 1px var(--chakra-colors-accent-teal)',
                    },
                  }}
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    {formik.errors.email}
                  </Text>
                )}
              </Box>

              {/* Comment Field */}
              <Box w="full">
                <label htmlFor="comment" style={{ display: 'block', marginBottom: '4px' }}>
                  <Text fontSize={{ base: '16px', sm: '18px', md: '20px' }} fontWeight="400">
                    Your Message
                  </Text>
                </label>
                <Textarea
                  id="comment"
                  h="250px"
                  placeholder="Write something meaningful...."
                  border="1px solid"
                  borderColor="border.dark"
                  borderRadius="md"
                  px="4"
                  py="2"
                  fontSize="md"
                  w="full"
                  css={{
                    '&:focus': {
                      borderColor: 'var(--chakra-colors-accent-teal)',
                      boxShadow: '0 0 0 1px var(--chakra-colors-accent-teal)',
                    },
                  }}
                  {...formik.getFieldProps('comment')}
                />
                {formik.touched.comment && formik.errors.comment && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    {formik.errors.comment}
                  </Text>
                )}
              </Box>

              <CustomizedButton type="submit" loading={isLoading} width="full">
                Submit
              </CustomizedButton>

              {statusMessage && (
                <Text fontSize="sm" color={statusMessage.includes('Thanks') ? 'green.600' : 'red.500'}>
                  {statusMessage}
                </Text>
              )}
            </VStack>
          </form>
        </Box>
      </VStack>
    </Box>
  );
}
