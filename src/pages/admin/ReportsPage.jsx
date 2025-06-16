import { useState } from 'react';
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

export const description = "An interactive area chart with daily data"

// Datos diarios simulados - últimos 365 días
const generateDailyData = () => {
  const data = [];
  const today = new Date(); // Fecha actual dinámica
  
  for (let i = 91; i >= 0; i--) {
    const date = subDays(today, i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Menos actividad en fines de semana
    const weekendMultiplier = isWeekend ? 0.3 : 1;
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      deposit: Math.floor((Math.random() * 5000 + 1000) * weekendMultiplier),
      purchase: Math.floor((Math.random() * 2000 + 100) * weekendMultiplier),
      transfer: Math.floor((Math.random() * 3000 + 200) * weekendMultiplier),
    });
  }
  
  return data;
};

const chartData = generateDailyData();

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

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("7d")

  const filteredData = React.useMemo(() => {
    const today = new Date(2025, 5, 15); // 15 de junio de 2025
    let startDate;
    
    switch(timeRange) {
      case "365d":
        startDate = subDays(today, 365);
        break;
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
  }, [timeRange]);

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
            <SelectItem value="365d" className="rounded-lg text-white hover:bg-gray-700">
              Último año
            </SelectItem>
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
  const [accounts] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      transactions: 156,
      totalAmount: 45000.00,
      trend: 'up',
      lastTransaction: '2025-06-15 09:30'
    },
    {
      id: 2,
      name: 'María García',
      transactions: 89,
      totalAmount: 32500.00,
      trend: 'down',
      lastTransaction: '2025-06-14 16:45'
    },
    {
      id: 3,
      name: 'Carlos López',
      transactions: 203,
      totalAmount: 67800.00,
      trend: 'up',
      lastTransaction: '2025-06-15 11:20'
    },
    {
      id: 4,
      name: 'Ana Martínez',
      transactions: 67,
      totalAmount: 19800.00,
      trend: 'up',
      lastTransaction: '2025-06-13 14:15'
    },
    {
      id: 5,
      name: 'Roberto Silva',
      transactions: 124,
      totalAmount: 38900.00,
      trend: 'down',
      lastTransaction: '2025-06-15 08:10'
    }
  ]);

  const [transactions] = useState([
    {
      id: 1,
      type: 'Depósito',
      amount: 3500.00,
      date: '2025-06-15 14:30',
      status: 'Completado',
      client: 'Juan Pérez'
    },
    {
      id: 2,
      type: 'Transferencia',
      amount: 1200.00,
      date: '2025-06-15 13:45',
      status: 'Completado',
      client: 'María García'
    },
    {
      id: 3,
      type: 'Compra',
      amount: 850.00,
      date: '2025-06-15 12:20',
      status: 'Completado',
      client: 'Carlos López'
    },
    {
      id: 4,
      type: 'Depósito',
      amount: 2200.00,
      date: '2025-06-15 11:15',
      status: 'Pendiente',
      client: 'Ana Martínez'
    },
    {
      id: 5,
      type: 'Transferencia',
      amount: 5500.00,
      date: '2025-06-15 10:30',
      status: 'Completado',
      client: 'Roberto Silva'
    },
    {
      id: 6,
      type: 'Compra',
      amount: 320.00,
      date: '2025-06-15 09:45',
      status: 'Completado',
      client: 'Juan Pérez'
    },
    {
      id: 7,
      type: 'Depósito',
      amount: 1800.00,
      date: '2025-06-14 16:20',
      status: 'Completado',
      client: 'María García'
    },
    {
      id: 8,
      type: 'Transferencia',
      amount: 950.00,
      date: '2025-06-14 15:10',
      status: 'Completado',
      client: 'Carlos López'
    }
  ]);

  // Calcular totales del día
  const todayTotals = React.useMemo(() => {
    const today = '2025-06-15';
    const todayTransactions = transactions.filter(t => t.date.startsWith(today));
    
    return {
      deposits: todayTransactions.filter(t => t.type === 'Depósito').reduce((sum, t) => sum + t.amount, 0),
      purchases: todayTransactions.filter(t => t.type === 'Compra').reduce((sum, t) => sum + t.amount, 0),
      transfers: todayTransactions.filter(t => t.type === 'Transferencia').reduce((sum, t) => sum + t.amount, 0),
      total: todayTransactions.reduce((sum, t) => sum + t.amount, 0),
      count: todayTransactions.length
    };
  }, [transactions]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Reportes y Análisis</h1>
      
      {/* Resumen del día */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Depósitos Hoy</p>
              <p className="text-2xl font-bold text-green-400">Q {todayTotals.deposits.toLocaleString()}</p>
            </div>
            <ArrowUp className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Compras Hoy</p>
              <p className="text-2xl font-bold text-red-400">Q {todayTotals.purchases.toLocaleString()}</p>
            </div>
            <ArrowDown className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Transferencias Hoy</p>
              <p className="text-2xl font-bold text-blue-400">Q {todayTotals.transfers.toLocaleString()}</p>
            </div>
            <Filter className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Transacciones</p>
              <p className="text-2xl font-bold text-white">{todayTotals.count}</p>
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{todayTotals.count}</span>
            </div>
          </div>
        </div>
      </div>

      <ChartAreaInteractive />
      
      {/* Cuentas con más movimientos */}
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

      {/* Historial de transacciones */}
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
    </div>
  );
};

export default ReportsPage;