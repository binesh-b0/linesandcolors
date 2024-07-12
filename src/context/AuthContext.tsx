"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  getSession,
  signInWithPassword,
  signOut,
  signUp,
  sendPasswordResetEmail,
  resetPassword,
  verifyEmail,
} from '@/services/authService';
import { supabase } from '@/config/supabaseClient';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

// Define the shape of the AuthContext's value
interface AuthContextProps {
  session: any;
  setSession: (session: any) => void;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider component to wrap around the app's components
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State variables to manage session, loading, and error states
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Initialize authentication state and set up Supabase auth listener
  useEffect(() => {
    const initAuth = async () => {
      // Parse cookies to get the auth token
      const cookies = parseCookies();
      const authToken = cookies.authToken;

      // If auth token exists, fetch the session
      if (authToken) {
        try {
          const data = await getSession();
          setSession(data.session);
        } catch (error: any) {
          setError(error.message);
          destroyCookie(null, 'authToken');
        }
      }

      // Set up Supabase auth state change listener
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          if (session) {
            setSession(session);
            // Set auth token in cookies
            setCookie(null, 'authToken', session.access_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 30 * 24 * 60 * 60,
              path: '/',
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          destroyCookie(null, 'authToken');
        }
      });

      // Clean up the listener on component unmount
      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    initAuth();
  }, []);

  // Function to handle user sign-out
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      setSession(null);
      destroyCookie(null, 'authToken');
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user sign-in
  const handleSignInWithPassword = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await signInWithPassword(email, password);
      setSession(data.session);
      console.log("sign in with password",data)
      setCookie(null, 'authToken', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      router.push('/account');
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user sign-up
  const handleSignUp = async (email: string, password: string, firstName: string, lastName: string) => {
    setLoading(true);
    try {
      const data = await signUp(email, password, firstName, lastName);
      setSession(data.session);
      if(data.session)
      setCookie(null, 'authToken', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      router.push('/account');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Return the AuthContext provider with the defined state and functions
  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
        signOut: handleSignOut,
        signIn: handleSignInWithPassword,
        signUp: handleSignUp,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
