import React from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import { useRegister } from "../shared/hooks/useRegister";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      username: "",
      dpi: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      work: "",
      monthlyIncome: "",
    },
  });

  const password = watch("password");

  const passwordValidation = {
    required: "La contraseña es requerida",
    minLength: {
      value: 8,
      message: "La contraseña debe tener al menos 8 caracteres",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
    },
  };

  const confirmPasswordValidation = {
    required: "Por favor confirma tu contraseña",
    validate: {
      matchesPassword: (value) =>
        value === password || "Las contraseñas no coinciden",
    },
  };

  const onSubmit = async (data) => {
    registerUser(data)
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
            <svg
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#0F1114" />
              <path
                d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6ZM20.4287 16C20.4287 18.4501 18.4501 20.4287 16 20.4287C13.5499 20.4287 11.5713 18.4501 11.5713 16C11.5713 13.5499 13.5499 11.5713 16 11.5713C18.4501 11.5713 20.4287 13.5499 20.4287 16Z"
                fill="#3DD9C9"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Ingresa tus datos para registrarte
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400"
              >
                Nombre completo
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  {...register("name", {
                    required: "El nombre es requerido",
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener al menos 3 caracteres",
                    },
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="Juan Pérez"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-400"
              >
                Nombre de usuario
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  {...register("username", {
                    required: "El nombre de usuario es requerido",
                    minLength: {
                      value: 4,
                      message:
                        "El nombre de usuario debe tener al menos 4 caracteres",
                    },
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="juanperez"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="dpi"
                className="block text-sm font-medium text-gray-400"
              >
                DPI
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="dpi"
                  type="number"
                  {...register("dpi", {
                    required: "El DPI es requerido",
                    minLength: {
                      value: 13,
                      message: "El DPI debe tener 13 dígitos",
                    },
                    maxLength: {
                      value: 13,
                      message: "El DPI debe tener 13 dígitos",
                    },
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="1234567891"
                />
              </div>
              {errors.dpi && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.dpi.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-400"
              >
                Dirección
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="address"
                  {...register("address", {
                    required: "La dirección es requerida",
                    minLength: {
                      value: 5,
                      message: "La dirección debe tener al menos 5 caracteres",
                    },
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="Dirección completa"
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-400"
              >
                Teléfono
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "El teléfono es requerido",
                    pattern: {
                      value: /^[0-9]{8}$/,
                      message: "El teléfono debe tener 8 dígitos",
                    },
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="12345678"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Correo electrónico
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "El correo electrónico es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Correo electrónico inválido",
                    },
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="tu@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                Contraseña
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register("password", passwordValidation)}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-400"
              >
                Confirmar Contraseña
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", confirmPasswordValidation)}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="work"
                className="block text-sm font-medium text-gray-400"
              >
                Ocupación
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="work"
                  {...register("work", {
                    required: "La ocupación es requerida",
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="Desarrollador"
                />
              </div>
              {errors.work && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.work.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="monthlyIncome"
                className="block text-sm font-medium text-gray-400"
              >
                Ingreso mensual
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="monthlyIncome"
                  type="number"
                  {...register("monthlyIncome", {
                    required: "El ingreso mensual es requerido",
                    min: {
                      value: 100,
                      message: "Debes tener un minimo de Q100 de ingreso",
                    },
                  })}
                  className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="5000"
                />
              </div>
              {errors.monthlyIncome && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.monthlyIncome.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={!isValid}>
              Registrarse
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-400">¿Ya tienes una cuenta? </span>
            <a
              href="/login"
              className="font-medium text-primary hover:text-primary/90"
            >
              Inicia sesión aquí
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
