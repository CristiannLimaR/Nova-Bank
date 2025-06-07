import { useState } from 'react';
import { Plus, Search, RotateCcw, Filter } from 'lucide-react';

const TransactionsPage = () => {
  const [deposits] = useState([
    {
      id: 1,
      user: 'Juan Pérez',
      amount: 1000.00,
      date: '2024-03-15 14:30',
      status: 'Completado',
      canRevert: true
    },
    {
      id: 2,
      user: 'María García',
      amount: 500.00,
      date: '2024-03-15 14:25',
      status: 'Completado',
      canRevert: true
    },
    // Más depósitos de ejemplo...
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Operaciones Bancarias</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary/90">
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Depósito
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar transacciones..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700">
          <Filter className="w-5 h-5 mr-2" />
          Filtros
        </button>
      </div>

      {/* Tabla de depósitos */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Fecha
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
            {deposits.map((deposit) => (
              <tr key={deposit.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{deposit.user}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">Q {deposit.amount.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{deposit.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/20 text-green-400">
                    {deposit.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {deposit.canRevert && (
                    <button className="text-red-400 hover:text-red-300 flex items-center">
                      <RotateCcw className="w-5 h-5 mr-1" />
                      Revertir
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario de nuevo depósito (inicialmente oculto) */}
      <div className="mt-8 bg-gray-800 rounded-lg shadow p-6 hidden">
        <h2 className="text-xl font-semibold mb-4 text-white">Nuevo Depósito</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Cliente</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary">
              <option>Seleccionar cliente...</option>
              <option>Juan Pérez</option>
              <option>María García</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Monto</label>
            <input
              type="number"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:ring-primary focus:border-primary"
              placeholder="0.00"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              Realizar Depósito
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionsPage; 