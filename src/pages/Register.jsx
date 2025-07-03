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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/ui/Button";
import { useRegister } from "../shared/hooks/useRegister";
import useValidations from "../shared/hooks/useValidations";

// Esquema de validación para el formulario de registro
const registerSchema = z.object({
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  username: z.string()
    .min(4, 'El nombre de usuario debe tener al menos 4 caracteres')
    .max(50, 'El nombre de usuario no puede exceder 50 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Solo se permiten letras, números y guiones bajos'),
  dpi: z.string()
    .length(13, 'El DPI debe tener exactamente 13 dígitos')
    .regex(/^\d+$/, 'El DPI solo debe contener números'),
  address: z.string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(200, 'La dirección no puede exceder 200 caracteres'),
  phone: z.string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(15, 'El teléfono no puede exceder 15 dígitos')
    .regex(/^\d+$/, 'El teléfono solo debe contener números'),
  email: z.string()
    .email('Formato de email inválido')
    .min(1, 'El email es requerido')
    .max(100, 'El email no puede exceder 100 caracteres'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: z.string()
    .min(1, 'Por favor confirma tu contraseña'),
  work: z.string()
    .min(2, 'El trabajo debe tener al menos 2 caracteres')
    .max(100, 'El trabajo no puede exceder 100 caracteres'),
  monthlyIncome: z.string()
    .min(1, 'El ingreso mensual es requerido')
    .regex(/^\d+(\.\d{1,2})?$/, 'El ingreso mensual debe ser un número válido')
    .refine((val) => parseFloat(val) > 100, 'El ingreso mensual debe ser mayor a 100'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useRegister();
  const { validateExistUser } = useValidations();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(registerSchema),
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
  const email = watch("email");
  const dpi = watch("dpi");

  // Debounce utilitario
  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const debouncedValidateEmail = React.useRef();
  const debouncedValidateDPI = React.useRef();

  React.useEffect(() => {
    debouncedValidateEmail.current = debounce(async (emailValue) => {
      if (emailValue && emailValue.includes('@')) {
        const exists = await validateExistUser({ email: emailValue });
        if (exists.exists) {
          setError("email", {
            type: "manual",
            message: "El email ya está en uso"
          });
        } else {
          clearErrors("email");
        }
      }
    }, 500);
  }, [validateExistUser, setError, clearErrors]);

  React.useEffect(() => {
    debouncedValidateDPI.current = debounce(async (dpiValue) => {
      if (dpiValue && dpiValue.length === 13) {
        const exists = await validateExistUser({ dpi: dpiValue });
        if (exists.exists) {
          setError("dpi", {
            type: "manual",
            message: "El DPI ya está en uso"
          });
        } else {
          clearErrors("dpi");
        }
      }
    }, 500);
  }, [validateExistUser, setError, clearErrors]);

  React.useEffect(() => {
    if (debouncedValidateEmail.current) {
      debouncedValidateEmail.current(email);
    }
  }, [email]);

  React.useEffect(() => {
    if (debouncedValidateDPI.current) {
      debouncedValidateDPI.current(dpi);
    }
  }, [dpi]);

  const onSubmit = async (data) => {
    registerUser(data)
  };

  // Para depuración
  console.log(errors);

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
                  {...register("name")}
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
                  {...register("username")}
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
                  {...register("dpi")}
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
                  {...register("address")}
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
                  {...register("phone")}
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
                  {...register("email")}
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
                  {...register("password")}
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
                  {...register("confirmPassword")}
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
                  {...register("work")}
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
                  {...register("monthlyIncome")}
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
              className="font-medium text-indigo-400 hover:text-indigo-300 "
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
