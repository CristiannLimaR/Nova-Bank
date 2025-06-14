import { useState, useEffect } from "react";
import { getConvertedBalance } from "../../services/balanceService";
import useAccountStore from "../stores/accountStore";
import { toast } from "sonner";

const useBalance = (moneda = "USD") => {
  const [convertedBalance, setConvertedBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const { account } = useAccountStore();

  const fetchConvertedBalance = async () => {
    if (!account?.accountNo) return;

    try {
      setLoading(true);
      const response = await getConvertedBalance(account.accountNo, moneda);

      if (response.error) {
        toast.error("Error al obtener balance convertido");
        return;
      }

      setConvertedBalance(response.data);
    } catch (error) {
      console.error("Error al obtener balance:", error);
      toast.error("Error al obtener balance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConvertedBalance();
  }, [account, moneda]);

  return {
    convertedBalance,
    loading,
    refresh: fetchConvertedBalance,
  };
};

export default useBalance;
