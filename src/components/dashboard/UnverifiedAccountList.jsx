import React, { useState } from "react";
import { Check, DollarSign, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UnverifiedAccountList = ({ accounts, onVerify }) => {
  const [filter, setFilter] = useState("all"); // all | verified | unverified
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredAccounts = accounts.filter((acc) => {
    // Primero aplicamos el filtro de verificación
    if (filter === "verified" && !acc.verify) return false;
    if (filter === "unverified" && acc.verify) return false;

    // Luego aplicamos la búsqueda
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      acc._id.toLowerCase().includes(searchLower) ||
      String(acc.accountNo).toLowerCase().includes(searchLower) ||
      (acc.user?.username && acc.user.username.toLowerCase().includes(searchLower))
    );
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
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por ID, número de cuenta o usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
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
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Cuenta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Cliente
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
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {acc._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                  {acc.accountNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {acc.user?.name || "N/A"}
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
                          onClick={() => onVerify(acc._id, { verify: true })}
                          className="p-2 bg-gray-700 rounded hover:bg-green-600 transition-colors"
                        >
                          <Check className="w-5 h-5 text-green-400" />
                        </button>
                      )}
                      <button
                        title="Ver transacciones"
                        onClick={() =>
                          navigate(`/admin/transactions`)
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
