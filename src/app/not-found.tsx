"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from '@/styles/NotFound.module.css'
import React from 'react'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <motion.img src="/404.gif" alt="404" />
      <h2 className={styles.notFoundText}>Not Found</h2>
      <p className={styles.notFoundDescription}>Could not find requested resource</p>
      <button
        className='text-sm px-5 py-2.5 text-center mr-2 mb-2' 
        > 
        <Link href="/" legacyBehavior>
        <a className='text-teal-600'>Home</a>
        </Link>
      </button>
    </div>
  )
}