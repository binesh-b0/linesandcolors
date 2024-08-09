"use client";
import { VStack, Checkbox, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { fetchUserSettings } from '@/services/settingsService'; // Implement these functions

const Preferences = () => {
  const [preferences, setPreferences] = useState({darkMode:false,emailUpdates:false});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      // const prefs = await fetchUserSettings();
      // setPreferences(prefs);
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
