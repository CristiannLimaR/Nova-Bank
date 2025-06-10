import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAccount as getMyAccountRequest, searchAccount as searchAccountRequest } from "../../services/api";
import { toast } from "sonner";
import useAccountStore from "../stores/AccountStore";

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

  return {
    getMyAccount,
    searchAccount,
    loading
  }

};

export default useAccount