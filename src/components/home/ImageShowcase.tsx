"use client";

import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, useBreakpointValue, VStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DirectionAwareHover } from '@/components/ui/DirectionAwareHover';

const Showcase = () => {
  const router = useRouter();
  const screenSize = useBreakpointValue({ base: 'small', md: 'medium', lg: 'large' });

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const images = [
    { url: '/images/custom/christian-bolt.jpg', label: 'Big Image', path: '/products/custom' },
    { url: '/images/custom/brian-lawson.jpg', label: 'Small Image 1', path: '/small-image-1' },
    { url: '/images/custom/dress-stack.jpg', label: 'Small Image 2', path: '/small-image-2' },
    { url: '/images/custom/force-majeure.jpg', label: 'Small Image 3', path: '/small-image-3' },
    { url: '/images/custom/saeed-karimi.jpg', label: 'Small Image 4', path: '/small-image-4' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (screenSize === 'small') {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }
  }, [screenSize]);

  return (
    <Box px={{ base: 4, md: 8, lg: 12 }} py={{ base: 6, md: 10, lg: 14 }} >
      {screenSize === 'small' ? (
        <Box position="relative" width="100%" height="400px">
          {images.map((image, index) => (
            <Box
              key={index}
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              opacity={index === currentIndex ? 1 : 0}
              transition="opacity 1s ease-in-out"
              onClick={() => handleNavigation(image.path)}
            >
              <Image
                alt={image.label}
                src={image.url}
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: '0.5rem' }}
              />
              <VStack
                position="absolute"
                bottom="4"
                left="4"
                zIndex="10"
                background="rgba(0, 0, 0, 0.6)"
                p="2"
                borderRadius="md"
              >
                <Text fontSize="lg" color="white">{image.label}</Text>
              </VStack>
            </Box>
          ))}
        </Box>
      ) : (
        <Box display="flex" height={{md:'60vh',lg:'70vh'}} flexDirection={{ base: 'column', md: 'row' }} gap={4} className='w-100 h-100'>
          <Box flex="1" onClick={() => handleNavigation(images[0].path)} flexBasis={'1/2'}>
            <DirectionAwareHover imageUrl={images[0].url} className='w-full h-full'>
              <Text fontSize="lg" color="white">{images[0].label}</Text>
            </DirectionAwareHover>
          </Box>
          <SimpleGrid columns={2} spacing={4} flex="1" gap={2} flexBasis={'1/2'}>
            {images.slice(1).map((image, index) => (
              <Box key={index} onClick={() => handleNavigation(image.path)}>
                <DirectionAwareHover imageUrl={image.url} className='w-full h-full'>
                  <Text fontSize="lg" color="white">{image.label}</Text>
                </DirectionAwareHover>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

export default Showcase;