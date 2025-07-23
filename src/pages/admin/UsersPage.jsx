import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Eye, Wallet } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UserEditForm from '@/components/forms/UserEditForm';
import useUsers from "@/shared/hooks/useUsers";
import useAccount from "@/shared/hooks/useAccount";
import { getTransactionsByAccountId } from '@/services/api';


const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { fetchUsers, loading, addUser, editUser } = useUsers();
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const { getAccountByUserId } = useAccount();
  const [accountDetails, setAccountDetails] = useState(null);
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletTransactions, setWalletTransactions] = useState([]);
  

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setIsCreating(false);
  };

  const fetchUsersData = async () => {
    const users = await fetchUsers();
    setUsers(users);
  };

  useEffect(() => {
    
    fetchUsersData();
  }, []);

  const handleCreate = () => {
    setEditingUser({
      name: "",
      username: "",
      password: "",
      dpi: "",
      address: "",
      phone: "",
      email: "",
      role: "USER_ROLE",
      monthlyIncome: 0,
      status: true,
      accountType: ""
    });
    setIsCreating(true);
  };

  const handleSave = (data) => {
    console.log('Datos del usuario:', data);
    if(isCreating){
      addUser(data);
      fetchUsersData();
    }else{
      editUser(data._id, data);
      fetchUsersData();
    }
    setEditingUser(null);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setIsCreating(false);
  };

  const handleWalletClick = async (userId) => {
    setWalletDialogOpen(true);
    setWalletLoading(true);
    setAccountDetails(null);
    setWalletTransactions([]);
    const res = await getAccountByUserId(userId);
    if (!res.error && res.account) {
      setAccountDetails(res.account);
      // Obtener movimientos
      const txRes = await getTransactionsByAccountId(res.account.accountNo);
      if (!txRes.error && txRes.data.transactions) {
        console.log(txRes)
        setWalletTransactions(txRes.data.transactions.slice(0, 5));
      }
    }
    setWalletLoading(false);
  };

  const AccountDetails = ({ account, transactions }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-400">No. de Cuenta</h4>
          <p className="text-white">{account.accountNo}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-400">Tipo</h4>
          <p className="text-white">{account.accountType}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-400">Saldo</h4>
          <p className="text-white">Q {account.balance?.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-400">Estado</h4>
          <p className="text-white">{account.status ? 'Activa' : 'Inactiva'}</p>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-400 mb-2">Últimos 5 movimientos</h4>
        {transactions.length === 0 ? (
          <p className="text-gray-400">No hay movimientos recientes.</p>
        ) : (
          <ul className="divide-y divide-gray-700">
            {transactions.map((tx) => (
              <li key={tx._id} className="py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-white">{tx.type}</span>
                    <span className="ml-2 text-gray-400 text-xs">{new Date(tx.createdAt).toLocaleString('es-GT')}</span>
                    <div className="text-gray-300 text-xs">{tx.description || 'Sin descripción'}</div>
                  </div>
                  <div className={`font-bold ${tx.type === 'DEPOSIT' ? 'text-green-400' : 'text-red-400'}`}>{tx.type === 'DEPOSIT' ? '+' : '-'} Q{Math.abs(tx.amount).toFixed(2)}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

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
            {editingUser && isCreating && (
              <UserEditForm
                user={editingUser}
                onSave={handleSave}
                onCancel={handleCancel}
                setEditingUser={setEditingUser}
                isCreating={isCreating}
              />
            )}
            {editingUser && !isCreating && (
              <UserEditForm
                user={editingUser}
                onSave={handleSave}
                onCancel={handleCancel}
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
      <div className="bg-gray-800 rounded-lg shadow overflow-x-auto">
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
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-40">
                Acciones
              </th>
              
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap max-w-[10rem] truncate">
                  <div className="text-sm font-medium text-white truncate">{user.name}</div>
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={`${user.role === 'ADMIN_ROLE' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}	>{user.role}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-40">
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
                  {/* Botón billetera */}
                  <Dialog open={walletDialogOpen} onOpenChange={setWalletDialogOpen}>
                    <DialogTrigger asChild>
                      <button 
                        className="mr-3 text-green-400 hover:text-green-300"
                        onClick={() => handleWalletClick(user._id)}
                        title="Ver cuenta bancaria"
                      >
                        <Wallet className="w-5 h-5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 text-white border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Cuenta Bancaria</DialogTitle>
                      </DialogHeader>
                      {walletLoading ? (
                        <div className="text-center text-gray-400">Cargando...</div>
                      ) : accountDetails ? (
                        <AccountDetails account={accountDetails} transactions={walletTransactions} />
                      ) : (
                        <div className="text-center text-red-400">No se pudo cargar la información de la cuenta.</div>
                      )}
                    </DialogContent>
                  </Dialog>
                  {/* Fin botón billetera */}
                  {user.role !== 'ADMIN_ROLE' && (
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
                        {editingUser && !isCreating && (
                          <UserEditForm
                            user={editingUser}
                            onSave={handleSave}
                            onCancel={handleCancel}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  )}
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