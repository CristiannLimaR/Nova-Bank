import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import useAccount from '../shared/hooks/useAccount';
import useAuthStore from '../shared/stores/authStore';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { getMyAccount } = useAccount();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      getMyAccount();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl animate-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 