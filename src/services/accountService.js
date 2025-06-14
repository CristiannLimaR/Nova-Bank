import apiClient from "./api";

export const getMyAccount = () => apiClient.get("/account/my-account");

export const getAllAccounts = () => apiClient.get("/account");

export const getUnverifiedAccounts = () => apiClient.get("/account/unverified");

export const searchAccount = (accountNo) =>
  apiClient.get(`/account/search/${accountNo}`);

export const getAccountById = (id) => apiClient.get(`/account/${id}`);

export const verifyAccount = (id, verify) =>
  apiClient.patch(`/account/${id}`, { verify });
