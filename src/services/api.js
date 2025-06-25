import axios from "axios";
import useAuthStore from "../shared/stores/authStore";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/bankSystem/v1",
  timeout: 5000,
});
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


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Iniciar sesión
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

export const createUser = async (data) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (e) {
    return {
      error: true,
      e,
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

export const getUsers = async () => {
  try {
    return await apiClient.get("/user");
  } catch (e) {
    return { error: true, e };
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
      password: data.password,
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


export const getProducts = async () => {
  try {
    return await apiClient.get("/products");
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const searchProduct = async (id) => {
  try {
    return await apiClient.get(`/products/search/${id}`);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const getTransactionsByAccountId = async (accountId) => {
  try {
    return await apiClient.get(`/transaction/account/${accountId}`);
  } catch (e) {
    return { error: true, e };
  }
};

export const getChartData = async (accountId) => {
  try {
    return await apiClient.get(`/transaction/chart/${accountId}`);
  } catch (e) {
    return { error: true, e };
  }
};

export const getCredit = async () => {
  try {
    return await apiClient.get(`/transaction/credit`);
  } catch (e) {
    return { error: true, e };
  }
};

export const addContact = async (data) => {
  try {
    return await apiClient.post("/user/favorite", data);
  } catch (e) {
    return { error: true, e };
  }
};

export const getAllAccounts = async () => {
  try {
    return await apiClient.get("/account");
  } catch (e) {
    return { error: true, e };
  }
};

export const verifyAccount = async (accountId, data) => {
  try {
    return await apiClient.patch(`/account/${accountId}`,data);
  } catch (e) {
    return { error: true, e };
  }
};


export const verifyExistUser = async (data) => {
  try {
    return await apiClient.post(`/user/exists`, data);
  } catch (e) {
    return { error: true, e };
  }
};

export const createProduct = async (formData) => {
  try {
    return await apiClient.post("/products/save", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const updateProduct = async (id, formData) => {
  try {
    return await apiClient.put(`/products/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const deleteProduct = async (id) => {
  try {
    return await apiClient.delete(`/products/delete/${id}`);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};
