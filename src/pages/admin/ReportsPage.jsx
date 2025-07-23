import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Filter } from 'lucide-react';

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Usando date-fns para manejo de fechas
import { format, subDays, startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { es } from 'date-fns/locale';

// Importar el hook personalizado
import { useStats } from '../../shared/hooks/useStats.js';

export const description = "An interactive area chart with daily data"

const chartConfig = {
  deposit: {
    label: "Depósitos",
    color: "hsl(160, 84%, 39%)",
  },
  purchase: {
    label: "Compras",
    color: "hsl(0, 84%, 60%)",
  },
  transfer: {
    label: "Transferencias",
    color: "hsl(210, 100%, 50%)",
  },
}

export function ChartAreaInteractive({ chartData, timeRange, setTimeRange }) {
  const filteredData = React.useMemo(() => {
    if (!chartData || chartData.length === 0) return [];
    
    const today = new Date();
    let startDate;
    
    switch(timeRange) {
      case "180d":
        startDate = subDays(today, 180);
        break;
      case "90d":
        startDate = subDays(today, 90);
        break;
      case "30d":
        startDate = subDays(today, 30);
        break;
      case "7d":
        startDate = subDays(today, 7);
        break;
      default:
        startDate = subDays(today, 7);
    }

    return chartData.filter(item => {
      const itemDate = new Date(item.date);
      return isWithinInterval(itemDate, {
        start: startOfDay(startDate),
        end: endOfDay(today)
      });
    });
  }, [timeRange, chartData]);

  return (
    <Card className="pt-0 bg-gray-800 border-gray-700">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b border-gray-700 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-white">Análisis de Transacciones Diarias</CardTitle>
          <CardDescription className="text-gray-400">
            Movimientos diarios por tipo de transacción
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg bg-gray-700 border-gray-600 text-white"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Última semana" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-gray-800 border-gray-700">
            <SelectItem value="180d" className="rounded-lg text-white hover:bg-gray-700">
              Últimos 6 meses
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg text-white hover:bg-gray-700">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg text-white hover:bg-gray-700">
              Último mes
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg text-white hover:bg-gray-700">
              Última semana
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Mostrando {filteredData.length} día(s) de datos
          </div>
          <div className="text-sm text-gray-400">
            {filteredData.length > 0 && (
              <>
                Desde {format(new Date(filteredData[0].date), 'dd/MM/yyyy', { locale: es })} 
                hasta {format(new Date(filteredData[filteredData.length - 1].date), 'dd/MM/yyyy', { locale: es })}
              </>
            )}
          </div>
        </div>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDeposit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(160, 84%, 39%)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(160, 84%, 39%)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPurchase" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(0, 84%, 60%)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(0, 84%, 60%)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTransfer" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(210, 100%, 50%)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(210, 100%, 50%)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                if (timeRange === '7d') {
                  return format(date, 'EEE dd', { locale: es });
                } else if (timeRange === '30d') {
                  return format(date, 'dd/MM');
                } else if (timeRange === '90d') {
                  return format(date, 'dd/MM', { locale: es });
                } else {
                  return format(date, 'MMM yyyy', { locale: es });
                }
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return format(date, 'EEEE, dd \'de\' MMMM \'de\' yyyy', { locale: es });
                  }}
                  indicator="dot"
                  formatter={(value, name) => [
                    `Q ${value.toLocaleString()}`,
                    chartConfig[name]?.label || name
                  ]}
                />
              }
            />
            <Area
              dataKey="deposit"
              type="monotone"
              fill="url(#fillDeposit)"
              stroke="hsl(160, 84%, 39%)"
              stackId="a"
              strokeWidth={2}
            />
            <Area
              dataKey="purchase"
              type="monotone"
              fill="url(#fillPurchase)"
              stroke="hsl(0, 84%, 60%)"
              stackId="a"
              strokeWidth={2}
            />
            <Area
              dataKey="transfer"
              type="monotone"
              fill="url(#fillTransfer)"
              stroke="hsl(210, 100%, 50%)"
              stackId="a"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const ReportsPage = () => {
  // Usar el hook personalizado
  const {
    dailySummary,
    chartData,
    accounts,
    transactions,
    loading,
    error,
    timeRange,
    loadAllData,
    updateTimeRange,
    clearError
  } = useStats();

  // Cargar datos al montar el componente
  useEffect(() => {
    loadAllData();
  }, []);

  // Manejar cambio de rango de tiempo
  const handleTimeRangeChange = (newTimeRange) => {
    updateTimeRange(newTimeRange);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Cargando reportes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-400 text-xl">
          Error: {error}
          <button 
            onClick={clearError}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Reportes y Análisis</h1>
      
      {/* Resumen del día */}
      {dailySummary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Depósitos Hoy</p>
                <p className="text-2xl font-bold text-green-400">Q {dailySummary.deposits.toLocaleString()}</p>
              </div>
              <ArrowUp className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Compras Hoy</p>
                <p className="text-2xl font-bold text-red-400">Q {dailySummary.purchases.toLocaleString()}</p>
              </div>
              <ArrowDown className="w-8 h-8 text-red-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Transferencias Hoy</p>
                <p className="text-2xl font-bold text-blue-400">Q {dailySummary.transfers.toLocaleString()}</p>
              </div>
              <Filter className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Transacciones</p>
                <p className="text-2xl font-bold text-white">{dailySummary.count}</p>
              </div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{dailySummary.count}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <ChartAreaInteractive 
        chartData={chartData} 
        timeRange={timeRange} 
        setTimeRange={handleTimeRangeChange} 
      />
      
      {/* Cuentas con más movimientos */}
      {accounts.length > 0 && (
        <div className="bg-gray-800 rounded-lg shadow p-6 mb-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Cuentas con Más Movimientos</h2>
            <button className="flex items-center text-gray-400 hover:text-white">
              <Filter className="w-5 h-5 mr-2" />
              Filtrar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Transacciones</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Monto Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Última Transacción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Tendencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {accounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-white">{account.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{account.transactions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">Q {account.totalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300 text-sm">{account.lastTransaction}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {account.trend === 'up' ? (
                        <ArrowUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <ArrowDown className="w-5 h-5 text-red-400" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Historial de transacciones */}
      {transactions.length > 0 && (
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Historial de Transacciones Recientes</h2>
            <button className="flex items-center text-gray-400 hover:text-white">
              <Filter className="w-5 h-5 mr-2" />
              Filtrar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Cuenta Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Monto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'Depósito' ? 'bg-green-500/20 text-green-400' :
                        transaction.type === 'Compra' ? 'bg-red-500/20 text-red-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{transaction.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300 text-sm">
                      {transaction.clientAccount || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">Q {transaction.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300 text-sm">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'Completado' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;