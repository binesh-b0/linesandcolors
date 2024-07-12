"use client";
import { useState, useEffect } from 'react';
import { Box, VStack, HStack, Input, Button, Avatar, Text, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useToast } from '@chakra-ui/react';
import { FaEdit, FaPen } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchSettingsStart, updateSettingsStart } from '@/redux/slices/settingsSlice';
import { Settings } from '@/models/Settings';
import { User } from '@/models/User'
import { fetchSessionStart, fetchUserDetailsStart } from '@/redux/slices/authSlice';

const AccountDetails = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings.settings);
  const loading = useSelector((state: RootState) => state.settings.loading);
  const secLoading = useSelector((state: RootState) => state.settings.secLoading);
  const session = useSelector((state: RootState) => state.auth.session);
  const user = useSelector((state: RootState) => state.auth.user)

  const [userDetails, setUserDetails] = useState<Partial<User>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [originalDetails, setOriginalDetails] = useState<Partial<Settings>>({});
  const toast = useToast();

  useEffect(() => {
    // Fetch settings when the component mounts
    // console.log('session account details',session)
    if(!session){
      dispatch(fetchSessionStart())
    }
    if (!settings) {
      dispatch(fetchSettingsStart());
      // console.log("settings in acc details",settings)
    }
    if(!loading && session)
        if(session?.user && session.user?.id){
           const userId = session.user.id
           console.log(userId)
            dispatch(fetchUserDetailsStart(userId));
            setUserDetails(user);
            console.log("user details", userDetails);
          }      
   
  }, [dispatch]);

  // useEffect(() => {
  //   if (settings) {
  //     setUserDetails(user);
  //     setOriginalDetails(settings);
  //   }
  // }, [settings]);

  const handleUpdate = async () => {
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
  };

  const handleInputChange = (field: keyof User, value: any) => {
    setUserDetails({ ...userDetails, [field]: value });
    setHasChanges(true);
  };

  const handleCancel = () => {
    setUserDetails(originalDetails);
    setIsEditing(false);
    setHasChanges(false);
  };

  const handlePasswordUpdate = () => {
    // Handle password update logic here
    onOpen();
  };
  const getCreatedDate = (session) =>{
    try {
      return session.user.created_at;
    } catch (error) {
      console.log("no session")
      return null;
    }
  }

  if (loading && session && userDetails) return <Text>Loading...</Text>;
else
  return (
    <VStack spacing={6} alignItems="flex-start">
      <HStack width="full" justifyContent="space-between">
        <VStack spacing={4} alignItems="flex-start">
          {/* <Avatar size="xl" src={userDetails.profilePic} /> */}
          {session && (<Text>Date Joined: {new Date(session.created_at!).toLocaleDateString()}</Text>
          )}
        </VStack>
        <Box>

        </Box>
      </HStack>
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
