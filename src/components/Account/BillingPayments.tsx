"use client";
import {
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Box,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import {
  fetchBillingDetails,
  updateBillingDetails,
  getUserAddresses,
  addAddress,
} from '@/services/settingsService'; // Implement these functions
import { Session } from '@/models/Session';
import { User } from '@/models/User';
import { BillingDetails, Address } from '@/models/Settings';

interface BillingPaymentsProps {
  session: Session;
  user: Partial<User>;
  billing: Partial<BillingDetails>;
  loading: boolean;
  secLoading: boolean;
}

const BillingPayments: React.FC<BillingPaymentsProps> = ({
  session,
  user,
  billing,
  loading,
  secLoading,
}) => {
  const [billingDetails, setBillingDetails] = useState<Partial<BillingDetails>>({});
  const [addresses, setAddresses] = useState<Address[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchBilling = async () => {
      if (user?.id) {
        const result = await fetchBillingDetails(user.id);
        if (result) {
          setBillingDetails(result.billingDetails);
          setAddresses(result.addresses || []);
        }
      }
    };
    fetchBilling();
  }, [user]);

  const handleUpdate = async () => {
    const updatedBilling = await updateBillingDetails(billingDetails);
    if (updatedBilling) {
      setBillingDetails(updatedBilling);
      toast({
        title: "Billing details updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (field: keyof BillingDetails, value: any) => {
    setBillingDetails({ ...billingDetails, [field]: value });
  };

  const handleAddAddress = async (newAddress: Partial<Address>) => {
    const addedAddress = await addAddress(newAddress);
    if (addedAddress) {
      setAddresses([...addresses, addedAddress]);
      toast({
        title: "Address added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  if (loading || secLoading) return <div>Loading...</div>;

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Billing Details
        </Text>
        <VStack spacing={4} align="stretch">
          <Box>
            <Text fontWeight="medium">Billing Address</Text>
            <Select
              placeholder="Select billing address"
              value={billingDetails.billing_address_id || ''}
              onChange={(e) => handleInputChange('billing_address_id', e.target.value)}
            >
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.address_line_1}, {address.city}
                </option>
              ))}
            </Select>
          </Box>
          <Box>
            <Text fontWeight="medium">Payment Method</Text>
            <Select
              placeholder="Select payment method"
              value={billingDetails.payment_method || ''}
              onChange={(e) => handleInputChange('payment_method', e.target.value)}
            >
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
              {/* Add more payment methods as needed */}
            </Select>
          </Box>
          <Button colorScheme="teal" onClick={handleUpdate}>
            Update Billing Details
          </Button>
        </VStack>
      </Box>
      <Box>
        <HStack justifyContent="space-between" mt={8}>
          <Text fontSize="2xl" fontWeight="bold">
            Addresses
          </Text>
          <Button colorScheme="teal" onClick={onOpen}>
            Add New Address
          </Button>
        </HStack>
        <VStack spacing={4} align="stretch">
          {addresses.map((address) => (
            <Box
              key={address.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              position="relative"
              _hover={{ boxShadow: 'lg' }}
            >
              <Text fontWeight="medium">{address.title}</Text>
              <Text>{address.address_line_1}</Text>
              <Text>{address.city}, {address.country}</Text>
              <Text>{address.postal_code}</Text>
              <Text>{address.phone_number}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Address</ModalHeader>
          <ModalBody>
            <AddressForm onSave={handleAddAddress} onCancel={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

interface AddressFormProps {
  onSave: (address: Partial<Address>) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSave = () => {
    const newAddress = {
      title,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      country,
      city,
      postal_code: postalCode,
      landmark,
      phone_number: phoneNumber,
    };
    onSave(newAddress);
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Address Line 1"
        value={addressLine1}
        onChange={(e) => setAddressLine1(e.target.value)}
      />
      <Input
        placeholder="Address Line 2"
        value={addressLine2}
        onChange={(e) => setAddressLine2(e.target.value)}
      />
      <Input
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <Input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Input
        placeholder="Postal Code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <Input
        placeholder="Landmark"
        value={landmark}
        onChange={(e) => setLandmark(e.target.value)}
      />
      <Input
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <HStack spacing={4} mt={4}>
        <Button colorScheme="teal" onClick={handleSave}>
          Save
        </Button>
        <Button colorScheme="red" onClick={onCancel}>
          Cancel
        </Button>
      </HStack>
    </VStack>
  );
};

export default BillingPayments;
