import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Star, Send } from 'lucide-react';
import Button from '../components/ui/Button';

const contacts = [
  {
    id: '1',
    name: 'Sarah Johnson',
    accountNumber: '**** **** **** 4523',
    bank: 'Nova Bank',
    email: 'sarah.j@example.com',
    isFavorite: true,
    lastTransaction: {
      date: '15 Sep 2021',
      amount: 567.0,
    },
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '2',
    name: 'Michael Smith',
    accountNumber: '**** **** **** 8912',
    bank: 'Global Bank',
    email: 'msmith@example.com',
    isFavorite: false,
    lastTransaction: {
      date: '2 Sep 2021',
      amount: 125.0,
    },
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    accountNumber: '**** **** **** 3567',
    bank: 'Nova Bank',
    email: 'emma.w@example.com',
    isFavorite: true,
    lastTransaction: {
      date: '28 Aug 2021',
      amount: 300.0,
    },
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '4',
    name: 'David Brown',
    accountNumber: '**** **** **** 7890',
    bank: 'City Bank',
    email: 'david.b@example.com',
    isFavorite: false,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    accountNumber: '**** **** **** 2345',
    bank: 'Global Bank',
    email: 'lisa.a@example.com',
    isFavorite: false,
    lastTransaction: {
      date: '10 Aug 2021',
      amount: 450.0,
    },
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-white">Contacts</h1>
        <Button leftIcon={<Plus size={16} />} size="sm">
          Add New Contact
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-md border-0 bg-gray-800 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="h-[calc(100vh-12rem)] space-y-2 overflow-y-auto rounded-lg bg-gray-900 p-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`cursor-pointer rounded-lg p-3 hover:bg-gray-800 ${
                  selectedContact.id === contact.id ? 'bg-gray-800' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-700 overflow-hidden">
                      {contact.avatar ? (
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary text-white">
                          {contact.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{contact.name}</p>
                      <p className="text-xs text-gray-400">{contact.bank}</p>
                    </div>
                  </div>
                  <button
                    className={`rounded-full p-1 ${
                      contact.isFavorite ? 'text-yellow-400' : 'text-gray-500'
                    }`}
                  >
                    <Star className="h-4 w-4" fill={contact.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-lg bg-gray-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-14 w-14 rounded-full bg-gray-800 overflow-hidden">
                  {selectedContact.avatar ? (
                    <img
                      src={selectedContact.avatar}
                      alt={selectedContact.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary text-white text-xl">
                      {selectedContact.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-white">{selectedContact.name}</h2>
                  <p className="text-sm text-gray-400">{selectedContact.bank}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Send size={16} />} size="sm">
                  Send Money
                </Button>
                <button className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-800 p-4">
                <p className="text-sm text-gray-400">Account Number</p>
                <p className="text-md font-medium text-white">{selectedContact.accountNumber}</p>
              </div>
              <div className="rounded-lg bg-gray-800 p-4">
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-md font-medium text-white">{selectedContact.email}</p>
              </div>
            </div>

            {selectedContact.lastTransaction && (
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-medium text-white">Last Transaction</h3>
                <div className="rounded-lg bg-gray-800 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Date</p>
                      <p className="text-md font-medium text-white">
                        {selectedContact.lastTransaction.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Amount</p>
                      <p className="text-md font-medium text-red-400">
                        -${selectedContact.lastTransaction.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h3 className="mb-4 text-lg font-medium text-white">Quick Transfer</h3>
              <div className="rounded-lg bg-gray-800 p-4">
                <div className="mb-4">
                  <p className="mb-2 text-sm text-gray-400">Amount</p>
                  <div className="flex">
                    <span className="inline-flex items-center rounded-l-md border-r border-gray-700 bg-gray-700 px-3 text-gray-200">
                      $
                    </span>
                    <input
                      type="text"
                      placeholder="0.00"
                      className="w-full rounded-r-md border-0 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <p className="mb-2 text-sm text-gray-400">Note (Optional)</p>
                  <input
                    type="text"
                    placeholder="What's this for?"
                    className="w-full rounded-md border-0 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button className="w-full" leftIcon={<Send size={16} />}>
                  Send Money
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts; 