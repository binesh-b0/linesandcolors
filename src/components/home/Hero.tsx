"use client";
import { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, SimpleGrid } from '@chakra-ui/react';
import { color, motion, useAnimation } from 'framer-motion';
import { SparklesCore } from "@/components/ui/Sparkles";
import { useTheme } from '@/context/ThemeContext';
import { FlipWords } from '../ui/FlipWords';
import HeroGridItems from './HeroGridItems';

const Hero = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const controls = useAnimation();
  const colors = useTheme().colors;
  const words = ['Creativity', 'Vison', 'Passion']
  const categories = [
    { title: 'Deals', image: '/images/deals.png', description: 'Exclusive deals on our top products.', color: 'yellow.500' },
    { title: 'Business Cards', image: '/images/business_cards_1.webp', description: 'High-quality business cards for professionals.', color: 'red.500' },
    { title: 'Flyers', image: '/images/flyers.jpg', description: 'Eye-catching flyers to promote your events.' },
    { title: 'Banners', image: '/images/banners.jpg', description: 'Large format banners for any occasion.' },
    { title: 'Brochures', image: '/images/brochures.jpg', description: 'Informative brochures to showcase your services.' },
    { title: 'Custom Prints', image: '/images/custom-prints.jpg', description: 'Personalized print products for any need.' },
  ];
  useEffect(() => {
    const handleScroll = () => {
      const yOffset = window.pageYOffset; // TODO:Remove the depricated function
      controls.start({ y: yOffset * 0.1 });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <Box
      position="relative"
      overflow="hidden"
      width="100%"
      minHeight="100vh"
      bgGradient="linear(to-r, teal.500, coral.500)"
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
        initial={{ opacity: 1, y: 50 }}
        animate={controls}
        opacity={1}
        transition={{ duration: '2', ease: 'easeInOut' }}
        exit={{ opacity: 1, y: 50 }}
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
        boxShadow="0px 10px 30px rgba(0, 95, 95, 0.5)"  // Dark teal shadow
        overflow="hidden"
        zIndex="12"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: 'rgba(0, 0, 0, 0.5)',  // Dark overlay
          zIndex: '-1',
        }}
      >
        <VStack spacing={4} height="100%" justify="center">
          <Text
            as="p"
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            color="teal.100"
            textAlign='center'
          >
            Transform your visions into tangible reality with our bespoke print services.
          </Text>
          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
            color="white"
            textAlign="center"
            transition={{ duration: '2', ease: 'easeInOut' }}
          >
            Bring Your {<FlipWords words={words} />} to Life
          </Heading>
        </VStack>
      </Box>
      {/* Category Cards */}
      <Box
        position="relative"
        maxWidth="80%"
        mx="auto"
        mt="20"
        mb="20"
        p={8}
      >
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} mt={10} mx="auto" maxWidth="80%">
          {categories.map((category) => (
            <HeroGridItems
              title={category.title}
              image={category.image}
              color={category.color}
              // description={category.description}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Hero;

