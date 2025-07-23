import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import useValidations from "@/shared/hooks/useValidations";

// Esquema de validación dinámico según si es creación o edición
function getUserSchema(isCreating) {
  return z.object({
    name: z.string()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(100, 'El nombre no puede exceder 100 caracteres'),
    username: z.string()
      .min(3, 'El usuario debe tener al menos 3 caracteres')
      .max(50, 'El usuario no puede exceder 50 caracteres')
      .regex(/^[a-zA-Z0-9_]+$/, 'Solo se permiten letras, números y guiones bajos'),
    password: isCreating
      ? z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(100, 'La contraseña no puede exceder 100 caracteres')
      : z.string().optional().or(z.literal('')),
    dpi: isCreating
      ? z.string().length(13, 'El DPI debe tener exactamente 13 dígitos').regex(/^\d+$/, 'El DPI solo debe contener números')
      : z.string().optional().or(z.literal('')),
    email: z.string()
      .email('Formato de email inválido')
      .min(1, 'El email es requerido')
      .max(100, 'El email no puede exceder 100 caracteres'),
    phone: z.string()
      .min(8, 'El teléfono debe tener al menos 8 dígitos')
      .max(15, 'El teléfono no puede exceder 15 dígitos')
      .regex(/^\d+$/, 'El teléfono solo debe contener números')
      .optional()
      .or(z.literal('')),
    accountType: isCreating
      ? z.enum(['SAVINGS', 'CHECKING'], { required_error: 'Debe seleccionar un tipo de cuenta' })
      : z.string().optional().or(z.literal('')),
    monthlyIncome: z.string()
      .min(1, 'El ingreso mensual es requerido')
      .regex(/^\d+(\.\d{1,2})?$/, 'El ingreso mensual debe ser un número válido')
      .refine((val) => parseFloat(val) > 100, 'El ingreso mensual debe ser mayor a 100')
      .optional()
      .or(z.literal('')),
    role: z.enum(['USER_ROLE', 'ADMIN_ROLE'], {
      required_error: 'Debe seleccionar un rol',
    }),
    address: z.string()
      .min(5, 'La dirección debe tener al menos 5 caracteres')
      .max(200, 'La dirección no puede exceder 200 caracteres'),
    status: z.boolean(),
  });
}

const roles = [
  { value: "USER_ROLE", label: "Usuario" },
  { value: "ADMIN_ROLE", label: "Administrador" },
];

const accountTypes = [
  { value: "SAVINGS", label: "Cuenta de Ahorro" },
  { value: "CHECKING", label: "Cuenta Corriente" },
];

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

