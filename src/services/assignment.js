import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
export const getAssignments = async () => {
  const res = await api.get(API_ENDPOINTS.ASSIGNMENTS);
  return res.data;
}