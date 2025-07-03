import { useState, useEffect } from "react";
import useAccountStore from "../stores/accountStore";
import {
  getTransactions as getTransactionsRequest,
  createTransaction as createTransactionService,
  getAllTransactions as getAllTransactionsRequest,
  cancelTransaction as cancelTransactionService,
  createDeposit as createDepositService,
  updateTransaction as updateTransactionService,
  getChartData as getChartDataRequest,
  getCredit as getCreditRequest,
} from "../../services/api";

const useTransactions =  () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const accountId = useAccountStore.getState().getAccountNo(); // cambiar por id despues 

  const fetchTransactions = async () => {
    if (!accountId) return;

    setLoading(true);
    const response = await getTransactionsRequest(accountId);

    if (response.error) {
      console.error("Error al obtener transacciones:", response.error);
      setLoading(false);
      return;
    }

    setTransactions(response.data.transactions || []);
    setLoading(false);
  };

  const revertTransaction = async (transactionId) => {
    const response = await cancelTransactionService(transactionId);
    if (response.error) {
      console.error("Error al revertir transacción:", response.e?.message);
      return response;
    }

    setTransactions((prev) =>
      prev.map((tx) =>
        tx._id === transactionId ? { ...tx, status: "Revertido" } : tx
      )
    );

    return response;
  };

  const updateTransaction = async (transactionId, data) => {
    const response = await updateTransactionService(transactionId, data);
    console.log("Response de updateTransaction:", response); // para depuración
    if (response.error) {
      console.error("Error al actualizar transacción:", response.e?.message);
      return response;
    }
    setTransactions((prev) =>
        prev.map((tx) => 
            tx._id === transactionId ? { ...tx, ...data } : tx
        )
    );
    return response;
 };

  const createTransaction = async (data) => {
    const response = await createTransactionService(data);
    console.log("Response de createTransaction:", response); // para depuración
    if (response.error) {
      console.error(
        "Error al crear transacción:",
        response.error,
        response.e?.message
      );
    }
    return response;
  };

  const createDeposit = async (data) => {
    const response = await createDepositService(data);
    console.log("Response de createDeposit:", response); // para depuración
    if (response.error) {
      console.error("Error al crear depósito:", response.error);
      return response;
    }
    setTransactions((prev) => [response.data.transaction, ...prev]);
    return response;
  };
  
  const getAllTransactions = async () => {
    setLoading(true);
    const response = await getAllTransactionsRequest();
    if (response.error) {   
        console.error("Error al obtener todas las transacciones:", response.error);
        setLoading(false);
        return;
    }
    setTransactions(response.data.transactions || []);
    setLoading(false);
    return response;
};
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


  useEffect(() => {
    fetchTransactions();
  }, [accountId]);

  return {
    transactions,
    loading,
    refetch: fetchTransactions,
    createTransaction,
    getAllTransactions,
    revertTransaction,
    createDeposit,
    updateTransaction,
    getChartData,
    getCredit,
  };
};

export default useTransactions;
