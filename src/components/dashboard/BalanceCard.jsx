import React, { useState, useEffect, Suspense } from "react";
import { Calendar, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BalanceChart from "./BalanceChart";
import useAccountStore from "../../shared/stores/accountStore";
import useTransactions from "../../shared/hooks/useTransactions";

const BalanceCard = ({ className }) => {
  const navigate = useNavigate();
  const account = useAccountStore((state) => state.account);
  const { getChartData } = useTransactions();
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await getChartData();
        setChartData(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChartData();
  }, []);

  const balanceData = {
    totalBalance: account.balance || 0,
    income: chartData?.summary?.income || { amount: 0, percentage: 0 },
    expense: chartData?.summary?.expense || { amount: 0, percentage: 0 },
  };

  return (
    <div className={`rounded-lg bg-gray-900 p-5 ${className || ''}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Balance</h2>
        <button className="flex items-center text-xs text-gray-400 hover:text-white">
          <Calendar className="mr-1 h-4 w-4" />
          <span>History</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="min-w-[200px]">
            <p className="text-gray-400 text-sm">Total Balance</p>
            <div className="h-[40px] flex items-center">
              {isLoading ? (
                <div className="h-10 w-48 animate-pulse bg-gray-800 rounded"></div>
              ) : (
                <h3 className="text-3xl font-bold text-white" style={{ fontDisplay: 'swap' }}>
                  Q {balanceData.totalBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </h3>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex space-x-3">
              <button 
                onClick={() => navigate('/new-transaction')}
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

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-800 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-[16px]"
              >
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
            <span className="rounded-full bg-green-900/20 px-2 py-1 text-xs text-green-500">
              +{balanceData.income.percentage}%
            </span>
          </div>
          <p className="text-lg font-semibold text-white">Q {balanceData.income.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>

        <div className="rounded-lg bg-gray-800 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-[16px]"
              >
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
            <span className="rounded-full bg-red-900/20 px-2 py-1 text-xs text-red-500">
              -{balanceData.expense.percentage}%
            </span>
          </div>
          <p className="text-lg font-semibold text-white">Q {balanceData.expense.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>
      </div>

      {!isLoading && chartData && <BalanceChart data={chartData} />}
    </div>
  );
};

export default BalanceCard;