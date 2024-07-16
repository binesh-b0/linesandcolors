"use client";

import React from 'react';
import Marquee from 'react-fast-marquee';

const AdNavbar: React.FC = () => {
  const advertisements = [
    'Special Offer: 50% off on all business cards!',
    'Free shipping on orders over $50!',
    'Limited time: Get 20% off on flyers and brochures!',
  ];

  return (
    <div className="bg-teal-800 text-white p-2 text-center text-sm">
      <Marquee gradient={false}>
        {advertisements.map((ad, index) => (
          <span key={index} className="mx-4">{ad}</span>
        ))}
      </Marquee>
    </div>
  );
};

export default AdNavbar;
