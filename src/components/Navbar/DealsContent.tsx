"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Image, Text, VStack, HStack } from '@chakra-ui/react';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
  subcategories: Product[];
}

interface DealsContentProps {
  category: Category;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeIn' }}
    style={{ width: 'calc(33.33% - 8px)', padding: '4px', background: 'lightyellow', borderRadius: '8px', marginBottom: '8px' }}
  >
    <Text fontWeight="bold" fontSize="sm" marginBottom="4px">
      {product.name}
    </Text>
    <Image src={product.image} alt={product.name} borderRadius="md" boxSize="100px" objectFit="cover" />
    <Text fontSize="sm" marginBottom="8px">
      {product.description}
    </Text>
    <Box bg="teal.100" px="2" py="1" borderRadius="md" fontSize="xs" color="teal.800">
      Special Offer!
    </Box>
  </motion.div>
);

const DealsContent: React.FC<DealsContentProps> = ({ category }) => (
  <Box display="flex" width="100%" padding="8px" flexDirection="column" height="380px">
    <Box display="flex" justifyContent="space-between">
      <Box width="20%" padding="4px">
        <Image src={category.image} alt={category.name} borderRadius="md" boxSize="150px" objectFit="cover" />
        <Text marginTop="4px" fontSize="sm">{category.description}</Text>
      </Box>
      <Box width="75%" padding="4px">
        <Box display="flex" flexWrap="wrap">
          {category.subcategories.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Box>
    </Box>
  </Box>
);

export default DealsContent;
