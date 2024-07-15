"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import categories from '../../config/fakedata.js';
import DropdownContent from '../ui/DropdownContent';
import styles from './MainNavbar.module.css';

const MainNavbar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const overlay = document.getElementById('overlay');
    if (activeCategory !== null) {
      overlay?.classList.add(styles.showOverlay);
    } else {
      overlay?.classList.remove(styles.showOverlay);
    }
  }, [activeCategory]);

  const handleMouseEnter = (index: number) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setActiveCategory(index);
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveCategory(null);
      setIsDropdownVisible(false);
    }, 2); // Adjust delay as needed
  };

  return (
    <>
      <div id="overlay" className={styles.overlay}></div>
      {/* <BlurredOverlay /> */}
      <div className={`bg-white shadow-md relative ${styles.navbar} z-50`}>
        <div className="hidden md:flex box-border justify-around px-4 items-center space-x-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`relative ${styles.navbarItem}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="relative py-2 box-content hover:text-teal-900 transition-colors duration-300">
                {category.name}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-black ${styles.underlineAnimation}`}
                  initial={{ width: 0 }}
                  animate={{ width: activeCategory === index ? '100%' : '0' }}
                  transition={{ duration: 0.2, easings: 'easeInOut' }}
                />
              </button>
            </div>
          ))}
        </div>
        <AnimatePresence>
          {activeCategory !== null && isDropdownVisible && (
            <motion.div
              className={`absolute left-0 top-full bg-white shadow-lg w-full p-4 z-50 ${styles.dropdown}`}
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
              <DropdownContent category={categories[activeCategory]} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MainNavbar;
