import { useState } from "react";
import { register as registerRequest } from "../../services/api.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (data) => {
    setIsLoading(true);

    const response = await registerRequest(data);
    setIsLoading(false);
    console.log(response)
    if (response.error) {
      toast.error(
        response.e.response?.data.msg ||
        "An error occurred during registration.",
        {
          duration: 3000,
        }
      );
      return;
    }

    toast.success("Registration successful", {
      description: "You have registered successfully!",
      duration: 3000,
    });
    navigate("/login");
  };

  return {
    registerUser,
    isLoading,
  };
};