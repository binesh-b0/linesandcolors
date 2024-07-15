import React from 'react';
import { Box } from '@chakra-ui/react';

interface BlurredOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const BlurredOverlay: React.FC<BlurredOverlayProps> = ({ isVisible, onClose, children }) => {
  return (
    <Box
      className="overlay"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex="9"
      opacity={isVisible ? 1 : 0}
      pointerEvents={isVisible ? 'auto' : 'none'}
      transition="opacity 0.3s ease"
      backdropFilter="blur(10px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        position="relative"
      >
        {children}
        <Box
          as="button"
          position="absolute"
          top="10px"
          right="10px"
          background="transparent"
          border="none"
          fontSize="20px"
          cursor="pointer"
          onClick={onClose}
        >
          &times;
        </Box>
      </Box>
    </Box>
  );
};

export default BlurredOverlay;
