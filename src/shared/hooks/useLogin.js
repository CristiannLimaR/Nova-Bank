import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAccount, login as loginRequest } from "../../services/api.js";
import { toast } from "sonner";
import useAuthStore from "../stores/authStore";
import useAccount from "./useAccount.js";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);
  const logoutStore = useAuthStore((state) => state.logout);
  const { getMyAccount } = useAccount();
  const handleLogin = async (data) => {
    setLoading(true);

    const response = await loginRequest(data);

    if (response.error) {
      toast.error("Error de inicio de sesión", {
        description:
          response.error?.response?.data ||
          "Ocurrió un error durante el inicio de sesión.",
        duration: 2000,
      });
      setLoading(false);
      return { success: false, error: response.error?.response?.data };
    }

    const { token, user } = response.data;

    loginStore(user, token);
    console.log(user);
    if(user.role === "USER_ROLE") {
      getMyAccount();
    }
    setLoading(false);
    toast.success("¡Bienvenido de nuevo!", {
      duration: 3000,
    });

    if (user.role === "ADMIN_ROLE") {
      navigate("/admin");
    } else {
      if (user.twoFactorEnabled) {
        navigate("/");
      } else {
        navigate("/2fa");
      }
    }

    return { success: true };
  };

  const handleLogout = () => {
    logoutStore();
    toast.success("Has cerrado sesión correctamente", {
      duration: 3000,
    });
    navigate("/login");
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    loading,
  };
};

export default useLogin;
