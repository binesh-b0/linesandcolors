"use client";
import { VStack, Checkbox, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getNotificationSettings, updateNotificationSettings } from '@/services/settingsService'; // Implement these functions

const NotificationSettings = () => {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getNotificationSettings();
      setSettings(settings);
      setIsLoading(false);
    };
    fetchSettings();
  }, []);

  const handleUpdate = async () => {
    // Update notification settings logic
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <VStack spacing={4}>
      kjjnkjnkm
      <Checkbox isChecked={settings.emailNotifications}>Email Notifications</Checkbox>
      <Checkbox isChecked={settings.smsNotifications}>SMS Notifications</Checkbox>
      <Button colorScheme="teal" onClick={handleUpdate}>Update Settings</Button>
    </VStack>
  );
};

export default NotificationSettings;
