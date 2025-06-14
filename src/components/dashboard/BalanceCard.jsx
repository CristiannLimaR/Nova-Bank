import React from "react";
import { Calendar, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BalanceChart from "./BalanceChart";

const balanceData = {
  totalBalance: 2976.00,
  income: {
    amount: 56976.00,
    percentage: 10,
    trend: 'up'
  },
  expense: {
    amount: 54000.00,
    percentage: 5,
    trend: 'down'
  }
};

const BalanceCard = ({ className }) => {
  const navigate = useNavigate();

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
          <div>
            <p className="text-gray-400 text-sm">Total Balance</p>
            <h3 className="text-3xl font-bold text-white">$ {balanceData.totalBalance.toLocaleString()}</h3>
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
          <p className="text-lg font-semibold text-white">$ {balanceData.income.amount.toLocaleString()}</p>
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
          <p className="text-lg font-semibold text-white">$ {balanceData.expense.amount.toLocaleString()}</p>
        </div>
      </div>

      <BalanceChart />
    </div>
  );
};

export default BalanceCard;
