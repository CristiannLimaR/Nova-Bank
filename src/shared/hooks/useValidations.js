import { useState } from "react";
import { emailAlreadyExists, dpiAlreadyExists } from "@/services/api";
import { toast } from "sonner";

export const useValidations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validateExistUser = async ({ email, dpi }) => {
    setIsLoading(true);
    try {
      if (email) {
        const response = await emailAlreadyExists(email);
        if (response.error) {
          toast.error(response.e.response.data.msg);
          return { exists: false };
        }
        return { exists: response.data.exists };
      }
      if (dpi) {
        const response = await dpiAlreadyExists(dpi);
        if (response.error) {
          toast.error(response.e.response.data.msg);
          return { exists: false };
        }
        return { exists: response.data.exists };
      }
      return { exists: false };
    } catch (error) {
      toast.error("Error al validar");
      return { exists: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    validateExistUser,
    isLoading,
  };
};

export default useValidations;


