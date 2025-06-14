import { useState, useEffect } from "react";
import axios from "axios";

const useIncomeExpense = (accountId) => {
  const [data, setData] = useState({
    income: 0,
    incomeTrend: "up",
    incomePercentage: 0,
    expense: 0,
    expenseTrend: "down",
    expensePercentage: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!accountId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/bankSystem/v1/transaction/chart/${accountId}`
        );

        const { summary } = res.data;

        setData({
          income: summary.income.amount,
          incomeTrend: summary.income.trend,
          incomePercentage: summary.income.percentage,
          expense: summary.expense.amount,
          expenseTrend: summary.expense.trend,
          expensePercentage: summary.expense.percentage,
          loading: false,
          error: null,
        });
      } catch (error) {
        setData((prev) => ({ ...prev, loading: false, error: error.message }));
      }
    };

    fetchData();
  }, [accountId]);

  return data;
};

export default useIncomeExpense;
