import api from './client';

export const loginApi = (data: any) => {
  return api.post('/auth/login', data);
};

export const signupApi = (data: any) => {
  return api.post('/auth/signup', data);
};