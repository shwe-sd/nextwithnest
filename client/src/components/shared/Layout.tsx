// src/components/shared/Layout.tsx

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title = 'Next.js App' }: LayoutProps) => {
  const { loading, logout, getIsAuthenticated } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticated());

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(getIsAuthenticated());
    };

    window.addEventListener('auth-status-changed', handleAuthChange);

    return () => {
      window.removeEventListener('auth-status-changed', handleAuthChange);
    };
  }, [getIsAuthenticated]);

  const isProductFeedPage = router.pathname === '/';
  const isProfilePage = router.pathname === '/profile' || router.pathname.startsWith('/profile/');
  const isConversionsPage = router.pathname === '/conversions';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = isAuthenticated ? (
    <>
      {isProductFeedPage && (
        <>
          <Link href="/conversions" onClick={toggleMenu}>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Conversions Report
            </span>
          </Link>
          <Link href="/profile" onClick={toggleMenu}>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Profile
            </span>
          </Link>
        </>
      )}
      {isProfilePage && (
        <>
          <Link href="/" onClick={toggleMenu}>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Product Feed
            </span>
          </Link>
          <Link href="/conversions" onClick={toggleMenu}>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Conversions Report
            </span>
          </Link>
        </>
      )}
      {isConversionsPage && (
        <>
          <Link href="/" onClick={toggleMenu}>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Product Feed
            </span>
          </Link>
          <Link href="/profile" onClick={toggleMenu}>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Profile
            </span>
          </Link>
        </>
      )}
      <Button onClick={() => { logout(); toggleMenu(); }}>Sign out</Button>
    </>
  ) : (
    <>
      <Link href="/auth/login" onClick={toggleMenu}>
        <span className="text-blue-600 hover:underline cursor-pointer">
          Login
        </span>
      </Link>
      <Link href="/auth/signup" onClick={toggleMenu}>
        <span className="text-blue-600 hover:underline cursor-pointer">
          Signup
        </span>
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="bg-white shadow p-4 flex justify-between items-center relative">
        <Link href="/">
          <span className="text-2xl font-bold text-blue-600 cursor-pointer">
            My App
          </span>
        </Link>
        {/* Hamburger button for small screens */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-600 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <nav
          className={`
            absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col items-center space-y-4 md:static md:w-auto md:flex-row md:space-x-4 md:space-y-0 md:shadow-none
            ${isMenuOpen ? 'flex' : 'hidden md:flex'}
          `}
        >
          {/* Wait for loading to finish before rendering the nav links */}
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : (
            navLinks
          )}
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-200 p-4 text-center text-gray-600 mt-auto">
        &copy; 2024 My App. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;