import { useEffect, useState } from "react";
import { getTransactionsByAccountId } from "../../services/transactionService";
import useAuthStore from "../stores/authStore";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useAuthStore((state) => state.getUser());

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Esperar hasta que user y su cuenta estén disponibles
        if (!user || !user.account || !user.account._id) {
          return; // No dispares aún la carga
        }

        const response = await getTransactionsByAccountId(user.account._id);
        setTransactions(response.data.transactions || []);
      } catch (err) {
        console.error("Error al cargar transacciones:", err);
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user?.account?._id]); // Se vuelve a ejecutar solo si cambia la cuenta

  return { transactions, loading, error };
};

export default useTransactions;
