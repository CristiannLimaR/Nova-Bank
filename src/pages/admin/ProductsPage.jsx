import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const ProductsPage = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Cuenta de Ahorros',
      description: 'Cuenta de ahorros con intereses',
      price: 0,
      status: 'Activo'
    },
    {
      id: 2,
      name: 'Tarjeta de Crédito',
      description: 'Tarjeta de crédito con beneficios exclusivos',
      price: 100,
      status: 'Activo'
    },
    // Más productos de ejemplo...
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Gestión de Productos/Servicios</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary/90">
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Producto
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{product.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-300">{product.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {product.price === 0 ? 'Gratis' : `Q ${product.price.toFixed(2)}`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/20 text-green-400">
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-3">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage; 