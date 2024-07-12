"use client";

import { IconButton as ChakraIconButton, IconButtonProps } from '@chakra-ui/react';
import React from 'react';

const IconButton: React.FC<IconButtonProps> = ({ ...props }) => {
  return (
    <ChakraIconButton {...props} />
  );
};

export default IconButton;
