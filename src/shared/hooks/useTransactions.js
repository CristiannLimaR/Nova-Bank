import { useEffect, useState } from "react";
import { getTransactionsByAccountId as getTransactionsByAccountIdRequest, getChartData as getChartDataRequest, getCredit as getCreditRequest } from "../../services/api";
import useAuthStore from "../stores/authStore";
import { toast } from "sonner";
import useAccountStore from "../stores/accountStore";
const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useAuthStore((state) => state.getUser());
  const account = useAccountStore((state) => state.account);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Esperar hasta que user y su cuenta estén disponibles
        if (!user || !account || account.verified === false) {
          return; // No dispares aún la carga
        }

        const response = await getTransactionsByAccountIdRequest(account.accountNo);
        console.log(response.data.transactions);
        setTransactions(response.data.transactions || []);
      } catch (err) {
        console.error("Error al cargar transacciones:", err);
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [account._id]);

  const getChartData = async () => {
    const response = await getChartDataRequest(account._id);
    if (response.error) {
      toast.error("Error al obtener los datos del gráfico");
      return;
    }

    return response.data;
  };

  const getCredit = async () => {
    const response = await getCreditRequest();
    return response.data;
  };
  return { transactions, loading, error, getChartData, getCredit };
};

export default useTransactions;
