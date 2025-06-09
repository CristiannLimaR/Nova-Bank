import React, { useState, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

const MONEDAS_PERMITIDAS = ['USD', 'EUR', 'MXN', 'JPY', 'GBP', 'CAD'];

const simbolosMoneda = {
  USD: '$',
  EUR: '€',
  MXN: '$',
  JPY: '¥',
  GBP: '£',
  CAD: 'C$'
};

const nombresMoneda = {
  USD: 'Dólar Estadounidense',
  EUR: 'Euro',
  MXN: 'Peso Mexicano',
  JPY: 'Yen Japonés',
  GBP: 'Libra Esterlina',
  CAD: 'Dólar Canadiense'
};

const CurrencyConversion = () => {
  const [monedaSeleccionada, setMonedaSeleccionada] = useState('JPY');
  const [datosConversion, setDatosConversion] = useState({
    accountNo: 1299553667,
    balance_GTQ: 500,
    monedaDestino: "JPY",
    tasa_de_Conversion: "18.830053",
    balanceConvertido: "9415.03"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerConversion = async (moneda) => {
    //llamada de la funcion del hook
      
  };

  useEffect(() => {
    obtenerConversion(monedaSeleccionada);
  }, [monedaSeleccionada]);

  const handleMonedaChange = (e) => {
    setMonedaSeleccionada(e.target.value);
  };

  return (
    <div className="rounded-lg bg-gray-900 p-5">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Conversión de Moneda</h2>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          <span>Actualizado hace 5 min</span>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="moneda" className="block text-sm font-medium text-gray-400 mb-2">
          Selecciona la moneda para ver tu saldo
        </label>
        <select
          id="moneda"
          value={monedaSeleccionada}
          onChange={handleMonedaChange}
          className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {MONEDAS_PERMITIDAS.map((moneda) => (
            <option key={moneda} value={moneda}>
              {moneda} - {nombresMoneda[moneda]}
            </option>
          ))}
        </select>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-red-200">
          {error}
        </div>
      )}

      <div className="rounded-lg bg-gray-800 p-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Saldo en GTQ</p>
                <p className="text-2xl font-bold text-white">
                  Q {datosConversion.balance_GTQ.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Tasa de cambio</p>
                <p className="text-sm font-medium text-white">
                  1 GTQ = {datosConversion.tasa_de_Conversion} {datosConversion.monedaDestino}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Saldo convertido a {datosConversion.monedaDestino}</p>
                  <p className="text-2xl font-bold text-white">
                    {simbolosMoneda[datosConversion.monedaDestino]} {datosConversion.balanceConvertido}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Número de cuenta</p>
                  <p className="text-sm font-medium text-white">
                    {datosConversion.accountNo}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrencyConversion; 