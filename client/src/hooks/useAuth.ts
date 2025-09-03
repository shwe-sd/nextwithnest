// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { loginApi, signupApi } from '@/api/auth';
import axios from 'axios';
import { logoutUser } from '@/utils/auth';

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (credentials: any) => {
    try {
      setLoading(true);
      setError(null);
      const res = await loginApi(credentials);
      Cookies.set('token', res.data.token, { expires: 7 });
      window.dispatchEvent(new Event('auth-status-changed'));
      router.push('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Login failed.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const res = await signupApi(data);
      Cookies.set('token', res.data.token, { expires: 7 });
      window.dispatchEvent(new Event('auth-status-changed'));
      router.push('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessages = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(', ')
          : err.response.data.message || 'Signup failed.';
        setError(errorMessages);
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Signup failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    window.dispatchEvent(new Event('auth-status-changed'));
    router.push('/auth/login');
  };

  const getToken = () => Cookies.get('token');
  const getIsAuthenticated = () => !!Cookies.get('token');

  return { loading, error, login, signup, logout, getToken, getIsAuthenticated };
};