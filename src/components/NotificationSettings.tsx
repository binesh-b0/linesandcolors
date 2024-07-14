"use client";
import { VStack, Switch, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettingsStart, updateSettingsStart } from '@/redux/slices/settingsSlice';
import { RootState } from '@/redux/store';
import { Session } from '@/models/Session';
import { User } from '@/models/User';
import { Settings } from '@/models/Settings';

interface NotificationSettingsProps {
  session:Session;
  user:User;
  settings:Partial<Settings>;
  loading:boolean;
  secLoading:boolean;
}

const NotificationSettings:React.FC<NotificationSettingsProps> = ({  session, user,settings, loading,secLoading }) => {
  const dispatch = useDispatch();
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  useEffect(() => {
    if (!settings) {
      dispatch(fetchSettingsStart());
    } else {
      setEmailNotifications(settings.email_updates?settings.email_updates:false);
      setSmsNotifications(settings.sms_notifications?settings.sms_notifications:false);
    }
  }, [dispatch, settings]);

  const handleUpdate = async () => {
    dispatch(updateSettingsStart({
      ...settings,
      emailUpdates: emailNotifications,
      sms_notificatinos:smsNotifications,
      updated_at:new Date(Date.now()),
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <VStack spacing={4}>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-notifications" mb="0">
          Email Notifications
        </FormLabel>
        <Switch id="email-notifications" isChecked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="sms-notifications" mb="0">
          SMS Notifications
        </FormLabel>
        <Switch id="sms-notifications" isChecked={smsNotifications} onChange={(e) => setSmsNotifications(e.target.checked)} />
      </FormControl>
      <Button colorScheme="teal" onClick={handleUpdate}>Update Settings</Button>
    </VStack>
  );
};

export default NotificationSettings;
