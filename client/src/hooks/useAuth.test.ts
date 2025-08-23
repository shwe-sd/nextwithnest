import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuth } from './useAuth';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';

// Mock window.dispatchEvent
const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock API calls
jest.mock('@/api/auth', () => ({
  loginApi: jest.fn(),
  signupApi: jest.fn(),
}));

describe('useAuth', () => {
  beforeEach(() => {
    Cookies.remove('token');
    jest.clearAllMocks();
  });

  // ✅ Test 1: Initializes correctly
  it('should initialize with loading state false and no token', async () => {
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.getIsAuthenticated()).toBe(false);
  });

  // ✅ Test 2: Handles an existing token
  it('should return isAuthenticated as true if a token exists', async () => {
    Cookies.set('token', 'fake-token');
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.getIsAuthenticated()).toBe(true);
    expect(result.current.getToken()).toBe('fake-token');
  });

  // ✅ Test 3: Handles successful login
  it('should handle a successful login', async () => {
    const loginApi = require('@/api/auth').loginApi;
    loginApi.mockResolvedValue({ data: { token: 'new-token' } });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({});
    });

    expect(loginApi).toHaveBeenCalled();
    expect(Cookies.get('token')).toBe('new-token');
    expect(result.current.getIsAuthenticated()).toBe(true);
    expect(dispatchEventSpy).toHaveBeenCalledWith(new Event('auth-status-changed'));
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  // ✅ Test 4: Handles a failed login (Fixed for axios.isAxiosError)
  it('should handle a failed login', async () => {
    const loginApi = require('@/api/auth').loginApi;

    // ✅ Mock Axios error properly
    const axiosError: Partial<AxiosError> = {
        isAxiosError: true,
        response: {
            data: { message: 'Invalid credentials' },
            status: 400,
            statusText: 'Bad Request',
            headers: {}, // ✅ required
            config: {
            headers: {}, // ✅ required by InternalAxiosRequestConfig
            } as any, // ✅ casting to avoid extra strictness
        },
    };

    loginApi.mockRejectedValue(axiosError);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({});
    });

    expect(loginApi).toHaveBeenCalled();
    expect(result.current.error).toBe('Invalid credentials');
    expect(result.current.getIsAuthenticated()).toBe(false);
  });

  // ✅ Test 5: Handles logout
  it('should handle logout correctly', async () => {
    Cookies.set('token', 'existing-token');

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      result.current.logout();
    });

    expect(Cookies.get('token')).toBeUndefined();
    expect(result.current.getIsAuthenticated()).toBe(false);
    expect(dispatchEventSpy).toHaveBeenCalledWith(new Event('auth-status-changed'));
    expect(mockPush).toHaveBeenCalledWith('/auth/login');
  });
});
