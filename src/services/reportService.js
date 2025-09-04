import api from './api';
import { API_ENDPOINTS } from "../utils/constants";

export const submitReport = async (formData) => {
  const response = await api.post(API_ENDPOINTS.SUBMIT_REPORT, formData);
  return response.data;
};

export const fetchReport = async (ref_no) => {
    const response = await api.get(`${API_ENDPOINTS.ALL_REPORTS}${ref_no}/`);
    return response.data;
};

export const deleteReport = async (ref_no) => {
    const response = await api.delete(`${API_ENDPOINTS.ALL_REPORTS}${ref_no}/`);
    return response.data;
};

export const resolveReport = async (ref_no, ) => {
  const response = await api.patch(`${API_ENDPOINTS.ALL_REPORTS}${ref_no}/`, { status: 'resolved'});
    return response.data;
}