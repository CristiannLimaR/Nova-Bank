import React from 'react';
import BalanceCard from '../components/dashboard/BalanceCard';
import TransactionsList from '../components/dashboard/TransactionsList';
import FavoriteContacts from '../components/dashboard/FavoriteContacts';
import useAccountStore from '../shared/stores/AccountStore';

const Dashboard = () => {
  const getVerify = useAccountStore((state) => state.getVerify);
  const isVerified = getVerify();

  if (!isVerified) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500/10 mb-4">
              <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Cuenta Pendiente de Activación</h3>
            <p className="text-sm text-gray-300">
              Tu cuenta bancaria no ha sido activada, un administrador la activará pronto
            </p>
          </div>
        </div>
      </div>
    );
  }

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