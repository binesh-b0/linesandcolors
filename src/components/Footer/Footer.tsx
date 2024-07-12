"use client";

import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className='flex justify-center p-2'>
        <a href="https://storyset.com/online" className='text-xs text-gray-500'>Online illustrations by Storyset</a>
        </div>
      <div className="flex justify-around">
        <div>
          <h3 className="font-semibold">About Us</h3>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Support</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Shipping & Returns</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Follow Us</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default Footer;
