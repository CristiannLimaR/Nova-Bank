import React, { useState } from "react";
import { Button } from "../ui/button";
import { Check, DollarSign } from "lucide-react";

const UnverifiedAccountList = ({ accounts, onVerify }) => {
  const [filter, setFilter] = useState("all"); // all | verified | unverified

  const filteredAccounts = accounts.filter((acc) => {
    if (filter === "all") return true;
    if (filter === "verified") return acc.verify === true;
    if (filter === "unverified") return acc.verify === false;
    return true;
  });

  return (
    <div>
      <h2 className="text-white text-2xl font-bold mb-6">Cuentas</h2>

      {/* Filtros */}
      <div className="mb-6 flex space-x-3">
        {["all", "verified", "unverified"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              filter === f
                ? "bg-green-700 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-green-700 hover:text-white"
            }`}
            aria-label={`Mostrar ${
              f === "all"
                ? "todas las cuentas"
                : f === "verified"
                ? "cuentas verificadas"
                : "cuentas no verificadas"
            }`}
          >
            {f === "all"
              ? "Todas"
              : f === "verified"
              ? "Verificadas"
              : "No Verificadas"}
          </button>
        ))}
      </div>

      {filteredAccounts.length === 0 && (
        <p className="text-gray-300">No hay cuentas para mostrar.</p>
      )}

      {/* Tabla */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Cuenta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredAccounts.map((acc) => (
              <tr key={acc._id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                  {acc.accountNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {acc.user?.username || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      acc.verify
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {acc.verify ? "Verificada" : "No Verificada"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {acc.user?.role === "ADMIN_ROLE" ? (
                    <span className="text-gray-400 italic">Admin</span>
                  ) : (
                    <div className="flex space-x-3">
                      {!acc.verify && (
                        <button
                          title="Marcar como verificada"
                          onClick={() => onVerify(acc._id, true)}
                          className="p-2 bg-gray-700 rounded hover:bg-green-600 transition-colors"
                        >
                          <Check className="w-5 h-5 text-green-400" />
                        </button>
                      )}
                      <button
                        title="Ver transacciones"
                        onClick={() =>
                          window.open(
                            "http://localhost:5175/admin/transactions",
                            "_blank"
                          )
                        }
                        className="p-2 bg-gray-700 rounded hover:bg-green-600 transition-colors"
                      >
                        <DollarSign className="w-5 h-5 text-green-400" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnverifiedAccountList;
