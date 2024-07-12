"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, VStack, Heading, Text, Input, Button, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { resetPassword } from '@/services/auth'; // Implement this function

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Assumes the token is in the URL as a query parameter

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await resetPassword(token, password);
      setMessage('Your password has been reset successfully.');
      router.push('/login');
    } catch (error) {
      setError('Error resetting password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.100">
      <Box bg="white" p={8} rounded="md" shadow="md">
        <Heading mb={4}>Reset Password</Heading>
        <VStack spacing={4} w="100%">
          <FormControl isInvalid={!!error}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!error}>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>
          {message && <Text color="green.500">{message}</Text>}
          <Button
            colorScheme="teal"
            onClick={handlePasswordReset}
            isLoading={isLoading}
          >
            Reset Password
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ResetPassword;
