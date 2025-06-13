import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftRight } from "lucide-react";
import { useBalance } from "../../shared/hooks/useBalance.js";
import { convertirBalancePorMoneda } from "../../services/api.js";

const MONEDAS_PERMITIDAS = ["USD", "EUR", "MXN", "JPY", "GBP", "CAD"];

const simbolosMoneda = {
  USD: "$",
  EUR: "€",
  MXN: "$",
  JPY: "¥",
  GBP: "£",
  CAD: "C$",
};

const nombresMoneda = {
  USD: "Dólar Estadounidense",
  EUR: "Euro",
  MXN: "Peso Mexicano",
  JPY: "Yen Japonés",
  GBP: "Libra Esterlina",
  CAD: "Dólar Canadiense",
};

const CurrencyConversion = () => {
  const [monedaSeleccionada, setMonedaSeleccionada] = useState("JPY");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [datosConversion, setDatosConversion] = useState(null);

  const { accountNo, balance: balanceGTQ, error: balanceError } = useBalance(monedaSeleccionada);

  const lastRequestRef = useRef({ moneda: null, balance: null });

  const obtenerConversion = async (moneda) => {
    if (!accountNo) return;

    if (
      lastRequestRef.current.moneda === moneda &&
      lastRequestRef.current.balance === balanceGTQ
    ) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await convertirBalancePorMoneda(accountNo, moneda);
      if (res.error) throw res.e;

      const {
        accountNo: cuenta,
        balance_GTQ,
        monedaDestino,
        tasa_de_Conversion,
        balanceConvertido,
      } = res.data;

      setDatosConversion({
        accountNo: cuenta,
        balance_GTQ,
        monedaDestino,
        tasa_de_Conversion,
        balanceConvertido,
      });

      lastRequestRef.current = { moneda, balance: balanceGTQ };
    } catch (e) {
      console.error("Error de conversión:", e);
      setError("Error al obtener la conversión.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accountNo && balanceGTQ !== null) {
      obtenerConversion(monedaSeleccionada);
    }
  }, [monedaSeleccionada, accountNo, balanceGTQ]);

  const handleMonedaChange = (e) => {
    setMonedaSeleccionada(e.target.value);
  };

  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Conversión de Moneda</h2>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          <span>Actualizado automáticamente</span>
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

      <div className="rounded-lg bg-gray-800 p-5 border border-gray-700">
        {isLoading || !datosConversion ? (
          <div className="flex justify-center items-center py-5">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Saldo en GTQ</p>
                <p className="text-2xl font-bold text-white">
                  Q {parseFloat(datosConversion.balance_GTQ).toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Tasa de cambio</p>
                <p className="text-base font-medium text-white">
                  1 GTQ = {datosConversion.tasa_de_Conversion} {datosConversion.monedaDestino}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-1">
                Saldo convertido a {nombresMoneda[datosConversion.monedaDestino]}
              </p>
              <p className="text-2xl font-bold text-white">
                {simbolosMoneda[datosConversion.monedaDestino]}{" "}
                {parseFloat(datosConversion.balanceConvertido).toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrencyConversion;
