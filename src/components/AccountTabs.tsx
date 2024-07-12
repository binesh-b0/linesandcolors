import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaBell, FaCreditCard, FaCogs } from 'react-icons/fa';
import AccountDetails from '@/components/AccountDetails';
import NotificationSettings from '@/components/NotificationSettings';
import BillingPayments from '@/components/BillingPayments';
import Preferences from '@/components/Preferences';
import { useDispatch, useSelector } from 'react-redux';
import { signOutStart } from '@/redux/slices/authSlice';
import { fetchSessionStart } from '@/redux/slices/authSlice';
import './AccountTabs.css'; // Add necessary CSS
import { RootState } from '@/redux/store';

const tabPanelVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const tabs = [
  { icon: FaUser, label: 'Account', component: AccountDetails },
  { icon: FaBell, label: 'Notification', component: NotificationSettings },
  { icon: FaCreditCard, label: 'Billing & Payments', component: BillingPayments },
  { icon: FaCogs, label: 'Preferences', component: Preferences },
];

const AccountTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOutStart());
  };

  
  const ActiveComponent = tabs[tabIndex].component;

  return (
    <div className="account-tabs-container">
      <div className="account-tabs-header">
        <button onClick={handleSignOut} className="logout-button">
          Logout
        </button>
      </div>
      <div className="account-tabs">
        <div className="tab-list">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab ${tabIndex === index ? 'active' : ''}`}
              onClick={() => setTabIndex(index)}
            >
              <tab.icon />
              {tab.label}
            </div>
          ))}
        </div>
        <div className="tab-panels">
          <AnimatePresence mode='wait'>
            <motion.div
              key={tabIndex}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={tabPanelVariants}
              className="tab-panel"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty('--mouse-x', '50%');
                e.currentTarget.style.setProperty('--mouse-y', '50%');
              }}
              style={{
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <ActiveComponent/>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AccountTabs;
