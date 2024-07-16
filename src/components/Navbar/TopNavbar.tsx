"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiHelpCircle, FiMenu } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import SideMenu from './SideMenu';
import SearchBar from '../ui/SearchBar';
import { useTheme } from '../../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchCartItemsStart } from '@/redux/slices/cartSlice';
import { signOutStart, fetchSessionStart } from '@/redux/slices/authSlice';

const TopNavbar: React.FC = () => {
  // Local state for menu and dropdowns
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // Hooks for theme and router
  const { colors } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state for session and cart items
  const session = useSelector((state: RootState) => state.auth.session);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  // Fetch session and cart items when component mounts
  useEffect(() => {
    if(!session)
    dispatch(fetchSessionStart());
  }, [dispatch]);
  
  useEffect(() => {
    if (session) {
      dispatch(fetchCartItemsStart(session.id));
    }
  }, [dispatch, session]);

  // Handle search logic
  const handleSearch = (query: string) => {
    // TODO: Implement search logic
    console.log(query);
  };

  // Handle user sign-out
  const handleSignOut = async () => {
    dispatch(signOutStart());
    // router.push('/');
  };

  // Variants for motion animations
  const navItemVariants = {
    hover: {
      scale: 1,
      color: colors.darkTeal,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
        duration: 0.3,
        delay: 0.1,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      {/* Large Screen View */}
      <div className="hidden md:flex justify-between items-center bg-white pr-4 pl-2 pt-2 sticky top-0 z-50">
        <Link href="/" legacyBehavior>
          <a className="text-2xl" style={{ fontFamily: 'poppins, sans-serif', marginLeft: '24px' }}>Lines and Colors</a>
        </Link>
        <div className="flex items-center space-x-6">
          <div className="flex justify-center p-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          <LanguageSwitcher />
          <motion.div
            whileHover="hover"
            variants={navItemVariants}
            className="relative flex items-center space-x-2 cursor-pointer"
            onMouseEnter={() => setDropdownOpen('help')}
          >
            <FiHelpCircle />
            <Link href="/help" legacyBehavior>
              <a>Help</a>
            </Link>
          </motion.div>
          <motion.div
            whileHover="hover"
            variants={navItemVariants}
            className="relative flex items-center space-x-2 cursor-pointer"
            onMouseEnter={() => setDropdownOpen('cart')}
          >
            <FiShoppingCart />
            <a>Cart</a>
          </motion.div>
          <motion.div
            whileHover="hover"
            variants={navItemVariants}
            className="relative flex items-center space-x-2 cursor-pointer"
            onMouseEnter={() => setDropdownOpen('account')}
          >
            <FiUser />
            <a>Account</a>
          </motion.div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden justify-between items-center bg-white p-4 shadow">
        <Link href="/" legacyBehavior>
          <a className="text-3xl" style={{ fontFamily: 'Futura' }}>Lines and Colors</a>
        </Link>
        <button onClick={() => setIsMenuOpen(true)}>
          <FiMenu size={24} />
        </button>
      </div>

      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            className="fixed top-14 right-0 mt-2 bg-white shadow-md p-4 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ height: '300px', width: '250px', right: '10px' }}
            onMouseEnter={() => setDropdownOpen(dropdownOpen)}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            {dropdownOpen === 'help' && (
              <div>
                <p>Help content here</p>
              </div>
            )}
            {dropdownOpen === 'cart' && (
              <div>
                {cartItems.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <ul>
                    {cartItems.map((item) => (
                      <li key={item.id}>{item.product_id}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {dropdownOpen === 'account' && (
              <div>
                {session ? (
                  <>
                    <button onClick={handleSignOut} className="block w-full text-left">Logout</button>
                    <Link href="/account" legacyBehavior>
                      <a className="block mt-2">Manage Account</a>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/register" legacyBehavior>
                      <a className="block w-full text-left">Login</a>
                    </Link>
                    <p className="mt-2">Login and register to manage and view account</p>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNavbar;
