import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services/api.js"; // Solo login aquí
import { toast } from "sonner";
import useAuthStore from "../stores/authStore";
import useAccount from "./useAccount.js";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Acciones de auth store
  const loginStore = useAuthStore((state) => state.login);
  const logoutStore = useAuthStore((state) => state.logout);

  // Hook de cuenta
  const { fetchMyAccount } = useAccount();

  const handleLogin = async (data) => {
    setLoading(true);

    try {
      const response = await loginRequest(data);

      if (response.error) {
        throw response.error;
      }

      const { token, user } = response.data;

      // Guardar usuario y token en el estado global
      loginStore(user, token);

      // Obtener los datos de la cuenta
      const accountResponse = await fetchMyAccount();

      if (accountResponse?.error) {
        toast.warning("Inicio de sesión exitoso, pero no se pudo cargar la cuenta.");
      }

      toast.success("¡Bienvenido de nuevo!", {
        duration: 3000,
      });

      // Redirección según rol
      if (user.role === "ADMIN_ROLE") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      return { success: true };

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error de inicio de sesión", {
        description:
          error?.response?.data?.msg ||
          "Ocurrió un error durante el inicio de sesión.",
        duration: 2000,
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
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
