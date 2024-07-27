"use client";
import { Box, Flex, Heading, Avatar, Text, VStack, HStack, IconButton, useMediaQuery } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { keyframes } from '@emotion/react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mahbub Uddin",
      image: "https://i.pravatar.cc/150?img=1",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      role: "Teacher, Alampur",
      rating: Math.floor(Math.random() * 2) + 4 // Randomize stars between 4 and 5
    },
    {
      name: "John Doe",
      image: "https://i.pravatar.cc/150?img=2",
      text: "I knew I was going to get great service, but they went above and beyond my expectations.",
      role: "Software Engineer",
      rating: Math.floor(Math.random() * 2) + 4
    },
    {
      name: "Asa Walter",
      image: "https://i.pravatar.cc/150?img=3",
      text: "This is the best thing that happened to my small business. They re-branded, re-organized and re-vamped my company in no time.",
      role: "Entrepreneur",
      rating: Math.floor(Math.random() * 2) + 4
    },
    {
      name: "Zahid Miles",
      image: "https://i.pravatar.cc/150?img=4",
      text: "They are great. They did exactly what I needed. The friendly chaps are real problem solvers. Loved working with them.",
      role: "Consultant",
      rating: Math.floor(Math.random() * 2) + 4
    },
    {
      name: "Casper Leigh",
      image: "https://i.pravatar.cc/150?img=5",
      text: "Awesome services. I am really happy to be here because of their services. I will continue to use their services in the future.",
      role: "Designer",
      rating: Math.floor(Math.random() * 2) + 4
    }
  ];

  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Auto-rotate every 5 seconds
    return () => clearInterval(interval);
  }, [current]);

  const fadeAnimation = keyframes`
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  `;

  const starAnimation = keyframes`
    0% { opacity: 0; transform: scale(0.5); }
    100% { opacity: 1; transform: scale(1); }
  `;

  const fullStarAnimation = keyframes`
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
  `;

  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");

  return (
    <Box bg="white" py={20} px={5} textAlign="center" height="70vh" justifyContent="center" alignContent="center">
      <Heading as="h2" mb={10} fontSize={{ base: '2xl', md: '4xl' }} color="teal.700" fontWeight="thin">
        What our Customers say!
      </Heading>
      <Flex justifyContent="center" alignItems="center" position="relative" width={{ base: "100%", lg: "60%" }} mx="auto">
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={prevTestimonial}
          position="absolute"
          left={-10} // Add spacing to ensure text is readable
          top="50%"
          transform="translateY(-50%)"
          bg="white"
          color="teal.700"
          zIndex={1}
          aria-label=""
        />
        <Box width="100%" mx="auto" animation={`${fadeAnimation} 1s`}>
          <Flex direction={{ base: 'column', lg: 'row' }} textAlign={{ base: 'center', lg: 'start' }} justifyContent="center">
            <VStack spacing={3} p={5} alignItems={{ base: 'center', lg: 'end' }} flex="1">
              <Text fontSize="xl" fontWeight="bold" color="teal.700">{testimonials[current].name}</Text>
              <Text fontSize="md" color="gray.500">{testimonials[current].role}</Text>
              <HStack justifyContent={{ base: 'center', lg: 'flex-start' }}>
                <CheckCircleIcon color="teal.500" />
                <Text fontSize="sm" color="gray.600">Verified</Text>
              </HStack>
            </VStack>
            <VStack spacing={3} p={5} alignItems={{ base: 'center', lg: 'start' }} flex="2">
              <HStack spacing={1}>
                {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Box key={i} as="span" color="yellow.400" fontSize="lg" animation={i < 4 ? `${fullStarAnimation} 1s` : `${starAnimation} 1s`}>★</Box>
                ))}
              </HStack>
                <Text fontSize="sm" color="gray.600">{testimonials[current].text}</Text>
            </VStack>
          </Flex>
        </Box>
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={nextTestimonial}
          position="absolute"
          right={-10} // Add spacing to ensure text is readable
          top="50%"
          transform="translateY(-50%)"
          bg="white"
          color="teal.700"
          zIndex={1}
          aria-label=""
        />
      </Flex>
      <HStack justifyContent="center" mt={5} spacing={3}>
        {testimonials.map((testimonial, index) => (
          <Box key={index} p={0} borderRadius="full" bg={index === current ? "teal.50" : "transparent"}>
            <Avatar
              name={testimonial.name}
              src={testimonial.image}
              size="md"
              cursor="pointer"
              border={index === current ? "2px solid teal" : "2px solid transparent"}
              transition="all 0.4s ease"
              onClick={() => setCurrent(index)}
              transform={index === current ? "scale(1.4)" : "scale(1)"}
            />
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default Testimonials;
