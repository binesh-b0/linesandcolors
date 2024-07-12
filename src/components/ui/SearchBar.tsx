"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSearch } from 'react-icons/fi';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  animatedWidth?: string;
  enableAnimations?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, animatedWidth = '400px', enableAnimations = true }) => {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
    onSearch(query);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.div
      className={styles.searchBar}
      animate={{ width: isFocused && enableAnimations ? animatedWidth : '100%' }}
      transition={{ duration: 0.3 }}
    >
      <FiSearch className={styles.searchIcon} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        
        placeholder="Search..."
        className={styles.input}
      />
      {isTyping && (
        <motion.button
          className={styles.clearButton}
          onClick={handleClear}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FiX />
        </motion.button>
      )}
    </motion.div>
  );
};

export default SearchBar;
