// client.ts
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { logoutUser } from '@/utils/auth';

// Detect runtime
const isBrowser = typeof window !== 'undefined';

// Choose baseURL per runtime
// - Browser: use public URL (CORS applies)
// - SSR (Node): use a server-reachable URL (never localhost unless Next + Nest are the same machine/container)
const baseURL = isBrowser
  ? ('http://127.0.0.1:5002/api') // dev default in browser
  : ('http://server:5002/api');       // dev default for SSR

const api = axios.create({ baseURL });

// ---- Helper for SSR ----
// Pass req.headers.cookie into this when calling in getServerSideProps
export const withSSRHeaders = (reqCookies: string | undefined): AxiosRequestConfig => {
  if (!reqCookies) return {};
  const tokenMatch = reqCookies.match(/(?:^|;\s*)token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : "";
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
};

// ---- Interceptors ----
// Request: attach token (only in browser; js-cookie is not available in Node/SSR)
api.interceptors.request.use((config) => {
  if (isBrowser) {
    const token = Cookies.get('token');
    console.log('check token for api: ' + token?.toString());
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response: auto-logout on 401/403 (works in both, logoutUser is browser-side)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;
      if ((status === 401 || status === 403) && isBrowser) {
        console.log('Token expired/invalid → logging out');
        logoutUser();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
