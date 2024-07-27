"use client";
import { Box, Heading, Flex, Image, Text } from '@chakra-ui/react';

const Services = () => {
  const content = [
    {
      title: "High-Quality Printing",
      description: "We provide top-notch printing services for all your business and personal needs. Whether it's marketing materials, stationery, or custom prints, we ensure the highest quality and attention to detail.",
      image: "/images/quality.svg" 
    },
    {
      title: "Affordable Prices",
      description: "Our prices are competitive, ensuring you get the best value for your money. We offer various pricing plans to suit different budgets without compromising on quality.",
      image: "/images/savings.svg" 
    },
    {
      title: "Customer Satisfaction",
      description: "We prioritize customer satisfaction with our dedicated support and quality products. Our team is always ready to assist you with any queries or concerns you may have.",
      image: "/images/happy.svg"
    },
    {
      title: "Custom Designs",
      description: "Get personalized print designs that reflect your brand and vision. Our design team works closely with you to create custom graphics and layouts tailored to your needs.",
      image: "/images/design.svg"
    },
    {
      title: "Fast Delivery",
      description: "Enjoy swift and reliable delivery for all your orders. We partner with trusted logistics providers to ensure your products reach you on time, every time.",
      image: "/images/delivery.svg"
    },
    {
      title: "24/7 Support",
      description: "Our support team is available around the clock to assist you. Whether you have questions about our services or need help with an order, we're here to help.",
      image: "/images/support.svg"
    }
  ];

  return (
    <Box py={10} mb={32} px={10} bg="white" color="teal.700">
      <Heading as="h2" textAlign="center" mb={10} fontSize={{ base: '2xl', md: '4xl' }}>
        How We Can Help Your Business And Personal Needs
      </Heading>
      <Flex direction={{ base: 'column', md: 'row' }} wrap="wrap" justify="center" align="center">
        {content.map((item, index) => (
          <Box key={index} textAlign="center" p={5} m={2} maxWidth="300px">
            <Image src={item.image} alt={item.title} boxSize="100px" mx="auto" mb={4} />
            <Text fontSize={{ base: 'lg', md: 'xl' }}>{item.title}</Text>
            <Text fontSize={{ base: 'sm', md: 'md' }}>{item.description}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Services;
