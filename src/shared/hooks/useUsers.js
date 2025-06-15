import { createUser, updateUser, getUsers } from "@/services/api";
import { useState } from "react";

const useUsers = () => {
  const [loading, setLoading] = useState(false);

  const addUser = async (userData) => {
    setLoading(true);
    const response = await createUser(userData);
    setLoading(false);
    return response;
  };

  const editUser = async (id, userData) => {
    setLoading(true);
    const response = await updateUser(id, userData);
    setLoading(false);
    return response;
  };

  const fetchUsers = async () => {
    setLoading(true);
    const response = await getUsers();
    setLoading(false);
    return response;
  };

  return { 
    addUser, 
    editUser, 
    fetchUsers, 
    loading 
};
};

export default useUsers;