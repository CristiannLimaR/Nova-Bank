import { useState } from "react";
import { addContact as addContactRequest } from "../../services/api";
import { toast } from "sonner";
const useUsers = () => {
  const [users, setUsers] = useState([]);
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

  return {
    addContact,
  };
};

export default useUsers;

