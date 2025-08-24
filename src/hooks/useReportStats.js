import { useEffect, useState } from "react";
import { getTotalReports } from "../services/adminDashboardService";

const useReports = (status = null) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getTotalReports(status);
      setReports(data);
      setError(null);
    } catch (error) {
      // console.error("Error fetching reports:", error);
      if (error.response) {
        // console.error("Server responded with:", error.response.data);
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
  }, [status]); 

  const refreshReports = async () => {
    await fetchReports();
  };

  return { 
    reports, 
    loading, 
    error, 
    refreshReports,
    totalReports: reports?.length || 0,
  };
};

export default useReports;
