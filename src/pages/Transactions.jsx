import React, { useState } from 'react';
import { Search, Filter, Calendar, ChevronDown, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';

const transactions = [
  {
    id: '1',
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9 12h6"/>
          <path d="M12 9v6"/>
        </svg>
      </div>
    ),
    merchant: 'Spotify Premium',
    category: 'Entertainment',
    date: '20 Sep 2021',
    amount: -10.99,
    status: 'Completed',
    type: 'expense',
  },
  {
    id: '2',
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
          <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>
          <path d="M8.5 13.5A2.5 2.5 0 0 1 11 16h2a2.5 2.5 0 0 0 0-5h-2a2.5 2.5 0 0 1 0-5h2a2.5 2.5 0 0 1 2.5 2.5"/>
        </svg>
      </div>
    ),
    merchant: 'Amazon',
    category: 'Shopping',
    date: '19 Sep 2021',
    amount: -567.0,
    status: 'Completed',
    type: 'expense',
  },
  {
    id: '3',
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <path d="M2 20h.01"/>
          <path d="M7 20v-4"/>
          <path d="M12 20v-8"/>
          <path d="M17 20V8"/>
          <path d="M22 4v16"/>
        </svg>
      </div>
    ),
    merchant: 'ID Foundation',
    category: 'Donation',
    date: '16 Sep 2021',
    amount: -200.0,
    status: 'Completed',
    type: 'expense',
  },
  {
    id: '4',
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <line x1="2" x2="22" y1="10" y2="10"/>
        </svg>
      </div>
    ),
    merchant: 'Transfer to Sarah',
    category: 'Transfer',
    date: '15 Sep 2021',
    amount: -567.0,
    status: 'Completed',
    type: 'expense',
  },
  {
    id: '5',
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      </div>
    ),
    merchant: 'Salary Deposit',
    category: 'Income',
    date: '1 Sep 2021',
    amount: 4500.0,
    status: 'Completed',
    type: 'income',
  },
];

const Transactions = () => {
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
    const matchesSearch = transaction.merchant
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || transaction.category === selectedCategory;
    
    const transactionDate = new Date(transaction.date);
    const transactionMonth = transactionDate.getMonth();
    const matchesMonth = selectedMonth === 'All' || months[transactionMonth + 1] === selectedMonth;

    return matchesSearch && matchesCategory && matchesMonth;
  });

  const categories = ['All', 'Entertainment', 'Shopping', 'Donation', 'Transfer', 'Income'];
  const availableMonths = getAvailableMonths();

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <div className="flex gap-2">
          <Button leftIcon={<Plus size={16} />} size="sm">
            Nueva Transacción
          </Button>
        </div>
      </div>

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
                  Merchant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
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
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {transaction.icon}
                      <span className="ml-3 text-sm font-medium text-white">
                        {transaction.merchant}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">{transaction.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">{transaction.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${
                        transaction.type === 'expense' ? 'text-red-400' : 'text-green-400'
                      }`}
                    >
                      {transaction.type === 'expense' ? '-' : '+'} ${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        transaction.status === 'Completed'
                          ? 'bg-green-900/20 text-green-400'
                          : transaction.status === 'Pending'
                          ? 'bg-yellow-900/20 text-yellow-400'
                          : 'bg-red-900/20 text-red-400'
                      }`}
                    >
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

export default Transactions; 