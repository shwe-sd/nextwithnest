// src/components/shared/Layout.test.tsx
import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import Layout from './Layout';
import Cookies from 'js-cookie';
import '@testing-library/jest-dom';

// Mock the useRouter hook
const mockUseRouter = {
  pathname: '/',
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  push: jest.fn(),
};
jest.mock('next/router', () => ({
  useRouter: () => mockUseRouter,
}));

// Mock the useAuth hook to control its return values
jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));
const useAuth = require('@/hooks/useAuth').useAuth;

describe('Layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Cookies.remove('token');
  });

  it('should render login and signup links when not authenticated', async () => {
    useAuth.mockReturnValue({
      loading: false,
      getIsAuthenticated: () => false,
      logout: jest.fn(),
    });

    render(<Layout><div>Test Content</div></Layout>);

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Signup')).toBeInTheDocument();
    });

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should render authenticated links when a token exists', async () => {
    useAuth.mockReturnValue({
      loading: false,
      getIsAuthenticated: () => true,
      logout: jest.fn(),
    });

    render(<Layout><div>Test Content</div></Layout>);

    await waitFor(() => {
      expect(screen.getByText('Conversions Report')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Sign out')).toBeInTheDocument();
    });

    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
});