import apiClient from "./api";

export const getMonthlySummary = (accountId) =>
  apiClient.get(`/transaction/chart/${accountId}`);

export const getTransactionsByAccountId = async (accountId) => {
  const response = await apiClient.get(`/transaction/account/${accountId}`);
  return response.data.transactions;
};