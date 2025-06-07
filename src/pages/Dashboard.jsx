import React from 'react';
import BalanceCard from '../components/dashboard/BalanceCard';
import TransactionsList from '../components/dashboard/TransactionsList';
import FavoriteContacts from '../components/dashboard/FavoriteContacts';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <BalanceCard />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TransactionsList />
        </div>
        <div className="lg:col-span-1">
          <FavoriteContacts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;