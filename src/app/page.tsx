"use client";
import React from 'react';
import Advertisement from '../components/Advertisement';
import TrustedCustomers from '@/components/TrustedCustomers';
import MailingList from '@/components/MailingList';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <div className='container-fluid mx-auto'>

      {/* <Advertisement /> */}
      {/* Main Section: Add your main content here */}
      <TrustedCustomers />
      <MailingList />
    </div>
  );
};

