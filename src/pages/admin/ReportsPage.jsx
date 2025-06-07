import { useState } from 'react';
import { ArrowUp, ArrowDown, Filter } from 'lucide-react';

const ReportsPage = () => {
  const [accounts] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      transactions: 45,
      totalAmount: 15000.00,
      trend: 'up'
    },
    {
      id: 2,
      name: 'María García',
      transactions: 38,
      totalAmount: 12000.00,
      trend: 'down'
    },
    // Más cuentas de ejemplo...
  ]);

  const [transactions] = useState([
    {
      id: 1,
      type: 'Depósito',
      amount: 1000.00,
      date: '2024-03-15 14:30',
      status: 'Completado'
    },
    {
      id: 2,
      type: 'Retiro',
      amount: 500.00,
      date: '2024-03-15 13:45',
      status: 'Completado'
    },
    // Más transacciones de ejemplo...
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Reportes y Análisis</h1>

      {/* Cuentas con más movimientos */}
      <div className="bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Cuentas con Más Movimientos</h2>
          <button className="flex items-center text-gray-400 hover:text-white">
            <Filter className="w-5 h-5 mr-2" />
            Filtrar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Transacciones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Monto Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Tendencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {accounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-white">{account.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{account.transactions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">Q {account.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {account.trend === 'up' ? (
                      <ArrowUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <ArrowDown className="w-5 h-5 text-red-400" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historial de transacciones */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Historial de Transacciones</h2>
          <button className="flex items-center text-gray-400 hover:text-white">
            <Filter className="w-5 h-5 mr-2" />
            Filtrar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-white">{transaction.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">Q {transaction.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/20 text-green-400">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage; 