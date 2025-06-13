import { useState, useEffect } from "react";
import { getMyAccount, convertirBalancePorMoneda } from "../../services/api";

export const useBalance = (monedaDestino) => {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  const [balanceGTQ, setBalanceGTQ] = useState(null);
  const [error, setError] = useState(null);
  const [accountNo, setAccountNo] = useState(null);

  const fetchBalance = async () => {
    setLoading(true);
    try {
      const resCuenta = await getMyAccount();
      if (resCuenta.error) throw resCuenta.e;

      const cuenta = resCuenta.data.account;
      const numeroCuenta = cuenta?.accountNo;
      const userId = cuenta?.user;

      console.log("✅ Número de cuenta obtenido:", numeroCuenta);
      console.log("👤 ID del usuario asociado:", userId);
      console.log("💰 Balance en GTQ:", cuenta?.balance);

      setAccountNo(numeroCuenta);
      setBalanceGTQ(cuenta?.balance);

      if (monedaDestino) {
        const resBalance = await convertirBalancePorMoneda(numeroCuenta, monedaDestino);
        if (resBalance.error) throw resBalance.e;

        console.log("💱 Datos de conversión:", resBalance.data);
        setBalance(resBalance.data);
      }
    } catch (e) {
      console.error("❌ Error en useBalance:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [monedaDestino]);

  return {
    loading,
    error,
    balance,
    balanceGTQ,
    accountNo,
    refetch: fetchBalance,
  };
};
