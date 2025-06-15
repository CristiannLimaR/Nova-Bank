import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Star, Send, X } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../shared/stores/authStore';
import useAccount from '../shared/hooks/useAccount';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const Contacts = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { searchAccount } = useAccount();
  const contacts = user.favorites || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferNote, setTransferNote] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    accountNo: '',
    alias: ''
  });
  const [isSearching, setIsSearching] = useState(false);
  const [foundUser, setFoundUser] = useState(null);

  const handleSearchAccount = async () => {
    const accountNo = newContact.accountNo;
    if (!accountNo || accountNo.length !== 10) {
      toast.error("Error", {
        description: "Ingresa un número de cuenta válido de 10 caracteres",
      });
      return;
    }

    setIsSearching(true);
    const response = await searchAccount(accountNo);
    setIsSearching(false);

    if (response.error) {
      toast.error("Error", {
        description: "No se encontró la cuenta",
      });
      setFoundUser(null);
      return;
    }

    setFoundUser(response.user);
    toast.success("Cuenta encontrada", {
      description: `Usuario: ${response.user.name}`,
    });
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    if (!foundUser) {
      toast.error("Error", {
        description: "Debes buscar y validar la cuenta primero",
      });
      return;
    }

    try {
      // Aquí iría la llamada a la API para agregar el contacto
      console.log('Nuevo contacto:', { ...newContact, foundUser });
      setIsAddContactModalOpen(false);
      setNewContact({
        accountNo: '',
        alias: ''
      });
      setFoundUser(null);
      toast.success("Contacto agregado", {
        description: "El contacto se ha agregado correctamente",
      });
    } catch (error) {
      console.error('Error al agregar contacto:', error);
      toast.error("Error", {
        description: "No se pudo agregar el contacto",
      });
    }
  };

  const handleQuickTransfer = () => {
    if (!transferAmount || !twoFactorCode) {
      return;
    }

    navigate('/new-transaction', {
      state: {
        destinationAccount: selectedContact.account.accountNumber,
        amount: transferAmount,
        comment: transferNote,
        twoFactorCode: twoFactorCode,
        foundUser: {
          name: selectedContact.alias,
          email: selectedContact.account.email
        }
      }
    });
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.alias.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-white">Contactos</h1>
        <Button 
          leftIcon={<Plus size={16} />} 
          size="sm"
          onClick={() => setIsAddContactModalOpen(true)}
        >
          Agregar Nuevo Contacto
        </Button>
      </div>

      <Dialog open={isAddContactModalOpen} onOpenChange={setIsAddContactModalOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Agregar Nuevo Contacto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddContact} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountNo">Número de Cuenta</Label>
                <div className="flex gap-2">
                  <Input
                    id="accountNo"
                    value={newContact.accountNo}
                    onChange={(e) => setNewContact({ ...newContact, accountNo: e.target.value })}
                    placeholder="Ingrese el número de cuenta"
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Button
                    type="button"
                    onClick={handleSearchAccount}
                    disabled={isSearching}
                    className="whitespace-nowrap"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {isSearching ? "Buscando..." : "Buscar"}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alias">Alias</Label>
                <Input
                  id="alias"
                  value={newContact.alias}
                  onChange={(e) => setNewContact({ ...newContact, alias: e.target.value })}
                  placeholder="Ingrese un alias para el contacto"
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            {foundUser && (
              <div className="rounded-lg bg-gray-700 p-4">
                <p className="text-white font-medium">{foundUser.name}</p>
                <p className="text-sm text-gray-400">{foundUser.email}</p>
              </div>
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button 
                  variant="destructive" 
                  className="mr-2"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">
                Agregar Contacto
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar contactos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-md border-0 bg-gray-800 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="h-[calc(100vh-12rem)] space-y-2 overflow-y-auto rounded-lg bg-gray-900 p-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => setSelectedContact(contact)}
                className={`cursor-pointer rounded-lg p-3 hover:bg-gray-800 ${
                  selectedContact?._id === contact._id ? 'bg-gray-800' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{contact.alias}</p>
                      <p className="text-xs text-gray-400">{contact.account.accountType}</p>
                    </div>
                  </div>
                  <button className="rounded-full p-1 text-yellow-400">
                    <Star className="h-4 w-4" fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          {selectedContact && (
            <div className="rounded-lg bg-gray-900 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-white">{selectedContact.alias}</h2>
                    <p className="text-sm text-gray-400">{selectedContact.account.bank}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-gray-800 p-4">
                  <p className="text-sm text-gray-400">Número de Cuenta</p>
                  <p className="text-md font-medium text-white">{selectedContact.account.accountNo}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium text-white">Transferencia Rápida</h3>
                <div className="rounded-lg bg-gray-800 p-4">
                  <div className="mb-4">
                    <p className="mb-2 text-sm text-gray-400">Monto</p>
                    <div className="flex">
                      <span className="inline-flex items-center rounded-l-md border-r border-gray-700 bg-gray-700 px-3 text-gray-200">
                        Q
                      </span>
                      <input
                        type="text"
                        placeholder="0.00"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className="w-full rounded-r-md border-0 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="mb-2 text-sm text-gray-400">Nota (Opcional)</p>
                    <input
                      type="text"
                      placeholder="¿Para qué es esta transferencia?"
                      value={transferNote}
                      onChange={(e) => setTransferNote(e.target.value)}
                      className="w-full rounded-md border-0 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="mb-4">
                    <p className="mb-2 text-sm text-gray-400">Código de Verificación 2FA</p>
                    <input
                      type="text"
                      placeholder="Ingresa el código de 6 dígitos"
                      maxLength="6"
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value)}
                      className="w-full rounded-md border-0 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    leftIcon={<Send size={16} />}
                    onClick={handleQuickTransfer}
                  >
                    Enviar Dinero
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts; 