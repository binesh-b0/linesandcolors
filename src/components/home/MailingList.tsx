"use client";

import React from 'react';

const MailingList: React.FC = () => {
  return (
    <div className="bg-blue-100 p-4 text-center">
      <h2 className="text-xl font-semibold">Join Our Mailing List</h2>
      <input type="email" placeholder="Your email" className="border p-2 rounded" />
      <button className="bg-blue-500 text-white p-2 rounded ml-2">Subscribe</button>
    </div>
  );
};

export default MailingList;
