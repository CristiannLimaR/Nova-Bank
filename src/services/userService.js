import useAuthStore from '../shared/stores/authStore';
import apiClient from "./api";

export const getFavoriteContacts = async () => {
  try {
    const response = await apiClient.get("/user/me/favorites");
    return response.data.favorites;
  } catch (error) {
    console.error("Error al obtener los contactos favoritos:", error);
    throw new Error("No se pudieron cargar los contactos favoritos.");
  }
};