import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAccount as getMyAccountRequest } from "../../services/api";
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
    setAccount(account)

    setLoading(false)

    return {success: true}
  };

  return {
    getMyAccount,
    loading
  }

};

export default useAccount