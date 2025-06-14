import { useState, useEffect } from "react";
import axios from "axios";

const useMonthlyBalance = (accountId) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accountId) return;

    const fetchSummary = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // ✅ Usa tu token si lo guardas así
        const response = await axios.get(`/transactions/summary-by-month/${accountId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching monthly summary", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [accountId]);

  return { summary, loading };
};

export default useMonthlyBalance;
