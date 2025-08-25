import axios from 'axios';
import Cookies from 'js-cookie';
import { logoutUser } from '@/utils/auth';

const api = axios.create({
  baseURL: 'http://quiz_server:5002/api',
});

// Request Interceptor: Attach token to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle invalid/expired tokens
api.interceptors.response.use(
  (response) => response, // If response is successful, return it
  (error) => {
    // Check if the error is an Axios error and the status code is 401 or 403
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        console.log('Token expired or invalid. Logging out...');
        logoutUser(); // Call the utility to remove the token
      }
    }
    return Promise.reject(error); // Reject the promise to let the component handle the error
  }
);

export default api;