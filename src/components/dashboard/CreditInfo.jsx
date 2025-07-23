import React from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';

const CreditInfo = ({ data }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Estos valores deberían venir de tu estado global o API
  const creditInfo = {
    availableCredit: data.availableCredit,
    usedCredit: data.creditLimit - data.availableCredit,
    creditLimit: data.creditLimit,
    nextPayment: formatDate(data.dateOfPayment),
    minimumPayment: data.payment
  };

  const creditUsagePercentage = (creditInfo.usedCredit / creditInfo.creditLimit) * 100;

  return (
    <div className="rounded-lg bg-gray-900 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Información de Crédito</h2>
        <CreditCard className="h-5 w-5 text-gray-400" />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-gray-400 text-sm">Crédito Disponible</p>
            <h3 className="text-3xl font-bold text-white">$ {creditInfo.availableCredit.toFixed(2)}</h3>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Límite de Crédito</p>
            <p className="text-lg font-semibold text-white">$ {creditInfo.creditLimit.toFixed(2)}</p>
          </div>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2.5 mb-2">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${creditUsagePercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 text-right">
          {creditUsagePercentage.toFixed(1)}% del límite utilizado
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-800 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm text-gray-400">Crédito Utilizado</span>
            </div>
          </div>
          <p className="text-lg font-semibold text-white">$ {creditInfo.usedCredit.toFixed(2)}</p>
        </div>

        <div className="rounded-lg bg-gray-800 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-500 mr-1"
              >
                <path
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-gray-400">Próximo Pago</span>
            </div>
          </div>
          <p className="text-lg font-semibold text-white">$ {creditInfo.minimumPayment.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">Fecha: {creditInfo.nextPayment}</p>
        </div>
      </div>
    </div>
  );
};

export default CreditInfo; 