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

// PRODUCTS
export const getProducts = async (data) => {
  try {
    return await apiClient.get("/products/", data);
  } catch (e) {}
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

export const createProduct = async (formData) => {
  try {
    return await apiClient.post("/products/save", formData);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const updateProduct = async (id, data) => {
  try {
    return await apiClient.put(`/products/update/${id}`, data);
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
