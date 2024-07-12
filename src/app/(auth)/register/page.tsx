"use client";

import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  signInStart,
  signUpStart,
  setError,
} from '@/redux/slices/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state
  const { session, error, loading } = useSelector((state: RootState) => state.auth);

  // Local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session) {
      if (session.access_token)
        router.replace('/account');
    }
  }, [session, router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(signInStart({ email, password }));
    } else {
      dispatch(signUpStart({ email, password, firstName, lastName }));
    }
  };

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
  };

  const handleFocus = () => {
    if (error) {
      dispatch(setError(null));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      handleAuth={handleAuth}
      handleSwitch={handleSwitch}
      handleFocus={handleFocus}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      loading={loading}
      error={error}
    />
  );
};

export default Register;
