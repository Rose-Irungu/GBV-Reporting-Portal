import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getAssignments = async () => {
  const res = await api.get(API_ENDPOINTS.ASSIGNMENTS);
  return res.data;
}

export const assignReport = async (report_id, proffesional_id) => {
  const res = await api.post(`${API_ENDPOINTS.ASSIGN_REPORT}${report_id}/${proffesional_id}/`, );
  return res.data;
}