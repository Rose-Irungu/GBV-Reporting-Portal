import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getTotalReports = async () => {
  const res = await api.get(API_ENDPOINTS.GET_TOTAL_CASES);
  return res.data;
};