import { useState, useEffect } from 'react';
import { Plus, Search, RotateCcw, Filter, Calendar, ChevronDown } from 'lucide-react';
import useTransactions from '../../shared/hooks/useTransactions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const TransactionsPage = () => {  
  const { getAllTransactions, revertTransaction, } = useTransactions();
  const navigate = useNavigate();
  const fetchAll = async () => {
    const response = await getAllTransactions();
    if (response?.data?.transactions) {
      const depositsOnly = response.data.transactions
        .filter((tx) => tx.type === "DEPOSIT")
        .map((tx) => ({
          id: tx._id,
          user: tx.admin?.name || "Admin desconocido",
          amount: tx.amount,
          date: new Date(tx.createdAt).toLocaleString("es-ES", {
            dateStyle: "short",
            timeStyle: "short",
          }),
          status: tx.status ? "Completed" : "Cancelled",
          canRevert: (Date.now() -new Date(tx.updatedAt) < 60 * 1000) ? true : false, // Puede revertir solo si la transacción se actualizó hace menos de 1 minuto
        }));

      setDeposits(depositsOnly);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);


  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedMonth, setSelectedMonth] = useState('Todos');

  const [deposits, setDeposits] = useState([]);

  const months = [
    'Todos',
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return months[date.getMonth() + 1];
  };

  const filteredDeposits = deposits.filter((deposit) => {
    const matchesSearch = deposit.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'Todos' || deposit.status === selectedStatus;
    const matchesMonth = selectedMonth === 'Todos' || getMonthName(deposit.date) === selectedMonth;
    return matchesSearch && matchesStatus && matchesMonth;
  });

  const availableStatuses = ['Todos', ...new Set(deposits.map(d => d.status))];
  const availableMonths = ['Todos', ...new Set(deposits.map(d => getMonthName(d.date)))];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Operaciones Bancarias</h1>
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary/90"
          onClick={() => navigate("/admin/transactions/new")}
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Depósito
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {availableStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Tabla de depósitos */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Administrador
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
            {filteredDeposits.length > 0 ? (
              filteredDeposits.map((deposit) => (
                <tr key={deposit.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {deposit.user}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      Q {deposit.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{deposit.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        deposit.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {deposit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className={`flex items-center text-sm font-medium rounded px-3 py-1.5 transition ${
                        deposit.canRevert
                          ? "text-red-400 hover:text-red-300"
                          : "text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!deposit.canRevert}
                      title={
                        deposit.canRevert
                          ? "Puedes revertir esta transacción"
                          : "Ya no se puede revertir. Pasó más de un minuto."
                      }
                      onClick={async () => {
                        if (!deposit.canRevert) {
                          toast.error(
                            "No se puede revertir. Ha pasado más de un minuto."
                          );
                          return;
                        }

                        const res = await revertTransaction(deposit.id);

                        if (res?.error) {
                          toast.error("Ocurrió un error al revertir.");
                        } else {
                          toast.success("Transacción revertida exitosamente.");
                          fetchAll();
                        }
                      }}
                    >
                      <RotateCcw className="w-5 h-5 mr-1" />
                      Revertir
                    </button>
                    <button
                      className={`flex items-center text-sm font-medium rounded px-3 py-1.5 transition ${
                        deposit.canRevert
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!deposit.canRevert}
                      title={
                        deposit.canRevert
                          ? "Puedes actualizar esta transacción"
                          : "Ya no se puede actualizar. Pasó más de un minuto."
                      }
                      onClick={() =>
                        navigate(`/admin/transactions/edit/${deposit.id}`)
                      }
                    >
                      <RotateCcw className="w-5 h-5 mr-1 rotate-90" />
                      Actualizar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No se encontraron transacciones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
