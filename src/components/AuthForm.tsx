"use client";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { validateEmail, validatePassword } from '@/services/validation';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import IconButton from '@/components/ui/IconButton';
import { ArrowBackIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import ForgotPasswordModal from '@/components/ForgotPasswordModal';


const AuthForm: React.FC<{
  email: string;
  setEmail: (e: string) => void;
  password: string;
  setPassword: (e: string) => void;
  confirmPassword: string;
  setConfirmPassword: (e: string) => void;
  firstName: string;
  setFirstName: (e: string) => void;
  lastName: string;
  setLastName: (e: string) => void;
  isLogin: boolean;
  setIsLogin: (e: boolean) => void;
  handleAuth: () => void;
  handleSwitch: () => void;
  handleFocus: () => void;
  loading: boolean;
  error: string | null;
}> = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  isLogin,
  setIsLogin,
  handleAuth,
  handleSwitch,
  handleFocus,
  loading,
  error,
}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const router = useRouter();
    const { colors } = useTheme()

    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const buttonLabel = useBreakpointValue({
      base: isLogin ? 'Create Account' : 'Already have an account?',
      md: '',
    });

    return (
      <Box
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 } as any}
        display="flex"
        width="100%"
        minH="90vh"
        justifyContent="space-evenly"
        alignItems="center"
        ml={{ base: 16, md: 'auto' }}
        p={8}
        bg={colors.white}
      >
        <Box w ={{ base: '100%', md: '50%' }} zIndex={0} >
          <img src="welcome.png" alt="welcome"
            style={{ maxWidth: '400px', height: 'auto' }}
          />
        </Box>
        <Box
          display="flex"
          bg={colors.teal}
          borderRadius="md"
          boxShadow="lg"
          overflow="hidden"
          maxW="4xl"
          w="full"
          position="relative"
          height="550px"
        >
          <Box
            w={{ base: '100%', md: '50%' }}
            p={8}
            bg={colors.darkTeal}
            color="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            as={motion.div}
            animate={{ x: isLogin ? 0 : '100%' }}
            transition={{ duration: 10.75 } as any}
            position="absolute"
            height="100%"
            zIndex={1}
          >
            <Heading mb={4}>{isLogin ? 'Welcome Back!' : 'Create Account'}</Heading>
            <Text mb={8}>
              {isLogin
                ? 'To keep connected with us please login with your personal info'
                : 'Or use your email for registration'}
            </Text>

            {/* <Button variant="solid" onClick={handleSwitch} display={{ base: 'none', md: 'block' }}>
              {isLogin ? 'sign up' : 'login'}
            </Button> */}
          </Box>
          <Box
            w={{ base: '100%', md: '50%' }}
            p={8}
            ml={{ base: '0', md: isLogin ? '50%' : '0' }}
            bg="white"
            color="black"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            transition={{ duration: 0.5 } as any}
            height="100%"
            zIndex={2}
          >
            <VStack spacing={4} w="100%">
              <Heading>{isLogin ? 'Login' : 'Sign Up'}</Heading>
              {!isLogin && (
                <HStack spacing={4} w="full">
                  <InputField
                    id="first-name"
                    label="First Name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={handleFocus}
                  />
                  <InputField
                    id="last-name"
                    label="Last Name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={handleFocus}
                  />
                </HStack>
              )}
              <InputField
                id="email"
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleFocus}
                isInvalid={!(!email) && !isEmailValid}
                errorMessage="Email is invalid."
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleFocus}
                isInvalid={!(!password) && !isPasswordValid}
                errorMessage="Password must be at least 8 characters and include a special character."
                isPassword
              />
              {!isLogin && (
                <InputField
                  id="confirm-password"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={handleFocus}
                  isInvalid={ !!password && (password !== confirmPassword )}
                  errorMessage="Passwords do not match."
                isPassword
                />
              )}
              {error && (
                <Text color="red.500" mt={2}>
                  {error}
                </Text>
              )}
              {isLogin && (<Button
              variant={"link"}
              onClick={() => {
                setShowForgotPassword(true);
              }}
              color={colors.darkTeal}
              size="sm"
              mt={4}
              alignSelf={'flex-end'}
              >
                Forgot Password ?
              </Button>)}
              <Button
                onClick={handleAuth}
                isLoading={loading}
                isError={!!error}
                colorScheme="teal"
                w="full"
                isDisabled={!isEmailValid || !isPasswordValid || (!isLogin && password !== confirmPassword) || loading}
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
              <Button
                variant="link"
                onClick={handleSwitch}
                color={colors.darkTeal}
                size="sm"
                // display={{ base: 'block', md: 'none' }}
                mt={4}
              >
                {/* {buttonLabel} */}
                {isLogin ? "Create Account" : "Already have an account?"}
              </Button>
            </VStack>
          </Box>
        </Box>

        {showForgotPassword && (
  <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />
)}

      </Box>
    );
  };

export default AuthForm;
