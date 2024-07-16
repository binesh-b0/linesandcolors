"use client";
import { Heading, Box, Image, Stack, Text, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useTheme } from '@/context/ThemeContext';

interface HeroGridItemsProps {
  title: string;
  image: string;
  color?: string | null;
}

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionText = motion(Text);
const MotionIcon = motion(Icon);

const HeroGridItems: React.FC<HeroGridItemsProps> = ({ title, image, color }) => {
  const colors = useTheme().colors;
  return (
    <MotionBox
      key={title}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      position="relative"
      whileHover="hover"
      initial="initial"
      cursor={'pointer'}
    >
      <MotionImage
        src={image}
        alt={title}
        objectFit="cover"
        h="300px"
        w="100%"
        variants={{
          initial: { filter: 'blur(0px)', scale: 1 },
          hover: { filter: 'blur(5px)', scale: 1.05 }
        }}
        transition={{ duration: 0.3 }}
      />
      <MotionBox
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={4}
        initial={{ opacity: 0, y: 20 }}
        variants={{
          hover: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
        background="linear-gradient(transparent, rgba(0, 0, 0, 0.6))"
      >
        <MotionText
          fontSize="l"
          fontWeight="bold"
          color={'white'}
          variants={{
            hover: { opacity: 1, y: 0 },
            initial: { opacity: 0, y: 20 }
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {title}
        </MotionText>
        <MotionIcon
          as={ChevronRightIcon}
          w={8}
          h={8}

          color={'white'}
          variants={{
            hover: { opacity: 1, y: 0 },
            initial: { opacity: 0, y: 20 }
          }}
          transition={{ duration: 0.3, delay: 0.2 }}
        />
      </MotionBox>
    </MotionBox>
  );
}

export default HeroGridItems;
