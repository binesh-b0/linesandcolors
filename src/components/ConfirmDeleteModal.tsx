import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
  } from '@chakra-ui/react';
  
  interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose }) => {
    const handleDelete = () => {
      // Add logic to delete account here
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Account Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete your account? This action cannot be undone.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default ConfirmDeleteModal;
  