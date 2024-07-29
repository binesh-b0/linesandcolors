"use client";

import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  HStack,
  Text,
  VStack,
  useTheme,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Regions and languages data
const regions = [
  {
    code: 'US',
    countryCode: 'US',
    name: 'United States',
    currency: { symbol: '$' },
    languages: [{ code: 'en', name: 'EN' }],
  },
  {
    code: 'CA',
    countryCode: 'CA',
    name: 'Canada',
    currency: { symbol: 'CA$' },
    languages: [
      { code: 'en', name: 'EN' },
      { code: 'fr', name: 'FR' },
    ],
  },
];

const RegionSwitcher: React.FC = () => {
  // State to manage modal open/close
  const [isOpen, setIsOpen] = useState(false);

  // State to manage the selected region and language
  const [selectedRegion, setSelectedRegion] = useState(regions[1]);
  const [selectedLanguage, setSelectedLanguage] = useState(selectedRegion.languages[0]);

  // Function to toggle the modal
  const toggleModal = () => setIsOpen(!isOpen);

  // Function to select a region and language
  const selectRegionLanguage = (region: any, language: any) => {
    setSelectedRegion(region);
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  const { colors } = useTheme();

  return (
    <div className="relative">
      {/* Opener button */}
      <Box
        onClick={toggleModal}
        className="flex items-center space-x-2 cursor-pointer"
        style={{
          background: 'transparent',
          color: 'black',
          padding: '8px 16px',
          borderRadius: '4px',
          transition: 'color 0.5s',
        }}
        _hover={{
          color: colors.teal[700],
        }}
      >
        {/* Display selected region flag and language */}
        <ReactCountryFlag countryCode={selectedRegion.countryCode} svg style={{ width: '1em', height: '1em' }} />
        <span>{selectedLanguage.code.toUpperCase()}</span>
      </Box>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={toggleModal} size="lg" isCentered>
        <ModalOverlay
          style={{ backdropFilter: 'blur(5px)' }} // Blur effect for the rest of the site
        />
        <ModalContent
          as={motion.div}
          initial={{ scale: 0.9, opacity: 0 }} // Initial state for animation
          animate={{ scale: 1, opacity: 1 }} // Animate to this state
          exit={{ scale: 0.9, opacity: 0 }} // Exit animation
          transition={{ duration: 0.5 }} // Spring animation settings
          style={{ backgroundColor: 'white', color: 'black', padding: '16px' }}
        >
          {/* Close button for the modal */}
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>Currently available only in the US and Canada.</Text>
            <VStack spacing={6} mt={4}>
              {/* Render each region */}
              {regions.map(region => (
                <Box key={region.code} width="full">
                  <HStack spacing={2} mt={2} alignItems="center" justifyContent={'flex-start'}>
                    {/* Country flag */}
                    <ReactCountryFlag countryCode={region.countryCode} svg style={{ width: '1em', height: '1em' }} />
                    {/* Country name */}
                    <Text fontSize="md" fontWeight="normal">
                      {region.name}
                    </Text>
                    {/* Currency symbol */}
                    <Text
                      style={{
                        border: '.1px solid grey',
                        borderRadius: '4px',
                        padding: '1px 3px',
                        fontSize: '0.7em',
                        color: 'grey',
                      }}
                    >
                      {region.currency.symbol}
                    </Text>
                    {/* Render each language */}
                    {region.languages.map(language => (
                      <Text
                        key={language.code}
                        onClick={() => selectRegionLanguage(region, language)}
                        color={'grey'}
                        style={{
                          cursor: 'pointer',
                          padding: '4px 8px',
                          fontWeight:'400',                          
                          transition: 'color 0.3s',
                        }}
                        _hover={{
                          color: colors.teal[800],
                        }}
                      >
                        {language.name}
                      </Text>
                    ))}
                  </HStack>
                </Box>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RegionSwitcher;
