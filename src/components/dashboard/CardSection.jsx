import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import { cn } from '../../utils/cn';

const cards = [
  {
    id: '1',
    number: '4356785678901234',
    displayNumber: '**** **** **** 1234',
    balance: 1675.22,
    type: 'VISA',
    owner: 'John Doe',
    expiry: '04/25',
    status: 'Active',
    currency: 'USD',
  },
  {
    id: '2',
    number: '5412345678901234',
    displayNumber: '**** **** **** 1234',
    balance: 3420.58,
    type: 'MASTERCARD',
    owner: 'John Doe',
    expiry: '09/26',
    status: 'Active',
    currency: 'USD',
  },
];

const CardSection = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCard = cards[activeCardIndex];

  const nextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Cards</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevCard}
            disabled={cards.length <= 1}
            className="rounded-md bg-gray-800 p-1 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextCard}
            disabled={cards.length <= 1}
            className="rounded-md bg-gray-800 p-1 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative h-48 w-full perspective-1000">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={cn(
              'absolute left-0 top-0 h-full w-full transition-all duration-500 ease-in-out',
              index === activeCardIndex
                ? 'z-10 rotate-0 opacity-100'
                : 'z-0 -rotate-6 opacity-0'
            )}
          >
            <div className="card-gradient h-full w-full rounded-xl p-5 shadow-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">$ {card.balance.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{card.type}</p>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-md tracking-widest text-white/90">{card.displayNumber}</p>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="text-xs text-white/70">Owner</p>
                  <p className="text-sm font-medium text-white">{card.owner}</p>
                </div>
                <div>
                  <p className="text-right text-xs text-white/70">Expires</p>
                  <p className="text-right text-sm font-medium text-white">{card.expiry}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-gray-900 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Card Info</h3>
          <button className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white">
            <Edit className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-sm text-gray-400">Card Number</p>
            <p className="text-sm font-medium text-white">{activeCard.displayNumber}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-400">Status</p>
            <p className="text-sm font-medium text-white">{activeCard.status}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-400">Currency</p>
            <p className="text-sm font-medium text-white">{activeCard.currency}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-400">Balance</p>
            <p className="text-sm font-medium text-white">$ {activeCard.balance.toFixed(2)}</p>
          </div>
        </div>
        <button className="mt-4 w-full rounded-md bg-gray-800 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors">
          Details
        </button>
      </div>
    </div>
  );
};

export default CardSection; 