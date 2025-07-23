import React, { useEffect, useState } from "react";
import useAccount from "../../shared/hooks/useAccount.js";
import { Search } from "lucide-react";
import UnverifiedAccountList from "../../components/dashboard/UnverifiedAccountList.jsx";

const AdminAccountsPage = () => {
  const { fetchAllAccounts, changeAccountVerification } = useAccount();
  const [accounts, setAccounts] = useState([]);

  const loadAccounts = async () => {
    const result = await fetchAllAccounts();
    if (!result.error) {
      setAccounts(result.accounts);
    }
  };

  const handleVerify = async (id, verify) => {
    const result = await changeAccountVerification(id, verify);
    if (result.success) {
      loadAccounts();
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <div className="container mx-auto mt-6">
      
      <UnverifiedAccountList accounts={accounts} onVerify={handleVerify} />
    </div>
  );
};

export default AdminAccountsPage;
