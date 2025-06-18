import { useState } from "react";
import { verifyExistUser as verifyExistUserRequest } from "@/services/api";
import { toast } from "sonner";

const useValidations = () => {
    const [loading, setLoading] = useState(false);
  const validateExistUser = async (data) => {
    console.log(data);
    setLoading(true);
    const response = await verifyExistUserRequest(data);
    if (response.error) {
      toast.error(response.e.response.data.msg);
      return
    }
    setLoading(false);
    return response.data;
  };

  return {
    validateExistUser,
    loading,
  };
};

export default useValidations;
