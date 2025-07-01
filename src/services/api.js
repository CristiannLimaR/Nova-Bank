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

export const getTransactions  = async (accountId) => {
  try {
    const res = await apiClient.get(`/transaction/account/${accountId}`);
    return {
      data: res.data,
    };      
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const createTransaction = async (data) => {
  try {
    const res = await apiClient.post("/transaction/", data);
    return {
      data: res.data,
    };
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
}

export const createDeposit = async (data) => {
  try {
    const res = await apiClient.post("/transaction/deposit", data);
    return {
      data: res.data,
    };
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const getAllTransactions = async () => {
  try {
    const res = await apiClient.get(`/transaction/`);
    return {
      data: res.data,
    };
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const cancelTransaction = async (transactionId) => {
  try {
    const res = await apiClient.delete(`/transaction/${transactionId}`);
    return {
      data: res.data,
    };
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
}

export const updateTransaction = async (transactionId, data) => {
  try {
    const res = await apiClient.put(`/transaction/${transactionId}`, data);
    return {
      data: res.data,
    };
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};
