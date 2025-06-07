import React from 'react';
import { User, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

const contacts = [
  {
    id: '1',
    name: 'María García',
    account: '**** 4567',
    avatar: null,
  },
  {
    id: '2',
    name: 'Juan Pérez',
    account: '**** 7890',
    avatar: null,
  },
  {
    id: '3',
    name: 'Ana Martínez',
    account: '**** 1234',
    avatar: null,
  },
  {
    id: '4',
    name: 'Carlos López',
    account: '**** 5678',
    avatar: null,
  },
  {
    id: '5',
    name: 'Laura Sánchez',
    account: '**** 9012',
    avatar: null,
  },
];

const FavoriteContacts = () => {
  return (
    <div className="rounded-lg bg-gray-900 p-5">
      <h2 className="mb-4 text-lg font-semibold text-white">Contactos Favoritos</h2>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
                {contact.avatar ? (
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{contact.name}</p>
                <p className="text-xs text-gray-400">{contact.account}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              SEND
            </Button>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full flex items-center justify-center space-x-2 rounded-md bg-gray-800 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors">
        <span>Ver todos</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FavoriteContacts; 