"use client";
import { VStack, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getBillingDetails, updateBillingDetails } from '@/services/user'; // Implement these functions

const BillingPayments = () => {
  const [billingDetails, setBillingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBillingDetails = async () => {
      const details = await getBillingDetails();
      setBillingDetails(details);
      setIsLoading(false);
    };
    fetchBillingDetails();
  }, []);

  const handleUpdate = async () => {
    // Update billing details logic
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <VStack spacing={4}>
      <Text>Billing Address: {billingDetails.address}</Text>
      <Text>Payment Method: {billingDetails.paymentMethod}</Text>
      <Button colorScheme="teal" onClick={handleUpdate}>Update Billing Details</Button>
    </VStack>
  );
};

export default BillingPayments;
