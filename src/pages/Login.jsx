import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Aquí deberías hacer la llamada a tu API de autenticación
      // Por ahora, simularemos una autenticación exitosa
      const response = { token: 'dummy-token' }; // Simulación de respuesta de API

      // Guardar el token en localStorage
      localStorage.setItem('token', response.token);

      // Redirigir al usuario a la página que intentaba acceder o al dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Credenciales inválidas. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#0F1114"/>
              <path d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6ZM20.4287 16C20.4287 18.4501 18.4501 20.4287 16 20.4287C13.5499 20.4287 11.5713 18.4501 11.5713 16C11.5713 13.5499 13.5499 11.5713 16 11.5713C18.4501 11.5713 20.4287 13.5499 20.4287 16Z" fill="#3DD9C9"/>
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Bienvenido a Nova Bank
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-500/10 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Correo electrónico
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Contraseña
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-10 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-primary focus:ring-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary/90">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-400">¿No tienes una cuenta? </span>
            <Link to="/register" className="font-medium text-primary hover:text-primary/90">
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 