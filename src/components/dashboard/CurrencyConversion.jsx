import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

const currencies = [
  {
    code: 'USD',
    name: 'Dólar Estadounidense',
    rate: 1,
    symbol: '$',
    balance: 2976.00
  },
  {
    code: 'EUR',
    name: 'Euro',
    rate: 0.92,
    symbol: '€',
    balance: 2737.92
  },
  {
    code: 'GBP',
    name: 'Libra Esterlina',
    rate: 0.79,
    symbol: '£',
    balance: 2351.04
  }
];

const CurrencyConversion = () => {
  return (
    <div className="rounded-lg bg-gray-900 p-5">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Conversión de Moneda</h2>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          <span>Actualizado hace 5 min</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {currencies.map((currency) => (
          <div key={currency.code} className="rounded-lg bg-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{currency.name}</p>
                <p className="text-2xl font-bold text-white">
                  {currency.symbol} {currency.balance.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Tasa de cambio</p>
                <p className="text-sm font-medium text-white">
                  1 USD = {currency.rate.toFixed(2)} {currency.code}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyConversion; 