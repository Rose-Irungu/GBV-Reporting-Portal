// src/hooks/useAppointments.js
import { useEffect, useState } from "react";
import { getAppointments } from "../services/appointments";

export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getAppointment = async (id) => {
    try {
      setLoading(true);
      const data = await getAppointment(id);
      setAppointment(data);
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

    getAppointment,
    appointments,
    loading,
    error,
    appointment,
  };
}
