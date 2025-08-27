import { useEffect, useState } from "react";
import { getDashboardStats, getAppointments, getAllReports, getReport as gR, getProfessionals, } from "../services/adminDashboardService";

const useReports = () => {

  const [dashboardData, setDashboardData] = useState(null);
  const [allReports, setAllReports] = useState([]);
  const [proffessionals, setProfessionals] = useState([]);
  const [appointments, setAppointments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [data, appointments, allReports, professionals] = await Promise.all([
        getDashboardStats(),
        getAppointments(),
        getAllReports(),
        getProfessionals(),
      ]);
      setDashboardData(data);
      setAppointments(appointments);
      setAllReports(allReports)
      setProfessionals(professionals);
      setError(null);
    } catch (error) {
      console.error("Error fetching reports:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        setError("Server error occurred. Please try again.");
      } else {
        setError("Something went wrong. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const refreshReports = async () => {
    await fetchReports();
  };

  const getReport = async (ref_no) => {
    try {
      setLoading(true);
      const report = await gR(ref_no);
      return report || null;
    } catch (error) {
      console.error("Error fetching report:", error);
      setError("Something went wrong while fetching the report.");
      return null;
    } finally {
      setLoading(false);
    }
  }
   const getAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data || []);
      return data;
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Something went wrong while fetching appointments.");
      return [];
    } finally {
      setLoading(false);
    }
  };
    const getAppointment = async (id) => {
    try {
      setLoading(true);
      const data = await getAppointment(id);
      setAppointment(data || null);
      return data;
    } catch (err) {
      console.error("Error fetching appointment:", err);
      setError("Something went wrong while fetching appointment.");
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    dashboardData,
    loading,
    error,
    setAppointments,
    refreshReports,
    getReport,
    getAppointments,
    getAppointment,
    proffessionals: proffessionals || [],
    allReports: allReports || [],
    appointments: appointments || [],
    totalReports: dashboardData?.total_reports || 0,
    pendingReports: dashboardData?.pending_reports || 0,
    underReviewReports: dashboardData?.under_review_reports || 0,
    resolvedReports: dashboardData?.resolved_reports || 0,
    assignedReports: dashboardData?.assigned_reports || 0,
    urgentCases: dashboardData?.urgent_cases || [],

    reports: dashboardData?.urgent_cases || [],
  };
};

export default useReports;