// Import necessary components and icons
import { Box, Heading, Text, VStack, Image, Button, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const MotionBox = motion(Box);

const ProductItem = ({ title, image, description }) => (
  <MotionBox
    borderRadius="lg"
    overflow="hidden"
    boxShadow="md"
    bg="white"
    width="300px"
    minWidth="300px"
    mr={5}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <Image src={image} alt={title} objectFit="cover" h="200px" w="100%" />
    <VStack align="start" p={5} spacing={3}>
      <Heading fontSize="lg" color="teal.700">{title}</Heading>
      <Text fontSize="md" color="gray.600">{description}</Text>
      <Button colorScheme="teal" variant="outline">Learn More</Button>
    </VStack>
  </MotionBox>
);

const FeaturedProducts = () => {
  const scrollRef = useRef();

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <Box position="relative" py={10} px={5} bg="gray.100" color="teal.700">
      <Heading as="h2" textAlign="center" mb={10} fontSize={{ base: '2xl', md: '4xl' }}>
        Featured Products
      </Heading>
      <Box position="absolute" top="0" left="0" width="100%" height="100%" zIndex="-1">
        {/* SVG Waves */}
        <Box position="absolute" top="0" left="0" width="100%" height="50%" bg="teal.500" opacity="0.1" />
        <Box position="absolute" top="50%" left="0" width="100%" height="50%" bg="teal.300" opacity="0.1" />
      </Box>
      <Box
        display="flex"
        overflowX="scroll"
        ref={scrollRef}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
        px={5}
      >
        <ProductItem
          title="Business Cards"
          image="https://via.placeholder.com/300x200" // Replace with actual product image URL
          description="Premium quality business cards to make a lasting impression."
        />
        <ProductItem
          title="Flyers"
          image="https://via.placeholder.com/300x200" // Replace with actual product image URL
          description="Eye-catching flyers to promote your events and offers."
        />
        <ProductItem
          title="Banners"
          image="https://via.placeholder.com/300x200" // Replace with actual product image URL
          description="Large format banners for indoor and outdoor advertising."
        />
        <ProductItem
          title="Brochures"
          image="https://via.placeholder.com/300x200" // Replace with actual product image URL
          description="Informative brochures to showcase your services."
        />
        <ProductItem
          title="Custom Prints"
          image="https://via.placeholder.com/300x200" // Replace with actual product image URL
          description="Personalized print products for any need."
        />
        <ProductItem
          title="Deals"
          image="https://via.placeholder.com/300x200" // Replace with actual product image URL
          description="Exclusive deals on our top products."
        />
      </Box>
      <IconButton
        aria-label="Scroll Left"
        icon={<ChevronLeftIcon />}
        position="absolute"
        top="50%"
        left="5px"
        transform="translateY(-50%)"
        zIndex="1"
        onClick={() => scroll(-300)}
      />
      <IconButton
        aria-label="Scroll Right"
        icon={<ChevronRightIcon />}
        position="absolute"
        top="50%"
        right="5px"
        transform="translateY(-50%)"
        zIndex="1"
        onClick={() => scroll(300)}
      />
    </Box>
  );
};

export default FeaturedProducts;
