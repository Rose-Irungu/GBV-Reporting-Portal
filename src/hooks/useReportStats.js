import { useEffect, useState } from "react";
import { getDashboardStats, getAppointments, getAllReports, getReport as gR } from "../services/adminDashboardService";

const useReports = () => {
  // Initialize as null since you're expecting an object
  const [dashboardData, setDashboardData] = useState(null);
  const [allReports, setAllReports] = useState([]);
  const [appointments, setAppointments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [data, appointments, allReports] = await Promise.all([
        getDashboardStats(),
        getAppointments(),
        getAllReports(),
      ]);
      setDashboardData(data);
      setAppointments(appointments);
      setAllReports(allReports)
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

  return {
    dashboardData,
    loading,
    error,
    setAppointments,
    refreshReports,
    getReport,
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