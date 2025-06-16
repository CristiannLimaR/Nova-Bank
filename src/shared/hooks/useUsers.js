import { useState } from "react";
import { addContact as addContactRequest, createUser, updateUser, getUsers } from "../../services/api";
import { toast } from "sonner";
const useUsers = () => {
  const [loading, setLoading] = useState(false);

  const addContact = async (data) => {
    const response = await addContactRequest(data);
    console.log( 'response', response);
    if (response.error) {
      toast.error(response.e.response.data.msg);
      return
    }
    toast.success("Contacto agregado");
    return response.data;
  };
  
  const addUser = async (userData) => {
    setLoading(true);
    const response = await createUser(userData);
    if (response.error) {
      toast.error(response.e.response.data.msg);
      return
    }
    toast.success("Usuario creado");
    setLoading(false);
    return response;
  };

  const editUser = async (id, userData) => {
    setLoading(true);
    const response = await updateUser(id, userData);
    if (response.error) {
      toast.error(response.e.response.data.msg);
      return
    }
    toast.success("Usuario editado");
    setLoading(false);
    return response;
  };

  const fetchUsers = async () => {
    setLoading(true);
    const response = await getUsers();
    if (response.error) {
      toast.error(response.e.response.data.msg);
      return
    }
    console.log('response', response.data.users);
    setLoading(false);
    return response.data.users;
  };

  return {
    addContact,
    addUser,
    editUser,
    fetchUsers,
    loading,
  };
};

export default useUsers;

