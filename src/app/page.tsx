"use client";
import React from 'react';
import Advertisement from '../components/Advertisement';
import TrustedCustomers from '@/components/home/TrustedCustomers';
import Hero from '@/components/home/Hero';
import Footer from '@/components/Footer/Footer';
import Services from '@/components/home/Services';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import JoinMailingList from '@/components/home/JoinMailList';
import ImageShowcase from '@/components/home/ImageShowcase';
import AllProducts from '@/components/home/AllProducts';
import ScrollAnimationComponent from '@/components/home/ScrollAnimationComponent';

// import { motion } from 'framer-motion'
export default function Home() {
  return (
    <div className='container-fluid mx-auto'>

      <Hero />
      <Services />
      <FeaturedProducts />
      <AllProducts />
      <ImageShowcase />
      {/* Testimonials */}
      <TrustedCustomers />
      <ScrollAnimationComponent />
      <JoinMailingList />
    </div>
  );
};

