import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { toast } from 'sonner';
import { forgotPassword as callForgotPasswordApi } from '../services/api'; 

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const newPassword = watch('newPassword', '');
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      const response = await callForgotPasswordApi({ 
        email: data.email,
        username: data.username,
        phone: data.phone,
        newPassword: data.newPassword,
      });

      if (!response.error) {
        toast.success(response.data.msg || 'Contraseña restablecida con éxito.');
        navigate('/login'); 
      } else {
        toast.error(response.e.msg || 'Error al restablecer la contraseña.');
      }
    } catch (error) {
      console.error('Error en el frontend al enviar solicitud:', error);
      toast.error('Ocurrió un error inesperado. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Restablecer Contraseña
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Ingresa tus datos para verificar tu identidad y establecer una nueva contraseña.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <div className="relative mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Formato de email inválido',
                    },
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-3 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="email@ejemplo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Campo Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                Nombre de Usuario
              </label>
              <div className="relative mt-1">
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  {...register('username', {
                    required: 'El nombre de usuario es requerido',
                    minLength: {
                      value: 3,
                      message: 'Debe tener al menos 3 caracteres',
                    },
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-3 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="tu_usuario"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
                )}
              </div>
            </div>

            {/* Campo Teléfono */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-400">
                Teléfono
              </label>
              <div className="relative mt-1">
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  {...register('phone', {
                    required: 'El número de teléfono es requerido',
                    pattern: {
                        value: /^[0-9]+$/,
                        message: 'Solo se permiten números'
                    },
                    minLength: {
                      value: 8,
                      message: 'Debe tener al menos 8 dígitos',
                    },
                    maxLength: {
                      value: 15,
                      message: 'No debe exceder 15 dígitos',
                    },
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-3 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="Ej: 55551234"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Campo Nueva Contraseña */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400">
                Nueva Contraseña
              </label>
              <div className="relative mt-1">
                <input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  {...register('newPassword', {
                    required: 'La nueva contraseña es requerida',
                    minLength: {
                      value: 6,
                      message: 'La contraseña debe tener al menos 6 caracteres',
                    },
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-3 pr-10 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
                )}
              </div>
            </div>

            {/* Campo Confirmar Nueva Contraseña */}
            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-400">
                Confirmar Nueva Contraseña
              </label>
              <div className="relative mt-1">
                <input
                  id="confirmNewPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmNewPassword', {
                    required: 'Confirma tu nueva contraseña',
                    validate: value =>
                      value === newPassword || 'Las contraseñas no coinciden',
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-3 pr-10 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {errors.confirmNewPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmNewPassword.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Restablecer Contraseña
            </Button>
          </div>

          <div className="text-center text-sm ">
            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;