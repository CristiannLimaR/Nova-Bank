import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  BarChart2, 
  Users, 
  ShoppingBag, 
  Settings, 
  Menu,
  X,
  ArrowLeftRight
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BarChart2, label: 'Transactions', path: '/transactions' },
    { icon: Users, label: 'Contacts', path: '/contacts' },
    { icon: ShoppingBag, label: 'Productos/Servicios', path: '/payments' },
    { icon: ArrowLeftRight, label: 'Conversión', path: '/conversion' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gray-900 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <div className="rounded-full bg-gray-800 p-1 mr-2">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#0F1114"/>
              <path d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6ZM20.4287 16C20.4287 18.4501 18.4501 20.4287 16 20.4287C13.5499 20.4287 11.5713 18.4501 11.5713 16C11.5713 13.5499 13.5499 11.5713 16 11.5713C18.4501 11.5713 20.4287 13.5499 20.4287 16Z" fill="#3DD9C9"/>
            </svg>
          </div>
          <span className="text-xl font-semibold text-white">Nova Bank</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-hidden md:hidden"
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto py-4">
        <nav className="flex-1 space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
              end={item.path === '/'}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="flex items-center space-x-3 rounded-md bg-gray-800 p-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-gray-400">Premium Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 