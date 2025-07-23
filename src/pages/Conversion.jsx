import React from 'react';
import CurrencyConversion from '../components/dashboard/CurrencyConversion';
import useAccountStore from '../shared/stores/accountStore';

const Conversion = () => {
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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Conversión de Moneda</h1>
      <CurrencyConversion />
    </div>
  );
};

export default Conversion; 