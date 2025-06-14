import { useState } from "react";
import { toast } from "sonner";
import {
  getMyAccount,
  searchAccount,
  getAccountById,
  getAllAccounts,
  verifyAccount
} from "../../services/accountService.js";
import useAccountStore from "../stores/accountStore.js";

const useAccount = () => {
  const [loading, setLoading] = useState(false);
  const { setAccount } = useAccountStore.getState();

  const fetchMyAccount = async () => {
    setLoading(true);
    const response = await getMyAccount();
    setLoading(false);

    if (response.error) {
      toast.error("Error al obtener tu cuenta.");
      return { error: true };
    }

    const { account } = response.data;
    setAccount(account);
    return { account };
  };

  const fetchAllAccounts = async () => {
    setLoading(true);
    const response = await getAllAccounts();
    setLoading(false);

    if (response.error) {
      toast.error("Error al obtener cuentas.");
      return { error: true };
    }

    return { accounts: response.data.accounts };
  };

  const changeAccountVerification = async (id, verify) => {
    const response = await verifyAccount(id, verify);
    if (response.error) {
      toast.error("Error actualizando verificación.");
      return { error: true };
    }

    toast.success("Verificación actualizada.");
    return { success: true };
  };

  return {
    fetchMyAccount,
    fetchAllAccounts,
    changeAccountVerification,
    searchAccount,
    getAccountById,
    loading,
  };
};

export default useAccount;
