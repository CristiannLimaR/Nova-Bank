import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeftRight, ShoppingBag, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStats } from '../../shared/hooks/useStats';

const AdminDashboard = () => {
  const {
    systemStats,
    activeProductsCount,
    chartData,
    loading,
    error,
    loadAllData,
    monthlyTransactionCounts,
    loadMonthlyTransactionCounts
  } = useStats();

  useEffect(() => {
    loadAllData();
    loadMonthlyTransactionCounts();
    // eslint-disable-next-line
  }, []);

  const statCards = [
    {
      title: "Total Usuarios",
      value: systemStats ? systemStats.activeUsers : '...',
      icon: Users,
      description: "Usuarios activos en la plataforma",
      color: "text-[#3DD9C9]",
      gradient: "from-[#3DD9C9]/10 to-[#3DD9C9]/5",
      borderColor: "border-[#3DD9C9]/20"
    },
    {
      title: "Transacciones",
      value: systemStats ? systemStats.monthTransactions : '...',
      icon: ArrowLeftRight,
      description: "Transacciones procesadas este mes",
      color: "text-[#FF7E5F]",
      gradient: "from-[#FF7E5F]/10 to-[#FF7E5F]/5",
      borderColor: "border-[#FF7E5F]/20"
    },
    {
      title: "Productos Activos",
      value: activeProductsCount !== null ? activeProductsCount : '...',
      icon: ShoppingBag,
      description: "Productos y servicios disponibles",
      color: "text-[#3DD9C9]",
      gradient: "from-[#3DD9C9]/10 to-[#3DD9C9]/5",
      borderColor: "border-[#3DD9C9]/20"
    },
    {
      title: "Ingresos Totales",
      value: systemStats ? `$${systemStats.monthTotal.toLocaleString()}` : '...',
      icon: DollarSign,
      description: "Ingresos generados este mes",
      color: "text-[#FF7E5F]",
      gradient: "from-[#FF7E5F]/10 to-[#FF7E5F]/5",
      borderColor: "border-[#FF7E5F]/20"
    }
  ];

  // Agrupar datos del gráfico por mes del último año
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  // Creamos un array de 12 meses para el gráfico
  const chartByMonth = Array(12).fill(0).map((_, i) => ({
    name: months[i],
    transacciones: 0
  }));
  if (monthlyTransactionCounts && monthlyTransactionCounts.length > 0) {
    monthlyTransactionCounts.forEach(item => {
      // item.month es 1-based (1=Enero)
      chartByMonth[item.month - 1].transacciones = item.count;
    });
  }

  // Debug: mostrar el valor de chartData
  console.log('chartData:', chartData);

  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-white">Panel de Administración</h1>
      {loading ? (
        <div className="text-white">Cargando datos...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <Card key={index} className={`bg-gradient-to-br ${stat.gradient} border ${stat.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-900`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-gray-400">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gráfico de Transacciones */}
          <Card className="mb-8 bg-gray-900 border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Transacciones Mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartByMonth}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-700" />
                    <XAxis 
                      dataKey="name" 
                      className="text-sm"
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <YAxis 
                      className="text-sm"
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem',
                        color: '#F3F4F6',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                      }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="transacciones"
                      stroke="#3DD9C9"
                      strokeWidth={2}
                      dot={{ fill: '#3DD9C9', strokeWidth: 2 }}
                      activeDot={{ r: 8, fill: '#3DD9C9' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Accesos Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#3DD9C9]/10 rounded-lg">
                <Users className="h-6 w-6 text-[#3DD9C9]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Gestión de Usuarios</h3>
                <p className="text-sm text-gray-400">Administrar usuarios y permisos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#FF7E5F]/10 rounded-lg">
                <ArrowLeftRight className="h-6 w-6 text-[#FF7E5F]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Transacciones</h3>
                <p className="text-sm text-gray-400">Ver y gestionar transacciones</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#3DD9C9]/10 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-[#3DD9C9]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Productos</h3>
                <p className="text-sm text-gray-400">Gestionar productos y servicios</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#FF7E5F]/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-[#FF7E5F]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Reportes</h3>
                <p className="text-sm text-gray-400">Ver reportes y análisis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard; 