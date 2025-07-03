import React, { useState } from 'react';
import { Search, Filter, Calendar, ChevronDown, Plus, Banknote, ShoppingCart, Repeat } from 'lucide-react';
import { Button } from '../components/ui/Button';
import  useTransactions  from '../shared/hooks/useTransactions'; 
import useAccountStore from '../shared/stores/accountStore';
import { useNavigate } from 'react-router-dom';



const Transactions = () => {
  const navigate = useNavigate();
  const accountId = useAccountStore(state => state.account?._id);
  const { transactions, loading } = useTransactions(accountId);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');

  const months = [
    'All',
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const getAvailableMonths = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    return months.slice(0, currentMonth + 2); // +2 porque necesitamos incluir 'All' y el mes actual
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = (transaction.description || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || transaction.type === selectedCategory;
    
    const transactionDate = new Date(transaction.updatedAt);
    const transactionMonth = transactionDate.getMonth();
    const matchesMonth = selectedMonth === 'All' || months[transactionMonth + 1] === selectedMonth;

    transaction.status = transaction.status === true ? 'Failed' : 'Completed';
    transaction.updatedAt = transaction.updatedAt.split('T')[0]; 
    transaction.icon =
      transaction.type === "TRANSFER" ? (
        <Repeat className="h-6 w-6 text-blue-400" />
      ) : transaction.type === "PURCHASE" ? (
        <ShoppingCart className="h-6 w-6 text-yellow-400" />
      ) : (
        <Banknote className="h-6 w-6 text-green-400" />
      );
    if (!transaction.description || transaction.description.length === 0) {
      if (transaction.type === "TRANSFER") {
        transaction.description = `Transfer to ${transaction.toAccount}`;
      } else if (transaction.type === "DEPOSIT") {
        transaction.description = `Deposit of $${transaction.amount}`;
      } else {
        transaction.description = `Payment of $${transaction.amount}`;
      }
    }


    return matchesSearch && matchesCategory && matchesMonth;
  });
  

  const categories = ['All', ...new Set(transactions.map(t => t.type))];
  const availableMonths = getAvailableMonths();
  

  return (
  <div>
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <h1 className="text-2xl font-bold text-white">Transactions</h1>
      <div className="flex gap-2">
        <Button onClick={() => navigate('/new-transaction')} leftIcon={<Plus size={16} />} size="sm">
          Nueva Transacción
        </Button>
      </div>
    </div>

    {loading ? (
      <div className="text-gray-400">Cargando transacciones...</div>
    ) : (
      <>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="col-span-2 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-md border-0 bg-gray-800 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 w-full appearance-none rounded-md border-0 bg-gray-800 pl-10 pr-8 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-primary"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="h-10 w-full appearance-none rounded-md border-0 bg-gray-800 pl-10 pr-8 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-primary"
            >
              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>

        <div className="rounded-lg bg-gray-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {transaction.icon}
                          <span className="ml-3 text-sm font-medium text-white">
                            {transaction.description}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300">{transaction.type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300">{transaction.updatedAt}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-medium ${
                            transaction.type === 'TRANSFER' || transaction.type === 'PURCHASE' ? 'text-red-400' : 'text-green-400'
                          }`}
                        >
                          {transaction.type === 'TRANSFER' || transaction.type === 'PURCHASE' ? '-' : '+'} ${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            transaction.status === 'Completed'
                              ? 'bg-green-900/20 text-green-400'
                              : 'bg-red-900/20 text-red-400'
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No hay transacciones que coincidan con los filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )}
  </div>
);

};

export default Transactions; 