"use client";

import { Button as ChakraButton, ButtonProps, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

const buttonVariants = {
  initial: { scale: 1 },
  loading: { scale: 1.1 },
  error: {
    x: [0, -10, 10, -10, 10, 0],
    backgroundColor: '#E53E3E',
    transition: { duration: 0.4 },
  },
};

interface MotionButtonProps extends ButtonProps {
  isLoading?: boolean;
  isError?: boolean;
}

const Button: React.FC<MotionButtonProps> = ({ isLoading, isError, children, ...props }) => {
  return (
    <ChakraButton
      as={motion.button}
      variants={buttonVariants}
      animate={isLoading ? 'loading' : isError ? 'error' : 'initial'}
      leftIcon={isLoading ? <Spinner size="sm" /> : null}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
