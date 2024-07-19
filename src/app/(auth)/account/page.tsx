"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import AccountTabs from '@/components/Account/AccountTabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchSessionStart } from '@/redux/slices/authSlice';

const AccountPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSelector((state: RootState) => state.auth.session);
  const loading = useSelector((state: RootState) => state.auth.loading);

  // Effect to fetch the session when the component mounts
  useEffect(() => {
    if(!session){
      dispatch(fetchSessionStart());
    }
  }, [dispatch]);

  // Effect to check if the user is authenticated
  useEffect(() => {
    if (!loading && !session) {
      router.replace('/register');
    }
  }, [session, loading, router]);

  // Display loading state while checking authentication
  if (loading) return <div>Account Loading...</div>;

  // Render the AccountTabs component if authenticated
  return <AccountTabs />;
};

export default AccountPage;
