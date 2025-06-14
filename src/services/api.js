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

export const start2FA = async () => {
  try {
    return await apiClient.post("/2fa/start");
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await apiClient.post("/user/forgot-password", data);
    return {
      data: response.data,
      error: false,
    };
  } catch (e) {
    return {
      error: true,
      e: e.response ? e.response.data : e.message,
    };
  }
};

export const convertirBalancePorMoneda = async (accountNo, moneda) => {
  try {
    return await apiClient.get(`/balance/${accountNo}/${moneda}`);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const updateUser = async (userId, data) => {
  try {
    const response = await apiClient.put(`/user/${userId}`, data);
    return {
      data: response.data,
      error: false,
    };
  } catch (e) {
    return {
      error: true,
      e: e.response ? e.response.data : e.message,
    };
  }
};

export const verify2FA = async (data) => {
  try {
    return await apiClient.post("/2fa/verify", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const updatePassword = async (data) => {
  try {
    const payload = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    const response = await apiClient.patch('/user/password', payload);
    
    return {
      data: response.data,
      error: false,
    };
  } catch (e) {
    return {
      error: true,
      e: e.response ? e.response.data : e.message,
    };
  }
};

