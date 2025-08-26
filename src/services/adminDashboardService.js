import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getTotalReports = async () => {
  const res = await api.get(API_ENDPOINTS.GET_TOTAL_CASES);
  return res.data;
};

export const getDashboardStats = async () => {
  const res = await api.get(API_ENDPOINTS.DASHBOARD_STATS);
  return res.data;
}

export const getAppointments = async () => {
  const res = await api.get(API_ENDPOINTS.APPOINTMENTS);
  return res.data;
};

export const getAllReports = async () => {
  const res = await api.get(API_ENDPOINTS.ALL_REPORTS);
  return res.data;
}

export const getReport = async (ref_no) => {
  const res = await api.get(`${API_ENDPOINTS.ALL_REPORTS}${ref_no}/`);
  return res.data;
}

export const getProfessionals = async () => {
  const res = await api.get(API_ENDPOINTS.PROFESSIONALS);
  return res.data;
}