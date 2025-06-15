import { useState } from 'react';
import { Plus, Search, Edit, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserForm from '@/components/forms/UserForm';
import useUsers from "@/shared/hooks/useUsers";

const UsersPage = () => {
  const [users, setUsers] = useState([
    {
      _id: "6844446cf43bdae67e078546",
      name: "Cristian Lima",
      username: "CristiannLima",
      dpi: 3875205380101,
      address: "6ta calle 19-63 sector 7 alamedas de santa clara zona 3, Villa Nueva",
      phone: 51380497,
      email: "cristiannlima2@gmail.com",
      role: "USER_ROLE",
      monthlyIncome: 100,
      status: true,
      accountType: "AHORRO"
    }
  ]);

const [editingUser, setEditingUser] = useState(null);
const [isCreating, setIsCreating] = useState(false);
const { addUser, editUser, loading } = useUsers();

  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  const handleCreate = () => {
    setEditingUser({
      name: "",
      username: "",
      dpi: "",
      address: "",
      phone: "",
      email: "",
      role: "USER_ROLE",
      monthlyIncome: 0,
      status: true,
      accountType: "AHORRO"
    });
    setIsCreating(true);
  };

  const handleSave = (data) => {
    console.log('Datos del usuario:', data);
    if(isCreating){
      console.log('creando', data) //funcion de hook para agregar
    }else{
      console.log('editando', data) // funcion de hook para editar id
    }
    setEditingUser(null);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setIsCreating(false);
  };

  const UserDetails = ({ user }) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-400">Nombre</h4>
            <p className="text-white">{user.name}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400">Usuario</h4>
            <p className="text-white">{user.username}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400">DPI</h4>
            <p className="text-white">{user.dpi}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400">Teléfono</h4>
            <p className="text-white">{user.phone}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400">Email</h4>
            <p className="text-white">{user.email}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400">Rol</h4>
            <p className="text-white">{user.role}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400">Ingreso Mensual</h4>
            <p className="text-white">Q {user.monthlyIncome.toFixed(2)}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400">Estado</h4>
            <p className="text-white">{user.status ? 'Activo' : 'Inactivo'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400">Tipo de Cuenta</h4>
            <p className="text-white">{user.accountType}</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-400">Dirección</h4>
          <p className="text-white">{user.address}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Gestión de Usuarios</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="text-white px-4 py-2 rounded-lg flex items-center"
              onClick={handleCreate}
            >
              <Plus className="w-5 h-5 mr-2" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {isCreating ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
              </DialogTitle>
            </DialogHeader>
            {editingUser && (
              <UserForm
                user={editingUser}
                onSave={handleSave}
                onCancel={handleCancel}
                setEditingUser={setEditingUser}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Ingreso Mensual
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
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.username}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">Q {user.monthlyIncome.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {user.status ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="mr-3 text-indigo-400 hover:text-indigo-300">
                        <Eye className="w-5 h-5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 text-white border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Detalles del Usuario</DialogTitle>
                      </DialogHeader>
                      <UserDetails user={user} />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button 
                        className="text-indigo-400 hover:text-indigo-300"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 text-white border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Editar Usuario</DialogTitle>
                      </DialogHeader>
                      {editingUser && (
                        <UserForm
                          user={editingUser}
                          onSave={handleSave}
                          onCancel={handleCancel}
                          setEditingUser={setEditingUser}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage; 