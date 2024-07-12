"use client";

// Import global CSS styles
import '../styles/globals.css';
import React, { ReactNode } from 'react';
import MainNavbar from '../components/Navbar/MainNavbar';
import Footer from '../components/Footer/Footer';
import { ThemeProvider } from '../context/ThemeContext';
import TopNavbar from '@/components/Navbar/TopNavbar';
import AdNavbar from '@/components/Navbar/AdNavbar';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '@/redux/store';

// Define the type for the layout props
interface RootLayoutProps {
  children: ReactNode;
}

// RootLayout component
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        {/* Provide Redux store to the application */}
        <Provider store={store}>
          {/* Provide Chakra UI styling */}
          <ChakraProvider>
            {/* Provide custom theme context */}
            <ThemeProvider>
              {/* Navigation bars */}
              <TopNavbar />
              <MainNavbar />
              <AdNavbar />
              {/* Main content */}
              {children}
              {/* Footer */}
              <Footer />
            </ThemeProvider>
          </ChakraProvider>
        </Provider>
      </body>
    </html>
  );
}
