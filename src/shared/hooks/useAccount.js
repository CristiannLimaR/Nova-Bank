import { useState } from "react";
import { toast } from "sonner";
import { getMyAccount as getMyAccountRequest, searchAccount as searchAccountRequest, getAllAccounts as getAllAccountsRequest, verifyAccount as verifyAccountRequest } from "../../services/api";

import useAccountStore from "../stores/accountStore.js";

const useAccount = () => {
  const [loading, setLoading] = useState(false);
  const { setAccount } = useAccountStore.getState();

  const getMyAccount = async () => {
    setLoading(false);
    const response = await getMyAccountRequest();

    if (response.error) {
      toast.error("Error al obtener cuenta", {
        description:
          response.error?.response?.data ||
          "Ocurrio un error al obtener la cuenta",
        duration: 2000,
      });
      setLoading(false);
    }

    const { account } = response.data;
    console.log(account)
    setAccount(account)

    setLoading(false)

    return {success: true}
  };


  const searchAccount = async (accountNo) => {
    setLoading(true);
    const response = await searchAccountRequest(accountNo);

    if (response.error) {
      toast.error("Error al obtener cuenta", {
        description:
          response.error?.response?.data ||
          "Ocurrio un error al obtener la cuenta",
        duration: 2000,
      });
      setLoading(false);
      return { error: true };
    }

    const { account } = response.data;

    setLoading(false)

    return account
  };
  const fetchAllAccounts = async () => {
    setLoading(true);
    const response = await getAllAccountsRequest();
    setLoading(false);

    if (response.error) {
      toast.error("Error al obtener cuentas.");
      return { error: true };
    }

    return { accounts: response.data.accounts };
  };

  const changeAccountVerification = async (id, verify) => {
    const response = await verifyAccountRequest(id, verify);
    if (response.error) {
      toast.error("Error actualizando verificación.");
      return { error: true };
    }

    toast.success("Verificación actualizada.");
    return { success: true };
  };

  return {
    getMyAccount,
    searchAccount,
    fetchAllAccounts,
    changeAccountVerification,
    loading,
  };
};

export default useAccount;
