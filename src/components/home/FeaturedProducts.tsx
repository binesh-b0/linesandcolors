// Import necessary components and icons
import { Box, Heading, Text, VStack, Image, Button, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import React from 'react';

const MotionBox = motion(Box);

// Declare z-index constants
const Z_INDEX_BACKGROUND = 0;
const Z_INDEX_CONTENT = 2;
const Z_INDEX_ARROW = 3;

interface ProductItemProps {
  title: string;
  image: string;
  description: string;
}

// ProductItem component to display individual product
const ProductItem: React.FC<ProductItemProps> = ({ title, image, description }) => (
  <MotionBox
    borderRadius="lg"
    overflow="hidden"
    boxShadow="lg"
    bg="white"
    width="250px"
    minWidth="250px"
    mr={5}
    whileHover={{ y: -5, boxShadow: "xl" }}
    transition={{ duration: 0.3 }}
    zIndex={Z_INDEX_CONTENT}
  >
    <Image src={image} alt={title} objectFit="cover" h="150px" w="100%" />
    <VStack align="start" p={4} spacing={2}>
      <Heading fontSize="md" color="teal.700">{title}</Heading>
      <Text fontSize="sm" color="gray.600">{description}</Text>
      <Button size="sm" colorScheme="teal" variant="outline">Learn More</Button>
    </VStack>
  </MotionBox>
);

// FeaturedProducts component to display the product carousel
const FeaturedProducts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Function to handle scroll event and update arrow visibility
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };

  // Add scroll event listener on mount and clean up on unmount
  useEffect(() => {
    if (scrollRef.current) {
      handleScroll();
      const ref = scrollRef.current;
      ref.addEventListener('scroll', handleScroll);
      return () => {
        ref.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // Function to scroll the product carousel
  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box position="relative" py={8} px={4} bg="white" color="teal.700" overflow="hidden">
      <Heading as="h2" textAlign="left" ml={8} mb={8} fontSize={{ base: '2xl', md: '3xl' }} color="teal.800" zIndex={6}>
        Featured Products
      </Heading>
      <Box position="absolute" top="0" left="0" width="100%" height="100%" zIndex={Z_INDEX_BACKGROUND} overflow="hidden">
        {/* Gradient Background */}
        <Box position="absolute" zIndex={Z_INDEX_BACKGROUND} top="0" left="0" width="100%" height="100%" bgGradient="linear(to-r, teal.500, green.300)" opacity="0.4" />
        {/* Animated Background Elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(0, 139, 139, 0.3)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            zIndex: Z_INDEX_BACKGROUND
          }}
          animate={{ x: [0, 150, 0], y: [0, 150, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
  
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(64, 204, 208, .7)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
          animate={{ x: [0, -150, 0], y: [0, -150, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </Box>
      <Box
        display="flex"
        overflowX="auto"
        ref={scrollRef}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
        px={4}
        p={4}
        zIndex={Z_INDEX_CONTENT}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductItem
            key={index}
            title={`Product ${index + 1}`}
            image={`https://via.placeholder.com/250x150?text=Product+${index + 1}`} // Replace with actual product image URL
            description={`This is a two-line description for product ${index + 1}. It provides brief details about the product.`}
          />
        ))}
      </Box>
      {showLeftArrow && (
        <IconButton
          aria-label="Scroll Left"
          icon={<ChevronLeftIcon boxSize={6} />}
          position="absolute"
          top="50%"
          left="10px"
          transform="translateY(-50%)"
          zIndex={Z_INDEX_ARROW}
          onClick={() => scroll(-300)}
          bg="teal.500"
          color="white"
          _hover={{ bg: 'teal.600' }}
        />
      )}
      {showRightArrow && (
        <IconButton
          aria-label="Scroll Right"
          icon={<ChevronRightIcon boxSize={6} />}
          position="absolute"
          top="50%"
          right="10px"
          transform="translateY(-50%)"
          zIndex={Z_INDEX_ARROW}
          onClick={() => scroll(300)}
          bg="teal.500"
          color="white"
          _hover={{ bg: 'teal.600' }}
        />
      )}
    </Box>
  );
};

export default FeaturedProducts;
