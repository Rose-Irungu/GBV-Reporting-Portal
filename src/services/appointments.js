import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getAppointments = async () => {
  const res = await api.get(API_ENDPOINTS.APPOINTMENTS);
  return res.data;
}

export const addAppointment = async (appointment) => {
    const res = await api.post(API_ENDPOINTS.APPOINTMENTS, appointment);
    return res.data;
}

export const updateAppointment = async (appointment, ap_id) => {
    const res = await api.patch(`${API_ENDPOINTS.APPOINTMENTS}${ap_id}/`, appointment);
    return res.data;
}