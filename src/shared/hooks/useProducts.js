import { useState } from "react";
import {
  getProducts as getProductsReq,
  searchProduct as searchProductReq,
  createProduct as saveProductReq,
  updateProduct as upadateProductReq,
  deleteProduct as deleteProductReq,
} from "../../services/api.js";

import { toast } from "sonner";

export const useProducts = () => {
      const [loading, setLoading] = useState(false);

    const getProducts = async () => {
        setLoading(true);
        const response = await getProductsReq();

        if (response.error) {
            toast.error("Error al obtener productos", {
                description: response.error?.response?.data || "Ocurrio un error al obtener los productos",
                duration: 2000,
            });
            setLoading(false);
            return { error: true };
        }

        setLoading(false);
        console.log(response.data)
        return response.data;
    }

    const searchProduct = async (id) => {
        setLoading(true);
        const response = await searchProductReq(id);

        if (response.error) {
            toast.error("Error al buscar producto", {
                description: response.error?.response?.data || "Ocurrio un error al buscar el producto",
                duration: 2000,
            });
            setLoading(false);
            return { error: true };
        }

        setLoading(false);
        return response.data;
    };

    const createProduct = async (data) => {
        setLoading(true);
        const response = await saveProductReq(data);

        if (response.error) {
            toast.error("Error al crear producto", {
                description: response.error?.response?.data || "Ocurrio un error al crear el producto",
                duration: 2000,
            });
            setLoading(false);
            return { error: true };
        }

        setLoading(false);
        return response.data;
    };

    const updateProduct = async (id,data) => {
        setLoading(true);
        const response = await upadateProductReq(id,data);

        if (response.error) {
            toast.error("Error al actualizar producto", {
                description: response.error?.response?.data || "Ocurrio un error al actualizar el producto",
                duration: 2000,
            });
            setLoading(false);
            return { error: true };
        }

        setLoading(false);
        return response.data;
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        const response = await deleteProductReq(id);

        if (response.error) {
            toast.error("Error al eliminar producto", {
                description: response.error?.response?.data || "Ocurrio un error al eliminar el producto",
                duration: 2000,
            });
            setLoading(false);
            return { error: true };
        }

        setLoading(false);
        return response.data;
    };

    // Retorno de las functions
    return {
        getProducts,
        searchProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        loading
    }
}

export default useProducts;