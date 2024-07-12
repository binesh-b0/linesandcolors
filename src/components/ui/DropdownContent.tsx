import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DropdownContent.module.css';

interface DropdownContentProps {
  category: {
    id: number;
    name: string;
    image: string;
    description: string;
    subcategories: { id: number; name: string; image: string; description: string }[];
  };
}

const DropdownContent: React.FC<DropdownContentProps> = ({ category }) => {
  const [hoveredSubcategory, setHoveredSubcategory] = useState(category.subcategories[0]);

  useEffect(() => {
    setHoveredSubcategory(category.subcategories[0]);
  }, [category]);

  return (
    <div className={styles.dropdownContent}>
      <div className={styles.imageSection}>
        <AnimatePresence mode="wait">
          <motion.img
            key={hoveredSubcategory.id}
            src={hoveredSubcategory.image}
            alt={hoveredSubcategory.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.image}
          />
        </AnimatePresence>
      </div>
      <div className={styles.subcategoriesSection}>
        {category.subcategories.map((subcategory) => (
          <motion.a
            key={subcategory.id}
            href="#"
            className={styles.subcategoryLink}
            onMouseEnter={() => setHoveredSubcategory(subcategory)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {subcategory.name}
          </motion.a>
        ))}
      </div>
      <div className={styles.descriptionSection}>
        <motion.div
          key={hoveredSubcategory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>{hoveredSubcategory.name}</h3>
          <p>{hoveredSubcategory.description}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default DropdownContent;
