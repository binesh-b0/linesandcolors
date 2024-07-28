"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import categories from '@/config/fakedata.js';
import DropdownContent from '@/components/Navbar/DropdownContent';

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
    }, 50); // Adjust delay as needed
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
      <Box id="overlay" className="overlay backdrop-blur"></Box>
      <Box bg="white" shadow="md" position="relative" zIndex="50" width="100%">
        <Flex display={{ base: 'none', md: 'flex' }} justify="space-evenly" padding={4} align="center" className='flex-wrap' >
          {categories.map((category, index) => (
            <Box
              key={category.id}
              position="relative"
              padding="3px"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              maxWidth={'230px'}
              className="whitespace-normal"
            >
              <Button className='whitespace' variant="link" py="2" _hover={{ textDecoration: 'none', color: 'teal.900' }} transition="color 0.3s" fontWeight='normal'>
                {category.name}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-teal-900"
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
              className="absolute left-0 top-full bg-white shadow-lg w-full p-4 h-[380px] z-40 overflow-hidden"
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
              <Box className="flex w-full p-4">
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
