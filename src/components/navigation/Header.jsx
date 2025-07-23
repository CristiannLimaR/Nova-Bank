import React from 'react';
import { Bell, Mail, Menu, Search } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-4 md:px-6">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="mr-4 rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-hidden md:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-64 rounded-md border-0 bg-gray-800 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-hidden">
          <Bell size={20} />
        </button>
        <button className="rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-hidden">
          <Mail size={20} />
        </button>
        <div className="h-8 w-8 rounded-full bg-gray-700 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100" 
            alt="User avatar" 
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 