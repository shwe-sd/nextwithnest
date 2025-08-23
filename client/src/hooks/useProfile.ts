// src/hooks/useProfile.ts

import { useState, useEffect } from 'react';
import { getProfileApi, updateProfileApi } from '@/api/user';
import { Profile } from '@/types/user';
import axios from 'axios';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      console.log('Fetching profile...'); // 👈 Logging start of API call
      const res = await getProfileApi();
      console.log('Profile API success:', res.data); // 👈 Logging successful response
      setProfile(res.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Specific Axios error
        const errorMessage = err.response.data.message || 'Failed to fetch profile.';
        setError(errorMessage);
        console.error('Profile API failed with response:', err.response.data); // 👈 Logging API error
        console.error('Status code:', err.response.status); // 👈 Logging status code
      } else {
        // Generic error
        setError('An unexpected error occurred.');
        console.error('An unexpected error occurred:', err); // 👈 Logging a non-Axios error
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const res = await updateProfileApi(data);
      setProfile(res.data.data);
      return true; // Return true for success
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessages = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(', ')
          : err.response.data.message || 'Failed to update profile.';
        setError(errorMessages);
      } else {
        setError('An unexpected error occurred.');
      }
      return false; // Return false for failure
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, error, updateProfile };
};