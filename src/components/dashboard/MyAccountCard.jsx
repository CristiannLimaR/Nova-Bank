import React from "react";
import useAccountStore from "../../shared/stores/accountStore";

const MyAccountCard = () => {
  const account = useAccountStore((state) => state.account);

  if (!account) return <p>No tienes una cuenta asociada.</p>;

  return (
    <div className="bg-gray-800 text-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Mi Cuenta</h2>
      <p><strong>Número:</strong> {account.accountNo}</p>
      <p><strong>Saldo:</strong> Q{account.balance.toFixed(2)}</p>
      <p><strong>Estado:</strong> {account.verify ? "Verificada" : "Pendiente"}</p>
    </div>
  );
};

export default MyAccountCard;
