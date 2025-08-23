import api from './client';

export const getProfileApi = () => {
  return api.get('/users/profile');
};

export const updateProfileApi = (data: any) => {
  return api.put('/users/profile', data);
};