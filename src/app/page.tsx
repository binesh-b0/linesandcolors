"use client";
import React from 'react';
import Advertisement from '../components/Advertisement';
import TrustedCustomers from '@/components/home/TrustedCustomers';
import Hero from '@/components/home/Hero';
import Footer from '@/components/Footer/Footer';
import Services from '@/components/home/Services';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import JoinMailingList from '@/components/home/JoinMailList';

export default function Home() {
  return (
    <div className='container-fluid mx-auto'>

      <Hero />
      <Services />
      <FeaturedProducts />
      {/* Testimonials */}
      <TrustedCustomers />
      <JoinMailingList />
    </div>
  );
};

