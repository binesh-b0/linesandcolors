"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Box, Image, Text, IconButton, HStack, Heading } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, ArrowForwardIcon } from '@chakra-ui/icons';

// Declare z-index constants
const Z_INDEX_BACKGROUND = 0;
const Z_INDEX_CONTENT = 2;
const Z_INDEX_ARROW = 3;

// Fake data for categories
const categories = Array.from({ length: 15 }).map((_, index) => ({
  title: `Category ${index + 1}`,
  image: `https://via.placeholder.com/150?text=Category+${index + 1}`, // Replace with actual category image URL
}));

interface CategoryItemProps {
    title:string,
    image:string
}

// CategoryItem component to display individual category
const CategoryItem:React.FC<CategoryItemProps> = ({ title, image }) => (
  <Box display="flex" flexDirection="column" alignItems="flex-start" mx={3} minW="180px">
    <Image src={image} alt={title} boxSize="150px" objectFit="cover" borderRadius="md" />
    <HStack mt={2} spacing={1} alignItems="center">
      <Text fontSize="md" fontWeight="medium" color="teal.700">
        {title}
      </Text>
      <ArrowForwardIcon color="teal.700" />
    </HStack>
  </Box>
);

// AllProductCategories component to display a row of categories with navigation
const AllProductCategories = () => {
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

  // Function to scroll the categories row
  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  // Calculate the scroll offset to scroll three items at a time
  const scrollOffset = 3 * 180; // 3 items * min width of each item

  return (
    <Box position="relative" py={8} px={4} bg="white" color="teal.700" overflow="hidden">
      <Heading as="h2" ml={8} mb={8} fontSize={{ base: 'xl', md: 'xl' }} fontWeight="thin" color="teal.900" textAlign="left">
        All Product Categories
      </Heading>
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
        zIndex={Z_INDEX_CONTENT}
      >
        {categories.map((category, index) => (
          <CategoryItem key={index} title={category.title} image={category.image} />
        ))}
      </Box>
      {showLeftArrow && (
        <IconButton
          aria-label="Scroll Left"
          icon={<ChevronLeftIcon boxSize={8} />}
          position="absolute"
          top="50%"
          left="10px"
          transform="translateY(-50%)"
          zIndex={Z_INDEX_ARROW}
          onClick={() => scroll(-scrollOffset)}
          bg="teal.500"
          color="white"
          _hover={{ bg: 'teal.600' }}
        />
      )}
      {showRightArrow && (
        <IconButton
          aria-label="Scroll Right"
          icon={<ChevronRightIcon boxSize={8} />}
          position="absolute"
          top="50%"
          right="10px"
          transform="translateY(-50%)"
          zIndex={Z_INDEX_ARROW}
          onClick={() => scroll(scrollOffset)}
          bg="teal.500"
          color="white"
          _hover={{ bg: 'teal.600' }}
        />
      )}
    </Box>
  );
};

export default AllProductCategories;