const UserForm = ({ user, onSave, onCancel, isCreating = false }) => {
  const { validateExistUser, isLoading } = useValidations();
  
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(getUserSchema(isCreating)),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      dpi: "",
      email: "",
      phone: "",
      accountType: "SAVINGS",
      monthlyIncome: "",
      role: "USER_ROLE",
      address: "",
      status: true,
    },
    mode: "onChange", 
  });

  const email = watch("email");
  const dpi = watch("dpi");

  // Validación en onBlur para email
  const handleEmailBlur = async (e) => {
    const value = e.target.value;
    if (value && value.includes('@')) {
      if (!isCreating && user?.email === value) {
        return;
      }
      const exists = await validateExistUser({ email: value });
      if (exists.exists) {
        setError("email", {
          type: "manual",
          message: "El email ya está en uso"
        });
      } else {
        clearErrors("email");
      }
    }
  };

  // Validación en onBlur para DPI
  const handleDpiBlur = async (e) => {
    const value = e.target.value;
    if (value && value.length === 13) {
      const exists = await validateExistUser({ dpi: value });
      if (exists.exists) {
        setError("dpi", {
          type: "manual",
          message: "El DPI ya está en uso"
        });
      } else {
        clearErrors("dpi");
      }
    }
  };

  useEffect(() => {
    if (user) {
      const initialValues = {
        name: user.name || "",
        username: user.username || "",
        password: user.password || "",
        dpi: user.dpi || "",
        email: user.email || "",
        phone: user.phone !== undefined && user.phone !== null ? String(user.phone) : "",
        accountType: user.accountType || "SAVINGS",
        monthlyIncome: user.monthlyIncome !== undefined && user.monthlyIncome !== null ? String(user.monthlyIncome) : "",
        role: user.role || "USER_ROLE",
        address: user.address || "",
        status: user.status !== undefined ? user.status : true,
      };
      console.log("Valores iniciales para reset:", initialValues);
      reset(initialValues, { keepErrors: false, keepDirty: false, keepTouched: false });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      phone: data.phone ? parseInt(data.phone) : null,
      monthlyIncome: data.monthlyIncome ? parseFloat(data.monthlyIncome) : null,
    };

    // Si estamos editando, eliminamos los campos que no queremos enviar
    if (!isCreating) {
      delete formattedData.password;
      delete formattedData.dpi;
      delete formattedData.accountType;
    }

    onSave(formattedData);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  // Para depuración
  console.log("Errores de validación:", errors);
  console.log("isValid:", isValid);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Información Personal */}
        <div className="space-y-2">
          <Label htmlFor="name">Nombre *</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Ingrese el nombre"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Usuario *</Label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="username"
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Ingrese el nombre de usuario"
              />
            )}
          />
          {errors.username && (
            <p className="text-red-400 text-sm">{errors.username.message}</p>
          )}
        </div>

        {isCreating && (
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña *</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  id="password"
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Ingrese la contraseña"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>
        )}

        {isCreating && (
          <div className="space-y-2">
            <Label htmlFor="dpi">DPI *</Label>
            <Controller
              name="dpi"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="dpi"
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Ingrese el DPI (13 dígitos)"
                  maxLength={13}
                  onBlur={async (e) => {
                    field.onBlur();
                    await handleDpiBlur(e);
                  }}
                />
              )}
            />
            {errors.dpi && (
              <p className="text-red-400 text-sm">{errors.dpi.message}</p>
            )}
          </div>
        )}

        {/* Información de Contacto */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="ejemplo@correo.com"
                onBlur={async (e) => {
                  field.onBlur();
                  await handleEmailBlur(e);
                }}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono *</Label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "El teléfono es requerido",
              pattern: {
                value: /^\d{8}$/,
                message: "El teléfono debe tener 8 dígitos",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="phone"
                type="tel"
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="12345678"
                maxLength={8}
              />
            )}
          />
          {errors.phone && (
            <p className="text-red-400 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {isCreating && (
          <div className="space-y-2">
            <Label htmlFor="accountType">Tipo de Cuenta *</Label>
            <Controller
              name="accountType"
              control={control}
              rules={{ required: "Seleccione un tipo de cuenta" }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Seleccione tipo de cuenta" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {accountTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="text-white hover:bg-gray-700"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.accountType && (
              <p className="text-red-400 text-sm">{errors.accountType.message}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Ingreso Mensual *</Label>
          <Controller
            name="monthlyIncome"
            control={control}
            rules={{
              required: "El ingreso mensual es requerido",
              min: {
                value: 100,
                message: "El ingreso debe ser mayor a 100",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="monthlyIncome"
                type="number"
                step="0.01"
                min="0"
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="0.00"
              />
            )}
          />
          {errors.monthlyIncome && (
            <p className="text-red-400 text-sm">{errors.monthlyIncome.message}</p>
          )}
        </div>

        {/* Información de Rol */}
        <div className="space-y-2">
          <Label htmlFor="role">Rol *</Label>
          <Controller
            name="role"
            control={control}
            rules={{ required: "Seleccione un rol" }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Seleccione un rol" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {roles.map((role) => (
                    <SelectItem
                      key={role.value}
                      value={role.value}
                      className="text-white hover:bg-gray-700"
                    >
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <p className="text-red-400 text-sm">{errors.role.message}</p>
          )}
        </div>
      </div>

      
      <div className="space-y-2">
        <Label htmlFor="address">Dirección *</Label>
        <Controller
          name="address"
          control={control}
          rules={{
            required: "La dirección es requerida",
            minLength: {
              value: 10,
              message: "La dirección debe tener al menos 10 caracteres",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="address"
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Ingrese la dirección completa"
            />
          )}
        />
        {errors.address && (
          <p className="text-red-400 text-sm">{errors.address.message}</p>
        )}
      </div>

      
      <div className="flex items-center space-x-2">
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Switch
              id="status"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
            />
          )}
        />
        <Label htmlFor="status">Estado Activo</Label>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button 
            type="button" 
            variant="destructive" 
            className="mr-2" 
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button 
          type="submit" 
          disabled={!isValid || isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UserForm;