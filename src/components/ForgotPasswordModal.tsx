"use client";

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
} from '@chakra-ui/react';
import { sendPasswordResetEmail } from '@/services/authService'; // Assuming this function exists
import { ArrowForwardIcon } from '@chakra-ui/icons';
import InputField from './ui/InputField';

interface ForgotPasswordModalProps {
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(email);
      setMessage('A password reset link has been sent to your email address.');
      setSuccess(true);
    } catch (error) {
      setMessage('Error sending password reset email. Please try again.');
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent>
        <ModalHeader>Reset Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>Enter your email address below and we'll send you a link to reset your password.</Text>
          <Input
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={4}
          />
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          {message && <Text color="teal.500" mb={4}>{message}</Text>}
        </ModalBody>
        <ModalFooter>
          {!success && (<Button colorScheme="teal" onClick={handlePasswordReset} rightIcon={<ArrowForwardIcon />}>
            Go
          </Button>)}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPasswordModal;
