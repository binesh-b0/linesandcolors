"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiHelpCircle, FiMenu } from 'react-icons/fi';
import { Box, HStack, IconButton, Button, Image, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchCartItemsStart } from '@/redux/slices/cartSlice';
import { signOutStart, fetchSessionStart } from '@/redux/slices/authSlice';
import LanguageSwitcher from './LanguageSwitcher';
import SideMenu from './SideMenu';
import SearchBar from '../ui/SearchBar';

const TopNavbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSelector((state: RootState) => state.auth.session);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (!session) dispatch(fetchSessionStart());
  }, [dispatch, session]);

  useEffect(() => {
    if (session) {
      dispatch(fetchCartItemsStart(session.id));
    }
  }, [dispatch, session]);

  const handleSearch = (query: string) => {
    console.log(query);
  };

  const handleSignOut = async () => {
    dispatch(signOutStart());
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const linkButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    background: 'transparent',
    color: '#424242',
    fontWeight: 'normal',
    padding: 0,
    height: 'auto',
    _hover: {
      color: '#0B6162',
      textDecoration: 'none',
    },
    _focus: {
      boxShadow: 'none',
    },
    _active: {
      background: 'transparent',
      transform: 'scale(0.98)',
    },
    transition: 'color 0.7s, transform 0.3s',
    gap: '0.5rem', // Adjusts spacing between icon and text
  };

  return (
    <>
      <Box className="hidden md:flex justify-between items-center bg-white pr-4 pl-8 pt-2 sticky top-0 z-50">
        <Button onClick={() => handleNavigate('/')} {...linkButtonStyle}>
          <Image src="/logo.svg" alt="Lines and Colors" height="20px" />
        </Button>
        <HStack spacing={6}>
          <Box className="flex justify-center p-4">
            <SearchBar onSearch={handleSearch} />
          </Box>
          <LanguageSwitcher />
          <Button onClick={() => handleNavigate('/help')} {...linkButtonStyle}>
            <FiHelpCircle />
            <span>Help</span>
          </Button>
          <Button onClick={() => handleNavigate('/cart')} {...linkButtonStyle}>
            <FiShoppingCart />
            <span>Cart</span>
          </Button>
          <Button onClick={() => handleNavigate('/account')} {...linkButtonStyle}>
            <FiUser />
            <span>Account</span>
          </Button>
        </HStack>
      </Box>

      <Box className="flex md:hidden justify-between items-center bg-white p-4 shadow">
        <Button onClick={() => handleNavigate('/')} {...linkButtonStyle}>
          <Image src="/logo.svg" alt="Lines and Colors" height="40px" />
        </Button>
        <IconButton icon={<FiMenu size={24} />} aria-label="Open Menu" onClick={onOpen} />
      </Box>

      {isOpen && <SideMenu onClose={onClose} />}
    </>
  );
};

export default TopNavbar;
