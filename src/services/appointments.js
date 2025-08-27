import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getAppointments = async () => {
  const res = await api.get(API_ENDPOINTS.GET_APPOINTMENTS);
  return res.data;
}

export const getAppointment = async (id) => {
  const res = await api.get(`${API_ENDPOINTS.GET_APPOINTMENTS}${id}/`);
  return res.data;
}