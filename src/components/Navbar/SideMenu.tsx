"use client";

import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import Link from 'next/link';
import RegionSwitcher from './RegionSwitcher';
import categories from '../../config/fakedata';

interface SideMenuProps {
    onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <Link href="/" legacyBehavior>
                    <a className="text-3xl" style={{ fontFamily: 'Futura, sans-serif' }}>Lines and Colors</a>
                </Link>
                <button onClick={onClose}>
                    <FiX size={24} />
                </button>
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="border p-2 rounded w-full"
                />
                <button className="absolute right-2 top-2">
                    <FiSearch />
                </button>
            </div>
            <div className="mb-4 flex flex-row">
                <div className='flex items-center justify-center mr-2 ml-2'>
                    <RegionSwitcher />
                </div>
                <div className='flex items-center justify-center mr-2'>
                    <Link href="/help" legacyBehavior>
                        <a className="block p-2">Help</a>
                    </Link>
                </div>
            </div>
            <div className="mt-4">
                {categories.map(category => (
                    <div key={category.id}>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        <div className="pl-4">
                            {category.subcategories.map(subcategory => (
                                <a key={subcategory.id} href="#" className="block p-2">{subcategory.name}</a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideMenu;
