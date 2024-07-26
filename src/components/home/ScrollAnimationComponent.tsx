"use client";

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Box, Image, Text, Heading } from '@chakra-ui/react';
import { PinContainer } from '../ui/3d-pin';

// Custom hook to get the scroll progress
const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollProgress;
};

// Define animation variants for the main card
const cardVariants = {
  initial: { scale: 0.9, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' },
  scroll: (scrollProgress: number) => ({
    scale: 0.95 + scrollProgress * 0.1,
    boxShadow: `0px 0px ${scrollProgress * 30}px rgba(0, 128, 128, 0.5)`,
    transition: { duration: 0.1 },
    background: `linear-gradient(135deg, rgba(0, 128, 128, ${scrollProgress}), rgba(0, 128, 128, ${scrollProgress / 2}))`,
  }),
};

// Define animation variants for the content inside the card
const contentVariants = {
  initial: { opacity: 0, y: 50 },
  scroll: (scrollProgress: number) => ({
    opacity: Math.min(scrollProgress * 5, 1),
    y: 0,
    transition: { duration: 0.5 }
  }),
};

const imageVariants = {
  initial: { width: '0px', height: '0px', borderRadius: '50%' },
  scroll: (scrollProgress: number) => ({
    width: `${150 * scrollProgress}px`,
    height: `${150 * scrollProgress}px`,
    borderRadius: '50%',
    transition: { duration: 0.5 }
  }),
};

const textVariants = {
  initial: { opacity: 0, y: 50 },
  scroll: (scrollProgress: number) => ({
    opacity: Math.min(scrollProgress * 5, 1),
    y: 0,
    transition: { duration: 0.5 }
  }),
};

// Gloss effect
const glossVariants = {
  initial: { opacity: 0, x: '-150%' },
  scroll: (scrollProgress: number) => ({
    opacity: 0.5,
    x: `${scrollProgress * 200}%`,
    transition: { duration: 0.1 }
  }),
};

// Main component to showcase the services
const ScrollAnimationComponent = () => {
  const scrollProgress = useScrollProgress();
  const controls = useAnimation();

  useEffect(() => {
    controls.start('scroll', { custom: scrollProgress });
  }, [controls, scrollProgress]);

  const services = [
    { title: 'Quality Printing', image: 'https://via.placeholder.com/150?text=Quality+Printing' },
    { title: 'Fast Delivery', image: 'https://via.placeholder.com/150?text=Fast+Delivery' },
    { title: 'Affordable Prices', image: 'https://via.placeholder.com/150?text=Affordable+Prices' },
    { title: 'Customer Support', image: 'https://via.placeholder.com/150?text=Customer+Support' },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="#ffffff"
      py={10}
      px={5}
    >
      <motion.div
        initial="initial"
        animate={controls}
        custom={scrollProgress}
        variants={cardVariants}
        style={{
          width: '90%',
          maxWidth: '1200px',
          height: '80vh',
          background: '#004d4d',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Gloss Effect */}
        <motion.div
          custom={scrollProgress}
          variants={glossVariants}
          style={{
            position: 'absolute',
            top: 0,
            left: '-150%',
            width: '300%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 25%, transparent 25%)',
            opacity: 0.5,
            pointerEvents: 'none',
            transform: 'rotate(-30deg)',
          }}
        />

        <motion.div
          custom={scrollProgress}
          variants={contentVariants}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <motion.div custom={scrollProgress} variants={textVariants}>
            <Heading as="h2" mb={8} fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="white" textAlign="center">
              Our Services
            </Heading>
          </motion.div>
          <Box display="flex" justifyContent="center" flexWrap="wrap" style={{ overflow: 'hidden' }}>
            {services.map((service, index) => (
                <PinContainer title={service.title} key={index} className='shadow-none'>
              <motion.div
                key={index}
                custom={scrollProgress}
                variants={imageVariants}
                style={{ margin: '20px', borderRadius: '50%', overflow: 'hidden', textAlign: 'center' }}
              >
                <Image src={service.image} alt={service.title} objectFit="cover" />
                {/* <Text mt={2} color="white" fontSize={{ base: 'md', md: 'lg' }}>{service.title}</Text> */}
              </motion.div>
                </PinContainer>
            ))}
          </Box>
          <motion.div custom={scrollProgress} variants={textVariants} style={{ textAlign: 'center', marginTop: '50px' }}>
            <Heading as="h2" mb={8} fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color="white" textAlign="center">
              Why Choose Us?
            </Heading>
            <Text fontSize="lg" color="white" mx="auto" maxW="600px">
              We provide a wide range of printing services tailored to meet your needs. Our state-of-the-art equipment and experienced team ensure that your prints are of the highest quality. Whether you need business cards, brochures, or large format prints, we've got you covered.
            </Text>
          </motion.div>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default ScrollAnimationComponent;
