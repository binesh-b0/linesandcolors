import { useToast as useChakraToast } from '@chakra-ui/react';

const useToast = () => {
  const toast = useChakraToast();

  const showToast = (title:string, description:string, status:string = 'info') => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return showToast;
};

export default useToast;
