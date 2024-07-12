"use client";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  isInvalid?: boolean;
  errorMessage?: string;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  onFocus,
  isInvalid,
  errorMessage,
  placeholder ='',
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl id={id} isRequired isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          type={isPassword ? (!showPassword ? 'password' : 'text') : type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder?placeholder:''}
        />
        {isPassword && (
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      {isInvalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
