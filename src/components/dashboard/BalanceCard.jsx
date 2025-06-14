import React from "react";
import { Calendar, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useBalance from "../../shared/hooks/useBalance";
import BalanceChart from "./BalanceChart";
import useAccountStore from "../../shared/stores/accountStore";
import useIncomeExpense from "../../shared/hooks/useIncomeExpense"; // importa el hook

const BalanceCard = ({ className }) => {
  const navigate = useNavigate();
  const { convertedBalance, loading } = useBalance("USD");
  const account = useAccountStore((state) => state.account);
  const accountId = account?._id;

  // Usamos el hook para obtener ingresos y gastos
  const {
    income,
    incomeTrend,
    incomePercentage,
    expense,
    expenseTrend,
    expensePercentage,
    loading: loadingIncomeExpense,
    error: errorIncomeExpense,
  } = useIncomeExpense(accountId);

  // Función para elegir color y símbolo según tendencia
  const trendColor = (trend) => (trend === "up" ? "green" : "red");
  const trendSign = (trend) => (trend === "up" ? "+" : "-");

  return (
    <div className={`rounded-lg bg-gray-900 p-5 ${className || ""}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Balance</h2>
        <button className="flex items-center text-xs text-gray-400 hover:text-white">
          <Calendar className="mr-1 h-4 w-4" />
          <span>History</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Balance</p>
            <h3 className="text-3xl font-bold text-white">
              {loading ? "Cargando..." : `$ ${convertedBalance?.balanceConvertido || "0.00"}`}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex space-x-3">
              <button
                onClick={() => navigate("/new-transaction")}
                className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors group"
              >
                <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors group">
                <ArrowDownLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <div className="flex space-x-3 mt-2">
              <div className="w-12 text-center">
                <span className="text-xs text-gray-600 font-medium">Send</span>
              </div>
              <div className="w-12 text-center">
                <span className="text-xs text-gray-600 font-medium">Receive</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Income y Expense desde API */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {/* Income */}
        <div className="rounded-lg bg-gray-800 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 19V5M12 5L5 12M12 5L19 12"
                  stroke="#3DD9C9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-1 text-sm text-gray-400">Income</span>
            </div>
            {loadingIncomeExpense ? (
              <span className="rounded-full bg-green-900/20 px-2 py-1 text-xs text-green-500">...</span>
            ) : (
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  trendColor(incomeTrend) === "green"
                    ? "bg-green-900/20 text-green-500"
                    : "bg-red-900/20 text-red-500"
                }`}
              >
                {trendSign(incomeTrend)}
                {incomePercentage}%
              </span>
            )}
          </div>
          <p className="text-lg font-semibold text-white">
            {loadingIncomeExpense ? "Cargando..." : `$ ${income.toLocaleString()}`}
          </p>
          {errorIncomeExpense && (
            <p className="text-xs text-red-500 mt-1">Error: {errorIncomeExpense}</p>
          )}
        </div>

        {/* Expense */}
        <div className="rounded-lg bg-gray-800 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19M12 19L5 12M12 19L19 12"
                  stroke="#FF7E5F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-1 text-sm text-gray-400">Expense</span>
            </div>
            {loadingIncomeExpense ? (
              <span className="rounded-full bg-red-900/20 px-2 py-1 text-xs text-red-500">...</span>
            ) : (
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  trendColor(expenseTrend) === "green"
                    ? "bg-green-900/20 text-green-500"
                    : "bg-red-900/20 text-red-500"
                }`}
              >
                {trendSign(expenseTrend)}
                {expensePercentage}%
              </span>
            )}
          </div>
          <p className="text-lg font-semibold text-white">
            {loadingIncomeExpense ? "Cargando..." : `$ ${expense.toLocaleString()}`}
          </p>
          {errorIncomeExpense && (
            <p className="text-xs text-red-500 mt-1">Error: {errorIncomeExpense}</p>
          )}
        </div>
      </div>

      {/* 📊 Aquí usamos el accountId dinámicamente */}
      {accountId && <BalanceChart accountId={accountId} />}
    </div>
  );
};

export default BalanceCard;
