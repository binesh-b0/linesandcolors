'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { validateEmail, validatePassword } from '@/services/validation';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './AuthForm.module.css';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { login, signUp } = useAuth();
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signUp(email, password);
      }
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = () => setIsLogin(!isLogin);
  const handleFocus = () => setError(null);

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={styles.authBox}
      >
        <div className={styles.formContainer}>
          <motion.div
            initial={{ x: isLogin ? '0%' : '-100%' }}
            animate={{ x: isLogin ? '0%' : '-100%' }}
            transition={{ duration: 0.5 }}
            className={styles.infoSection}
          >
            <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
            <p>{isLogin ? 'To keep connected with us please login with your personal info' : 'Or use your email for registration'}</p>
            <button className={styles.switchButton} onClick={handleSwitch}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </motion.div>
          <form onSubmit={handleAuth} className={styles.form}>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            {!isLogin && (
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={handleFocus}
                    required
                    className={styles.inputField}
                  />
                  <div className={styles.statusBar} style={{ backgroundColor: firstName ? 'green' : 'red' }}></div>
                </div>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={handleFocus}
                    required
                    className={styles.inputField}
                  />
                  <div className={styles.statusBar} style={{ backgroundColor: lastName ? 'green' : 'red' }}></div>
                </div>
              </div>
            )}
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleFocus}
                required
                className={`${styles.inputField} ${email && !isEmailValid ? styles.invalid : ''}`}
              />
              <div className={styles.statusBar} style={{ backgroundColor: isEmailValid ? 'green' : 'red' }}></div>
            </div>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleFocus}
                required
                className={`${styles.inputField} ${password && !isPasswordValid ? styles.invalid : ''}`}
              />
              <div className={styles.statusBar} style={{ backgroundColor: isPasswordValid ? 'green' : 'red' }}></div>
              <small className={styles.helperText}>
                Password must be at least 8 characters and include a lowercase letter, an uppercase letter, a number, and a special character.
              </small>
              <div className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            {!isLogin && (
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={handleFocus}
                  required
                  className={`${styles.inputField} ${password !== confirmPassword ? styles.invalid : ''}`}
                />
                <div className={styles.statusBar} style={{ backgroundColor: password === confirmPassword ? 'green' : 'red' }}></div>
              </div>
            )}
            <div className={styles.termsWrapper}>
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className={styles.checkbox}
                required
              />
              <label htmlFor="terms" className={styles.checkboxLabel}>I accept the terms and conditions</label>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.authButton} disabled={loading || !termsAccepted}>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
            <button className={styles.forgotPasswordButton} onClick={() => router.push('/forgot-password')}>
              Forgot Password?
            </button>
            <button className={styles.mobileSwitchButton} onClick={handleSwitch}>
              {isLogin ? 'Create Account' : 'Already have an account?'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
