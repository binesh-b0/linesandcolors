"use client";
import { useState, useEffect } from 'react';
import { Box, VStack, HStack, Input, Button, Avatar, Text, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useToast } from '@chakra-ui/react';
import { FaEdit, FaPen } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchSettingsStart, updateSettingsStart } from '@/redux/slices/settingsSlice';
import { Settings } from '@/models/Settings';
import { User } from '@/models/User';
import { Session } from '@/models/Session';
import { fetchSessionStart, fetchUserDetailsStart } from '@/redux/slices/authSlice';
import { format } from 'date-fns';

interface AccountDetailsProps {
  session: Session;
  user: Partial<User>;
  settings: Partial<Settings>;
  loading: boolean;
  secLoading: boolean;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ session, user, settings, loading, secLoading }) => {
  const dispatch = useDispatch();
  // const settings = useSelector((state: RootState) => state.settings.settings);
  // const loading = useSelector((state: RootState) => state.auth.loading);
  // const secLoading = useSelector((state: RootState) => state.settings.secLoading);
  // const session = useSelector((state: RootState) => state.auth.session);
  // const user = useSelector((state: RootState) => state.auth.user);

  const [userDetails, setUserDetails] = useState<Partial<User>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [originalDetails, setOriginalDetails] = useState<Partial<Settings>>({});
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setUserDetails(user);
      setOriginalDetails(user);
    }
  }, [user]);

  // useEffect(() => {
  //   // Fetch session and settings if it doesnt exist
  //   if (!session) {
  //     dispatch(fetchSessionStart());
  //   }
  //   if (!settings) {
  //     dispatch(fetchSettingsStart());
  //   }
  //   if (!loading && session) {
  //     if (session?.user && session.user?.id) {
  //       const userId = session.user.id;
  //       dispatch(fetchUserDetailsStart(userId));
  //       if (user) setUserDetails(user);
  //     }
  //   }
  // }, [dispatch]);

  // Handle profile update
  const handleUpdate = async () => {
    if (settings) { // make sure settings is not null
      dispatch(updateSettingsStart(settings));
      setIsEditing(false);
      setHasChanges(false);
      toast({
        title: "Profile updated.",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle input change and mark as changed
  const handleInputChange = (field: keyof User, value: any) => {
    setUserDetails({ ...userDetails, [field]: value });
    setHasChanges(true);
  };

  // Cancel editing and revert changes
  const handleCancel = () => {
    setUserDetails(originalDetails);
    setIsEditing(false);
    setHasChanges(false);
  };

  // Handle password update
  const handlePasswordUpdate = () => {
    onOpen();
  };

// Function to format the account creation date
const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  return `Been a member since ${format(date, 'MMMM d, yyyy')}`;
};

  if (loading && session && userDetails) return <Text>Loading...</Text>;

  return (
    <VStack spacing={6} alignItems="flex-start">

      <VStack spacing={4} alignItems="flex-start" width="full">
        <HStack width="full" justifyContent="space-between">
          <Box width="full">
            <Text>Email</Text>
            <Text>{userDetails.email}</Text>
          </Box>
        </HStack>
        <HStack width="full" justifyContent="space-between">
          <Box width="full">
            <Text>First Name</Text>
            {isEditing ? (
              <Input value={userDetails.first_name} onChange={(e) => handleInputChange('first_name', e.target.value)} />
            ) : (
              <Text>{userDetails.first_name} <IconButton aria-label="Edit" icon={<FaPen />} onClick={() => setIsEditing(true)} variant="ghost" colorScheme="teal" /></Text>
            )}
          </Box>
        </HStack>
        <HStack width="full" justifyContent="space-between">
          <Box width="full">
            <Text>Last Name</Text>
            {isEditing ? (
              <Input value={userDetails.last_name} onChange={(e) => handleInputChange('last_name', e.target.value)} />
            ) : (
              <Text>{userDetails.last_name} <IconButton aria-label="Edit" icon={<FaPen />} onClick={() => setIsEditing(true)} variant="ghost" colorScheme="teal" /></Text>
            )}
          </Box>
        </HStack>
        <HStack width="full" justifyContent="space-between">
          <Box width="full">
            <Text>Username</Text>
            {isEditing ? (
              <Input value={userDetails.username} onChange={(e) => handleInputChange('username', e.target.value)} />
            ) : (
              <Text>{userDetails.username} <IconButton aria-label="Edit" icon={<FaPen />} onClick={() => setIsEditing(true)} variant="ghost" colorScheme="teal" /></Text>
            )}
          </Box>
        </HStack>
        <HStack width="full" justifyContent="space-between">
          <Box width="full">
            <Text>Password</Text>
            <Text>************ <IconButton aria-label="Edit" icon={<FaPen />} onClick={handlePasswordUpdate} variant="ghost" colorScheme="teal" /></Text>
          </Box>
        </HStack>
        {hasChanges && (
          <HStack spacing={4}>
            <Button colorScheme="teal" onClick={handleUpdate}>Save</Button>
            <Button colorScheme="red" onClick={handleCancel}>Cancel</Button>
          </HStack>
        )}
      </VStack>
      <HStack width="full" justifyContent="space-between">
        <VStack spacing={4} alignItems="flex-start">
          {session?.user && (
            <Text className='text-sm text-gray-500'>{getFormattedDate(session.user.created_at)}</Text>
          )}
        </VStack>
        <Box />
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Password</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder="Current Password" type="password" />
              <Input placeholder="New Password" type="password" />
              <Input placeholder="Confirm New Password" type="password" />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={() => { onClose(); toast({ title: "Password updated.", description: "Your password has been successfully updated.", status: "success", duration: 3000, isClosable: true }); }}>Save</Button>
            <Button colorScheme="red" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default AccountDetails;
