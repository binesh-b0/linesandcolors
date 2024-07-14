import React, { useState } from 'react';
import { Input } from '@chakra-ui/react';

const AddressLookup: React.FC<{ onAddressSelect: (address: string) => void }> = ({ onAddressSelect }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Call Google Places API to get suggestions
    // onAddressSelect(selectedAddress); // Call this when an address is selected
  };

  return <Input placeholder="Start typing address..." value={query} onChange={handleChange} />;
};

export default AddressLookup;
