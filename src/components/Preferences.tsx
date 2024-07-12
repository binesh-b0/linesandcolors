"use client";
import { VStack, Checkbox, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getPreferences, updatePreferences } from '@/services/user'; // Implement these functions

const Preferences = () => {
  const [preferences, setPreferences] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      const prefs = await getPreferences();
      setPreferences(prefs);
      setIsLoading(false);
    };
    fetchPreferences();
  }, []);

  const handleUpdate = async () => {
    // Update preferences logic
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <VStack spacing={4}>
      <Checkbox isChecked={preferences.darkMode}>Dark Mode</Checkbox>
      <Checkbox isChecked={preferences.emailUpdates}>Email Updates</Checkbox>
      <Button colorScheme="teal" onClick={handleUpdate}>Update Preferences</Button>
    </VStack>
  );
};

export default Preferences;
