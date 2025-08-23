import api from './client';

export const getConversionsApi = (params: any) => {
  if (params.start_date && params.end_date) {
    return api.get('/conversions/range', { params });
  }
  return api.get('/conversions/all');
};