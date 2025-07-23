import React from 'react';
import { Zap } from 'lucide-react';

const payments = [
  {
    id: '1',
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
        <Zap className="h-5 w-5 text-yellow-400" />
      </div>
    ),
    title: 'Electric Bill',
    date: 'Tomorrow',
    amount: 267.0,
  },
  {
    id: '2',
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
          <path d="M9 2h6v2h-6z"/>
          <path d="M12 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
          <rect width="18" height="12" x="3" y="8" rx="2"/>
        </svg>
      </div>
    ),
    title: 'Netflix',
    date: '25.09.2021',
    amount: 32.55,
  },
  {
    id: '3',
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <line x1="2" x2="22" y1="10" y2="10"/>
        </svg>
      </div>
    ),
    title: 'Switch',
    date: '01.10.2021',
    amount: 149.99,
  },
];

const UpcomingPayments = () => {
  return (
    <div className="rounded-lg bg-gray-900 p-5">
      <h2 className="mb-4 text-lg font-semibold text-white">Upcoming Payments</h2>
      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="flex items-center justify-between">
            <div className="flex items-center">
              {payment.icon}
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{payment.title}</p>
                <p className="text-xs text-gray-400">{payment.date}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-red-400">-$ {payment.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingPayments; 