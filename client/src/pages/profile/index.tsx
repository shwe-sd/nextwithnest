import { useProfile } from '@/hooks/useProfile';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const ProfilePage = () => {
  const { profile, loading, error } = useProfile();

  if (loading) return <div className="text-center mt-8">Loading profile...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!profile) return <div className="text-center mt-8">Profile not found.</div>;

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-gray-500">First Name:</p>
            <p className="text-lg font-medium">{profile.firstName}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-500">Last Name:</p>
            <p className="text-lg font-medium">{profile.lastName}</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link href="/profile/edit">
            <Button>Edit Profile</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;