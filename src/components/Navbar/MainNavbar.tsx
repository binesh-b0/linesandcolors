"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import categories from '../../config/fakedata.js';
import DropdownContent from '../ui/DropdownContent';

const MainNavbar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMouseEnter = (index: number) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setActiveCategory(index);
    onOpen();
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveCategory(null);
      onClose();
    }, 200); // Adjust delay as needed
  };

  useEffect(() => {
    const overlay = document.getElementById('overlay');
    if (activeCategory !== null) {
      overlay?.classList.add('showOverlay');
    } else {
      overlay?.classList.remove('showOverlay');
    }
  }, [activeCategory]);

  return (
    <>
      <Box id="overlay" className="overlay"></Box>
      <Box bg="white" shadow="md" position="relative" zIndex="50" width="100%">
        <Flex display={{ base: 'none', md: 'flex' }} justify="space-around" px="4" align="center">
          {categories.map((category, index) => (
            <Box
              key={category.id}
              position="relative"
              p="3px"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Button variant="link" py="2" _hover={{ textDecoration: 'none', color: 'teal.900' }} transition="color 0.3s">
                {category.name}
                <motion.div
                  style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', backgroundColor: 'var(--color-dark-teal)' }}
                  initial={{ width: 0 }}
                  animate={{ width: activeCategory === index ? '100%' : '0' }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                />
              </Button>
            </Box>
          ))}
        </Flex>
        <AnimatePresence>
          {activeCategory !== null && isOpen && (
            <motion.div
              key={activeCategory}
              style={{ position: 'absolute', left: 0, top: '100%', backgroundColor: 'white', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '100vw', padding: '16px', height: '350px', zIndex: 50 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onMouseEnter={() => {
                if (dropdownTimeout.current) {
                  clearTimeout(dropdownTimeout.current);
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              <Box display="flex" width="100%" padding="16px">
                  <DropdownContent category={categories[activeCategory]} />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
};

export default MainNavbar;
