import axios from "axios";
import useAuthStore from "../shared/stores/authStore";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/bankSystem/v1",
  timeout: 5000,
});

export const login = async (data) => {
  try {
    const response = await apiClient.post("/auth/login", data);
    const { token, user } = response.data;

    useAuthStore.getState().login(user, token);

    return {
      data: {
        token,
        user,
      },
    };
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getToken();

    if (token) {
      config.headers["x-token"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const getMyAccount = async () => {
  try {
    return await apiClient.get("/account/my-account");
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const searchAccount = async (accountNo) => {
  try {
    return await apiClient.get(`/account/search/${accountNo}`);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};
