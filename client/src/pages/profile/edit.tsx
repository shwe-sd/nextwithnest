// src/pages/profile/edit.tsx
import { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const ProfileEditPage = () => {
  const router = useRouter();
  const { profile, loading, error, updateProfile } = useProfile();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Await the updateProfile call to get the result
    const success = await updateProfile({ firstName, lastName });
    
    // Only redirect if the update was successful
    if (success) {
      router.push('/profile');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading profile...</div>;
  if (!profile) return <div className="text-center mt-8">Profile not found.</div>;

  return (
    <>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Profile</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <Button type="submit">Save Changes</Button>
            <Button type="button" onClick={() => router.push('/profile')}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileEditPage;