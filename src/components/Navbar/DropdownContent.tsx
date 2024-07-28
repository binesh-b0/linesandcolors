"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Image, Text, VStack, HStack, Button, Divider } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
// import categories from './categories';
import DealsContent from './DealsContent';

interface Subproduct {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  subproducts: Subproduct[];
  description:string;
}

interface Subcategory {
  id: number;
  name: string;
  image: string;
  description: string;
  products: Product[];
}

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
  subcategories: Subcategory[];
}

interface DropdownContentProps {
  category: Category;
}

const DropdownContent: React.FC<DropdownContentProps> = ({ category }) => {
  const [hoveredSubcategory, setHoveredSubcategory] = useState<Subcategory>(category.subcategories[0]);
  const [hoveredProduct, setHoveredProduct] = useState<Product>(hoveredSubcategory.products[0]);

  useEffect(() => {
    setHoveredSubcategory(category.subcategories[0]);
    setHoveredProduct(category.subcategories[0].products[0]);
  }, [category]);

  useEffect(() => {
    setHoveredProduct(hoveredSubcategory.products[0]);
  }, [hoveredSubcategory]);

  if (category.name === "Deals") {
    return <DealsContent category={category} />;
  }

  return (
    <Box display="flex" width="100%" padding="8px" flexDirection="column" height="380px">
      <Box display="flex" justifyContent="space-between">
        {/* Column 1: Image, Description, More Button */}
        <Box width="18%" padding="4px">
          <AnimatePresence mode="wait">
            <motion.div
              key={category.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image src={category.image} alt={category.name} borderRadius="md" boxSize="200px" objectFit="cover" />
            </motion.div>
          </AnimatePresence>
          <Text marginTop="12px" fontSize="sm">{category.description}</Text>
          <Button colorScheme="teal" variant="outline" size="sm" marginTop="32px">
            More
          </Button>
        </Box>
        <Divider orientation='vertical' paddingX={3} />
        {/* Column 2: Subcategories */}
        <Box width="18%" padding="4px">
          {category.subcategories.map((subcategory) => (
            <HStack
              key={subcategory.id}
              spacing={2}
              marginBottom="4px"
              onMouseEnter={() => setHoveredSubcategory(subcategory)}
              padding="4px"
              borderRadius="md"
              _hover={{ bg: 'teal.100', cursor: 'pointer' }}
              bg={hoveredSubcategory.id === subcategory.id ? 'teal.50' : 'transparent'}
            >
              <Image boxSize="30px" src={subcategory.image} alt={subcategory.name} borderRadius="md" />
              <Box flex="1">
                <Text fontWeight="normal" fontSize="sm">
                  {subcategory.name.replace('Business Cards', '')}
                </Text>
              </Box>
              <ChevronRightIcon />
            </HStack>
          ))}
        </Box>

        {/* Column 3: Subcategory Description and Products */}
        <Box width="66%" paddingX="32px" paddingY={"4px"}>
          <Box marginBottom="8px" marginLeft={'4px'}>
            {/* <Text fontWeight="bold" fontSize="sm" marginBottom="4px">
              {hoveredSubcategory.name}
            </Text> */}
            <Text fontSize="sm" marginBottom="8px">
              {hoveredSubcategory.description}
            </Text>
          </Box>
          <Box display="flex" flexWrap="wrap">
            {hoveredSubcategory.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeIn' }}
                style={{ padding: '4px', alignContent:'baseline' }}
              >
                <HStack
                  spacing={2}
                  onMouseEnter={() => setHoveredProduct(product)}
                  padding="12px"
                  borderRadius="md"
                  bg="teal.10"
                  alignItems={'flex-start'}
                  _hover={{ bg: 'teal.100' }}
                >
                  <Image boxSize="40px" src={product.image} alt={product.name} borderRadius="md" />
                  <Box>
                    <Text fontWeight="bold" fontSize="sm" noOfLines={1} color={"teal.500"}>
                      {product.name}
                    </Text>
                    <Text fontWeight="normal" fontSize="sm" noOfLines={2} textOverflow={'ellipsis'}>
                      {product.description}
                    </Text>
                    <HStack spacing={2} marginTop="4px" wrap="wrap">
                      {product.subproducts.map((subproduct) => (
                        <Box
                          key={subproduct.id}
                          bg="grey.100"
                          px="2"
                          py="1"
                          borderRadius="md"
                          fontSize="xs"
                          color="blue.900"
                        >
                          {subproduct.name}
                        </Box>
                      ))}
                    </HStack>
                  </Box>
                </HStack>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DropdownContent;
