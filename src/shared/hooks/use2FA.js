import { useState } from "react";
import { start2FA as start2FARequest, verify2FA as verify2FARequest } from "../../services/api";
import { toast } from "sonner";

export const use2FA = () => {
  const [isLoading, setIsLoading] = useState(false);

  const start2FA = async () => {
    setIsLoading(true);
    try {
      const response = await start2FARequest();
      if (response.error) {
        toast.error("Error al iniciar 2FA", {
          description: response.error?.response?.data || "Ocurrió un error al iniciar 2FA",
          duration: 2000,
        });
        return null;
      }
      return response.data;
    } catch (error) {
      toast.error("Error al iniciar 2FA", {
        description: "Ocurrió un error al iniciar 2FA",
        duration: 2000,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const verify2FA = async (data) => {
    console.log(data)
    setIsLoading(true);
    try {
      const response = await verify2FARequest(data);
      
      if (response.error) {
        toast.error("Error al verificar 2FA", {
          description: response.error?.response?.data || "Ocurrió un error al verificar 2FA",
          duration: 2000,
        });
        return null;
      }
      toast.success("2FA verificado correctamente", {
        duration: 2000,
      });
      return response.data;
    } catch (error) {
      toast.error("Error al verificar 2FA", {
        description: "Ocurrió un error al verificar 2FA",
        duration: 2000,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    start2FA,
    verify2FA,
    isLoading,
  };
};