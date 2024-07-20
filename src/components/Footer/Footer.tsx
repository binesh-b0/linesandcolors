"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Box, Flex, Text, VStack, HStack, Heading, Link } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Model from '@/components/ui/Model'; // Ensure the correct path to your Model component
import Image from 'next/image';
import { url } from 'inspector';
import { Environment } from '@react-three/drei'

const social = [{
  name: 'Facebook',
  icon: FaFacebook,
  url: 'https://www.facebook.com',
}, {
  name: 'X',
  icon: FaTwitter,
  url: 'https://www.twitter.com'
}, {
  name: 'Instagram',
  icon: FaInstagram,
  url: 'https://www.instagram.com'
}]

export default function Footer() {
  const footerRef = useRef();
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <Box as="footer" className="bg-gray-900 text-white pt-16 mt-12 overflow-x-hidden relative hide-scrollbar" minHeight="50vh" ref={footerRef} style={{paddingBottom: '124px'}}>
      <Box position="absolute"
        display={{ base: 'none', md: 'block' }} maxW={'600px'} maxH={'600px'}
        //  style = {{ width: '100%', height: '100%' }}
        bottom={200} right={-20}>
        {isVisible && (
          <Canvas
            className="absolute" shadows
            style={{ width: '300px', height: '300px' }}
          >
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            <directionalLight position={[-10, 10, 10]} intensity={1.5} />
            <directionalLight position={[1, 1, 10]} intensity={1.5} />
            <directionalLight position={[-1, 1, 10]} intensity={1.5} />

            <Environment preset="warehouse" />
            <spotLight position={[5, 15, 5]} angle={0.5} penumbra={1} intensity={2} />
            <Model scale={2} position={[0, 0, 0]} />
          </Canvas>
        )}
      </Box>
      <Flex className="container mx-auto px-8 mt-12" justify="space-between" align="start" position="relative">
        <VStack align="start" spacing={4} w="30%">
          <Heading as="h3" size="md" mb={4}>
            About the Company
          </Heading>
          <Text fontSize="sm" color="gray.400">
            We are dedicated to building a future with safe AI. Our mission is to leverage advanced technology to create a better world.
          </Text>
          <Text className="text-gray-400 mt-8" fontSize="sm">
            © 2024 lnc. All rights reserved.
          </Text>
          <HStack spacing={4}>
            {social.map((item) => (
              <Link as="a" key={item.name} href={item.url} _hover={{ color: 'teal.400' }} cursor={'pointer'} >
                <item.icon size="18" />
              </Link>
            ))}

            {/* <Link href='www.facebook.com' _hover={{ color: 'teal.400' }} cursor={'pointer'} ><FaFacebook size="24" /></Link>
            <FaTwitter size="24" />
            <FaInstagram size="24" />
            <FaLinkedin size="24" /> */}
          </HStack>
        </VStack>
        <VStack align="start" spacing={4} w="20%">
          <Heading as="h3" size="md">
            Navigation
          </Heading>
          <VStack as="ul" spacing={2} align="start" listStyleType="none">
            <Text as="li" _hover={{ color: 'teal.400' }}>Company</Text>
            <Text as="li" _hover={{ color: 'coral' }}>Pricing</Text>
            <Text as="li" _hover={{ color: 'teal.400' }}>Docs</Text>
            <Text as="li" _hover={{ color: 'coral' }}>Careers</Text>
            <Text as="li" _hover={{ color: 'teal.400' }}>Contact</Text>
          </VStack>
        </VStack>
        <VStack align="start" spacing={4} w="20%">
          <Heading as="h3" size="md">
            Documentation
          </Heading>
          <VStack as="ul" spacing={2} align="start" listStyleType="none">
            <Text as="li" _hover={{ color: 'teal.400' }}>Introduction</Text>
            <Text as="li" _hover={{ color: 'coral' }}>Quickstart</Text>
            <Text as="li" _hover={{ color: 'teal.400' }}>Why evals</Text>
            <Text as="li" _hover={{ color: 'coral' }}>Metrics</Text>
            <Text as="li" _hover={{ color: 'teal.400' }}>Use Cases</Text>
            <Text as="li" _hover={{ color: 'coral' }}>API reference</Text>
          </VStack>
        </VStack>
      </Flex>

      <Box position="absolute" bottom={0} width="100%" textAlign="center">
        <Box width="100%" height="80px" alignItems="center" opacity={0.1} className="bg-gray-900 text-gray-500">
          <Image
            src={'/linesandcolors.svg'} alt=""
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            className='glitch'
             />
        </Box>
        <a href="https://storyset.com/online" className="text-xs text-gray-500">Online illustrations by Storyset</a>
      </Box>

    </Box>
  );
}
