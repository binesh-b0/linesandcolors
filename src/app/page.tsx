"use client";
import React from 'react';
import Advertisement from '../components/Advertisement';
import TrustedCustomers from '@/components/home/TrustedCustomers';
import MailingList from '@/components/home/MailingList';
import Hero from '@/components/home/Hero';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <div className='container-fluid mx-auto'>

      {/* <Advertisement /> */}
      {/* Main Section: Add your main content here */}
      <Hero />
      <TrustedCustomers />
      <MailingList />
    </div>
  );
};

