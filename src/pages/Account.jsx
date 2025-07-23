import React, { useEffect } from "react";
import useAccount from "../shared/hooks/useAccount.js";
import MyAccountCard from "../components/dashboard/MyAccountCard.jsx";

const UserAccountPage = () => {
  const { fetchMyAccount } = useAccount();

  useEffect(() => {
    fetchMyAccount();
  }, []);

  return (
    <div className="container mx-auto mt-6">
      <MyAccountCard />
    </div>
  );
};

export default UserAccountPage;
