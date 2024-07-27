"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Box, Flex, Text, VStack, HStack, Heading, Link, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import Image from 'next/image';

const social = [
  { name: 'Facebook', icon: FaFacebook, url: 'https://www.facebook.com' },
  { name: 'Twitter', icon: FaTwitter, url: 'https://www.twitter.com' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com' },
];

export default function Footer() {
  const footerRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box as="footer" bg="white" color="teal.900" pt={16} mt={12} overflowX="hidden" ref={footerRef} minHeight="70vh" position="relative">
      <Flex className="container" justify="space-between" align="start" px={{ base: 4, md: 8 }} py={8} mx="auto" flexWrap="wrap">
        <VStack align="start" spacing={4} w={{ base: "100%", md: "30%" }}>
          <Heading as="h3" size="md" mb={4}>
            About the Company
          </Heading>
          <Text fontSize="sm" color="teal.700">
            We are dedicated to building a future with safe AI. Our mission is to leverage advanced technology to create a better world.
          </Text>
          <Link href="https://storyset.com/online" fontSize="xs" color="teal.500" isExternal>Online illustrations by Storyset</Link>
          <Text fontSize="sm" color="teal.700" mt={8}>
            © 2024 Inc. All rights reserved.
          </Text>
          <HStack spacing={4} mt={4}>
            {social.map((item) => (
              <Link key={item.name} href={item.url} _hover={{ color: 'teal.400' }} isExternal>
                <item.icon size="24" />
              </Link>
            ))}
          </HStack>
        </VStack>
        <VStack align="start" spacing={4} w={{ base: "100%", md: "20%" }}>
          <Heading as="h3" size="md">
            Navigation
          </Heading>
          <VStack as="ul" spacing={2} align="start" listStyleType="none">
            <Link href="#" _hover={{ color: 'teal.400' }}>Company</Link>
            <Link href="#" _hover={{ color: 'teal.400' }}>Pricing</Link>
            <Link href="#" _hover={{ color: 'teal.400' }}>Docs</Link>
            <Link href="#" _hover={{ color: 'teal.400' }}>Careers</Link>
            <Link href="#" _hover={{ color: 'teal.400' }}>Contact</Link>
          </VStack>
        </VStack>
        <VStack align="start" spacing={4} w={{ base: "100%", md: "20%" }}>
          <Heading as="h3" size="md">
            Documentation
          </Heading>
          <VStack as="ul" spacing={2} align="start" listStyleType="none">
            <Link href="#" _hover={{ color: 'teal.400' }}>Introduction</Link>
            <Link href="#" _hover={{ color: 'teal.400' }}>Quickstart</Link>
            <Link href="#" _hover={{ color: 'teal.400' }}>Why evals</Link>
            <Link href="#" _hover={{ color: 'teal.400' }}>Metrics</Link>
            <Link href="#" _hover={{ color: 'teal.400' }}>Use Cases</Link>
            <Link href="#" _hover={{ color: 'teal.400' }}>API reference</Link>
          </VStack>
        </VStack>
      </Flex>

      <Box position="absolute" bottom={0} width="100%" textAlign="center">
        <Box width="100%" height="160px" alignItems="center" text="teal.600">
          <Image
            src={'/linesandcolors.svg'} alt=""
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </Box>
      </Box>

      {showScrollButton && (
        <IconButton
          icon={<FaArrowUp />}
          onClick={scrollToTop}
          position="fixed"
          bottom="20px"
          right="20px"
          bg="teal.500"
          color="white"
          _hover={{ bg: 'teal.700' }}
          zIndex={10}
          aria-label="Scroll to top"
        />
      )}
    </Box>
  );
}
