import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
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

const roles = [
  { value: "USER_ROLE", label: "Usuario" },
  { value: "ADMIN_ROLE", label: "Administrador" },
];

const accountTypes = [
  { value: "SAVINGS", label: "Cuenta de Ahorro" },
  { value: "CHECKING", label: "Cuenta Corriente" },
];

const UserForm = ({ user, onSave, onCancel, isCreating = false }) => {
  const { validateExistUser, loading } = useValidations();
  
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm({
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
    mode: "onBlur", 
  });

  const email = watch("email");
  const dpi = watch("dpi");

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        username: user.username || "",
        password: user.password || "",
        dpi: user.dpi || "",
        email: user.email || "",
        phone: user.phone || "",
        accountType: user.accountType || "SAVINGS",
        monthlyIncome: user.monthlyIncome || "",
        role: user.role || "USER_ROLE",
        address: user.address || "",
        status: user.status !== undefined ? user.status : true,
      });
    }
  }, [user, reset]);

  useEffect(() => {
    const validateEmail = async () => {
      if (email && email.includes('@')) {
        if (!isCreating && user?.email === email) {
          return;
        }
        const exists = await validateExistUser({email: email});
        if (exists.exists) {
          setValue("email", email, { 
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
          });
        }
      }
    };

    validateEmail();
  }, [email, user, isCreating]);

  useEffect(() => {
    const validateDPI = async () => {
      if (dpi && dpi.length === 13) {
        const exists = await validateExistUser({dpi: dpi});
        if (exists.exists) {
          setValue("dpi", dpi, { 
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
          });
        }
      }
    };

    validateDPI();
  }, [dpi]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      phone: data.phone ? parseInt(data.phone) : null,
      monthlyIncome: data.monthlyIncome ? parseFloat(data.monthlyIncome) : null,
    };
    onSave(formattedData);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Información Personal */}
        <div className="space-y-2">
          <Label htmlFor="name">Nombre *</Label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "El nombre es requerido",
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
            }}
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
            rules={{
              required: "El usuario es requerido",
              minLength: {
                value: 3,
                message: "El usuario debe tener al menos 3 caracteres",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Solo se permiten letras, números y guiones bajos",
              }
            }}
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
              rules={{
                required: isCreating ? "La contraseña es requerida" : false,
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type="password"
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
              rules={{
                required: isCreating ? "El DPI es requerido" : false,
                pattern: {
                  value: /^\d{13}$/,
                  message: "El DPI debe tener exactamente 13 dígitos",
                },
                validate: async (value) => {
                  if (value && value.length === 13) {
                    const exists = await validateExistUser(value, 'dpi');
                    return !exists || "Este DPI ya está registrado";
                  }
                  return true;
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="dpi"
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Ingrese el DPI (13 dígitos)"
                  maxLength={13}
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
            rules={{
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Ingrese un email válido",
              },
              validate: async (value) => {
                if (!isCreating && user?.email === value) {
                  return true;
                }
                if (value && value.includes('@')) {
                  const exists = await validateExistUser({email: value});
                  return !exists || "Este email ya está registrado";
                }
                return true;
              }
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="ejemplo@correo.com"
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
                value: 0,
                message: "El ingreso debe ser mayor a 0",
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
          disabled={!isValid || loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UserForm;