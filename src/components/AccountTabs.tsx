import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaBell, FaCreditCard, FaCogs } from 'react-icons/fa';
import AccountDetails from '@/components/AccountDetails';
import NotificationSettings from '@/components/NotificationSettings';
import BillingPayments from '@/components/BillingPayments';
import Preferences from '@/components/Preferences';
import { useDispatch, useSelector } from 'react-redux';
import { signOutStart } from '@/redux/slices/authSlice';
import { fetchSessionStart, fetchUserDetailsStart } from '@/redux/slices/authSlice';
import { fetchBillingDetailsStart, fetchSettingsStart, updateSettingsStart } from '@/redux/slices/settingsSlice';

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
  // { icon: FaCogs, label: 'Preferences', component: Preferences }, // add later
];

const AccountTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings.settings);
  const billings = useSelector((state: RootState) => state.settings.billingDetails);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const secLoading = useSelector((state: RootState) => state.settings.secLoading);
  const session = useSelector((state: RootState) => state.auth.session);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Fetch session and settings when the component mounts
    if (!session) {
      dispatch(fetchSessionStart());
    }
    if (!loading && session) {
      if (session?.user && session.user?.id) {
        const userId = session.user.id;
        if(userId) dispatch(fetchSettingsStart(userId));
        if (userId) dispatch(fetchUserDetailsStart(userId));
        if (userId) dispatch(fetchBillingDetailsStart(userId));
      }
    }
  }, [dispatch]);
  
  const handleSignOut = () => {
    dispatch(signOutStart());
  };
  
  const ActiveComponent = tabs[tabIndex].component;

  if (loading && session && user && secLoading) return <p>Loading...</p>;


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
              <ActiveComponent
              session = {session}
              user={user}
              settings={settings}
              loading={loading}
              secLoading={secLoading}
              billings={billings}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AccountTabs;
