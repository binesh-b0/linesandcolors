"use client";
import { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import {SparklesCore} from "@/components/ui/Sparkles";
import { useTheme } from '@/context/ThemeContext';

const Hero = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const controls = useAnimation();
  const colors = useTheme().colors;

  useEffect(() => {
    const handleScroll = () => {
      const yOffset = window.pageYOffset;
      controls.start({ y: yOffset * 0.1 });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  // const handleMouseMove = (e: React.MouseEvent) => {
  //   setMouseX(e.clientX / window.innerWidth);
  //   setMouseY(e.clientY / window.innerHeight);
  // };

  return (
    <Box
      position="relative"
      overflow="hidden"
      width="100%"
      height="100vh"
      bgGradient="linear(to-r, teal.500, coral.500)"
      // onMouseMove={handleMouseMove}
    >
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="white"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor={colors.darkTeal}
        />
      </div>
      {/* Hero Card */}
      <Box
        as={motion.div}
        initial={{ opacity: 50, y: 50 }}
        animate={controls}
        transition={{ duration: 2, ease: 'easeInOut' }}
        exit={{ opacity: 50, y: 50 }}
        position="relative"
        maxWidth="80%"
        mx="auto"
        mt="20"
        p={8}
        backgroundImage={'url(/hero-image.png)'}
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="md"
        height={'400px'}
        boxShadow={`0px 0px 20px ${mouseX * 10}px ${mouseY * 10}px rgba(0, 95, 95, 0.8)`}
        overflow="hidden"
        zIndex="10"
        _before={{
          content: '""',
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          bottom: '-20px',
          left: '-20px',
          // background: 'linear-gradient(45deg, teal.500, coral.500)',
          zIndex: '-1',
        }}
      >
        <VStack spacing={4}>
          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
            color="white"
          >
            Bring Your Creativity to Life
          </Heading>
          <Text
            as="p"
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            color="teal.200"
          >
            Discover the best print products for your business and personal use.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Hero;
