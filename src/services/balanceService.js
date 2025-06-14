import apiClient from "./api";

export const getConvertedBalance = (accountNo, moneda = "USD") =>
  apiClient.get(`/balance/${accountNo}/${moneda}`);