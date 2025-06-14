import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  CreditCard,
  Wallet,
  HelpCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import useAuthStore from "../shared/stores/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateUser as updateUserApi, updatePassword as updatePasswordApi } from "../services/api.js";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, updateUser } = useAuthStore();

  const [isSaved, setIsSaved] = useState(false);

  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState("");
  const [passwordUpdateError, setPasswordUpdateError] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const profileSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
    phone: z.string().min(8, "El teléfono debe tener al menos 8 dígitos"),
    email: z.string().email("Correo electrónico inválido"),
    monthlyIncome: z.string().min(1, "El ingreso mensual es requerido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      address: user?.address || "",
      phone: user?.phone?.toString() || "",
      email: user?.email || "",
      monthlyIncome: user?.monthlyIncome?.toString() || "",
    },
  });

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      phone: parseInt(data.phone),
      monthlyIncome: parseInt(data.monthlyIncome),
    };

    const result = await updateUserApi(user._id, updatedData);

    if (!result.error) {
      updateUser(result.data.user);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } else {
      console.error("Error al actualizar el usuario:", result.e);
    }
  };

  const passwordSchema = z.object({
      currentPassword: z.string().min(1, "La contraseña actual es requerida."),
      newPassword: z.string().min(8, "La nueva contraseña debe tener al menos 8 caracteres."),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Las contraseñas no coinciden.",
      path: ["confirmPassword"],
    });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onPasswordSubmit = async (data) => {
    console.log('Datos del formulario:', data);
    setPasswordUpdateError("");
    setPasswordUpdateSuccess("");

    const payload = {
      currentPassword: data.currentPassword,
      password: data.newPassword,
    };
    
    console.log('Payload a enviar:', payload);
    const result = await updatePasswordApi(payload);
    console.log('Respuesta de la API:', result);

    
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div>
      {isSaved && (
        <div className="mb-4 animate-fade-in rounded-lg border border-green-500 bg-green-500/10 p-4 text-center text-green-300 backdrop-blur-sm">
          Perfil actualizado
        </div>
      )}
      <h1 className="mb-6 text-2xl font-bold text-white">Settings</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="rounded-lg bg-gray-900 p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <tab.icon className="mr-3 h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="rounded-lg bg-gray-900 p-6">
            {activeTab === "profile" && (
              <div>
                <h2 className="mb-6 text-xl font-semibold text-white">
                  Información del Perfil
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-400"
                      >
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
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
                        Nombre de Usuario
                      </label>
                      <input
                        type="text"
                        id="username"
                        {...register("username")}
                        className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
                      {errors.username && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="dpi"
                      className="block text-sm font-medium text-gray-400"
                    >
                      DPI
                    </label>
                    <input
                      type="text"
                      id="dpi"
                      value={user?.dpi || ""}
                      readOnly
                      disabled
                      className="mt-1 block w-full rounded-md border-0 bg-gray-700 px-3 py-2 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Dirección
                    </label>
                    <input
                      type="text"
                      id="address"
                      {...register("address")}
                      className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-400"
                      >
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register("phone")}
                        className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
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
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="monthlyIncome"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Ingreso Mensual
                    </label>
                    <input
                      type="number"
                      id="monthlyIncome"
                      {...register("monthlyIncome")}
                      className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                    {errors.monthlyIncome && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.monthlyIncome.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button type="submit">Guardar Cambios</Button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h2 className="mb-6 text-xl font-semibold text-white">
                  Security Settings
                </h2>

                {passwordUpdateSuccess && (
                  <div className="mb-4 animate-fade-in rounded-lg border border-green-500 bg-green-500/10 p-3 text-center text-sm text-green-300">
                    {passwordUpdateSuccess}
                  </div>
                )}
                {passwordUpdateError && (
                  <div className="mb-4 animate-fade-in rounded-lg border border-red-500 bg-red-500/10 p-3 text-center text-sm text-red-400">
                    {passwordUpdateError}
                  </div>
                )}
                
                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-4 text-lg font-medium text-white">
                        Change Password
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-gray-400"
                          >
                            Current Password
                          </label>
                          <div className="relative mt-1">
                            <input
                              type={showCurrent ? "text" : "password"}
                              id="currentPassword"
                              {...registerPassword("currentPassword")}
                              className="block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrent((v) => !v)}
                              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                              tabIndex={-1}
                            >
                              {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {passwordErrors.currentPassword && (
                            <p className="mt-1 text-sm text-red-500">
                              {passwordErrors.currentPassword.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-400"
                          >
                            New Password
                          </label>
                          <div className="relative mt-1">
                            <input
                              type={showNew ? "text" : "password"}
                              id="newPassword"
                              {...registerPassword("newPassword")}
                              className="block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNew((v) => !v)}
                              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                              tabIndex={-1}
                            >
                              {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {passwordErrors.newPassword && (
                            <p className="mt-1 text-sm text-red-500">
                              {passwordErrors.newPassword.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-400"
                          >
                            Confirm New Password
                          </label>
                          <div className="relative mt-1">
                            <input
                              type={showConfirm ? "text" : "password"}
                              id="confirmPassword"
                              {...registerPassword("confirmPassword")}
                              className="block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirm((v) => !v)}
                              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                              tabIndex={-1}
                            >
                              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {passwordErrors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">
                              {passwordErrors.confirmPassword.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button type="submit">Update Password</Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="mb-6 text-xl font-semibold text-white">
                  Notification Preferences
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium text-white">
                      Email Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">
                            Transaction Alerts
                          </p>
                          <p className="text-xs text-gray-400">
                            Get notified about all transactions
                          </p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-hidden"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">
                            Security Alerts
                          </p>
                          <p className="text-xs text-gray-400">
                            Get notified about security updates
                          </p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-hidden"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
