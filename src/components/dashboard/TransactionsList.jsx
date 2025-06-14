import React from "react";
import useTransactions from "../../shared/hooks/useTransactions.js";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CreditCardIcon,
  ArrowTrendingUpIcon, // ✅ ícono correcto
} from "@heroicons/react/24/outline";

const getIconByType = (type) => {
  const baseStyle = "flex h-10 w-10 items-center justify-center rounded-full bg-gray-800";

  switch (type) {
    case "DEPOSIT":
      return (
        <div className={baseStyle}>
          <ArrowDownIcon className="text-green-400 h-5 w-5" />
        </div>
      );
    case "TRANSFER":
      return (
        <div className={baseStyle}>
          <ArrowTrendingUpIcon className="text-yellow-400 h-5 w-5" />
        </div>
      );
    case "PURCHASE":
      return (
        <div className={baseStyle}>
          <CreditCardIcon className="text-purple-400 h-5 w-5" />
        </div>
      );
    default:
      return (
        <div className={baseStyle}>
          <ArrowUpIcon className="text-red-400 h-5 w-5" />
        </div>
      );
  }
};

const TransactionsList = () => {
  const { transactions, loading, error } = useTransactions();

  if (loading) return <p className="text-white">Cargando transacciones...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;

  return (
    <div className="rounded-lg bg-gray-900 p-5">
      <h2 className="mb-4 text-lg font-semibold text-white">Transacciones</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
        {transactions.map((transaction) => (
          <div key={transaction._id} className="flex items-center justify-between">
            <div className="flex items-center">
              {getIconByType(transaction.type)}
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {transaction.description || "Sin descripción"}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p
              className={`text-sm font-medium ${
                transaction.type === "DEPOSIT" ? "text-green-400" : "text-red-400"
              }`}
            >
              {transaction.type === "DEPOSIT" ? "+" : "-"} $
              {Math.abs(transaction.amount).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full rounded-md bg-gray-800 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors">
        Ver todas las transacciones
      </button>
    </div>
  );
};

export default TransactionsList;
