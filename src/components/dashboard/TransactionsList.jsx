import React from 'react';

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
    merchant: 'Spotify',
    date: '20.09.21',
    amount: -10.0,
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
    date: '19.09.21',
    amount: -567.0,
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
    date: '16.09.21',
    amount: -200.0,
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
    merchant: 'Transfer',
    date: '15.09.21',
    amount: -567.0,
    type: 'expense',
  },
];

const TransactionsList = () => {
  return (
    <div className="rounded-lg bg-gray-900 p-5">
      <h2 className="mb-4 text-lg font-semibold text-white">Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center">
              {transaction.icon}
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{transaction.merchant}</p>
                <p className="text-xs text-gray-400">{transaction.date}</p>
              </div>
            </div>
            <p
              className={`text-sm font-medium ${
                transaction.type === 'expense' ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {transaction.type === 'expense' ? '-' : '+'} ${Math.abs(transaction.amount).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full rounded-md bg-gray-800 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors">
        View All Transactions
      </button>
    </div>
  );
};

export default TransactionsList; 