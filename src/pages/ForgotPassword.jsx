import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/Button';
import { toast } from 'sonner';
import { forgotPassword as callForgotPasswordApi } from '../services/api'; 

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      const response = await callForgotPasswordApi({ 
        email: data.email
      });

      if (!response.error) {
        toast.success(response.data.msg || 'Se ha enviado un correo con instrucciones para restablecer tu contraseña.');
        navigate('/login'); 
      } else {
        toast.error(response.e.msg || 'Error al procesar la solicitud.');
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
            Recuperar Contraseña
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Ingresa tu correo electrónico para recibir instrucciones de recuperación.
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
          </div>

          <div>
            <Button type="submit" className="w-full">
              Enviar Instrucciones
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