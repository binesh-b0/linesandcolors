"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { verifyEmail } from '@/services/authService';
import { UserAttributes } from '@supabase/supabase-js';

const VerifyEmail: React.FC = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ;

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!token) {
        setError('Invalid or missing token.');
        return;
      }

      setIsLoading(true);
      try {
        await verifyEmail(token);
        setMessage('Email verified successfully! You can now login.');
        router.push('/login');
      } catch (error) {
        setError('Error verifying email. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyUserEmail();
  }, [token, router]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.100">
      <Box bg="white" p={8} rounded="md" shadow="md">
        <Heading mb={4}>Email Verification</Heading>
        <VStack spacing={4} w="100%">
          {isLoading && <Text>Loading...</Text>}
          {message && <Text color="green.500">{message}</Text>}
          {error && <Text color="red.500">{error}</Text>}
          <Button colorScheme="teal" onClick={() => router.push('/login')}>
            Go to Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
