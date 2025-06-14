import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeftRight, ShoppingBag, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Usuarios",
      value: "1,234",
      icon: Users,
      description: "Usuarios activos en la plataforma",
      color: "text-[#3DD9C9]",
      gradient: "from-[#3DD9C9]/10 to-[#3DD9C9]/5",
      borderColor: "border-[#3DD9C9]/20"
    },
    {
      title: "Transacciones",
      value: "45.2K",
      icon: ArrowLeftRight,
      description: "Transacciones procesadas",
      color: "text-[#FF7E5F]",
      gradient: "from-[#FF7E5F]/10 to-[#FF7E5F]/5",
      borderColor: "border-[#FF7E5F]/20"
    },
    {
      title: "Productos Activos",
      value: "89",
      icon: ShoppingBag,
      description: "Productos y servicios disponibles",
      color: "text-[#3DD9C9]",
      gradient: "from-[#3DD9C9]/10 to-[#3DD9C9]/5",
      borderColor: "border-[#3DD9C9]/20"
    },
    {
      title: "Ingresos Totales",
      value: "$234.5K",
      icon: DollarSign,
      description: "Ingresos generados este mes",
      color: "text-[#FF7E5F]",
      gradient: "from-[#FF7E5F]/10 to-[#FF7E5F]/5",
      borderColor: "border-[#FF7E5F]/20"
    }
  ];

  // Datos de ejemplo para el gráfico
  const transactionData = [
    { name: 'Ene', transacciones: 4000 },
    { name: 'Feb', transacciones: 3000 },
    { name: 'Mar', transacciones: 5000 },
    { name: 'Abr', transacciones: 2780 },
    { name: 'May', transacciones: 1890 },
    { name: 'Jun', transacciones: 2390 },
    { name: 'Jul', transacciones: 3490 },
    { name: 'Ago', transacciones: 4000 },
    { name: 'Sep', transacciones: 3200 },
    { name: 'Oct', transacciones: 2800 },
    { name: 'Nov', transacciones: 4300 },
    { name: 'Dic', transacciones: 5100 },
  ];

  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-white">Panel de Administración</h1>
      
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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
                data={transactionData}
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