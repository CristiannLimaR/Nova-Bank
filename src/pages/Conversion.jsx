import React from 'react';
import CurrencyConversion from '../components/dashboard/CurrencyConversion';

const Conversion = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Conversión de Moneda</h1>
      <CurrencyConversion />
    </div>
  );
};

export default Conversion; 