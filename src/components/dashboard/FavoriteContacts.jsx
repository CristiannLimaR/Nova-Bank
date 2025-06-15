// components/FavoriteContacts.jsx
import React, { useState, useEffect } from 'react';
import { User, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import useAuthStore from '../../shared/stores/authStore';

const FavoriteContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        console.log(user.favorites);
        setContacts(user.favorites);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="rounded-lg bg-gray-900 p-5">
      <h2 className="mb-4 text-lg font-semibold text-white">Contactos Favoritos</h2>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact._id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
                {contact.avatar ? (
                  <img
                    src={contact.avatar}
                    alt={contact.alias}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{contact.alias}</p>
                <p className="text-xs text-gray-400">{contact.account.accountNo}</p>
              </div>
            </div>
            <Button variant="default" size="sm">
              SEND
            </Button>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full flex items-center justify-center space-x-2 rounded-md bg-gray-800 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors">
        <span>Ver todos</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FavoriteContacts;
