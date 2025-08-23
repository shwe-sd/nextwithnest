import api from './client';

export const getProductsApi = (params: any) => {
  return api.get('/products', { params });
};