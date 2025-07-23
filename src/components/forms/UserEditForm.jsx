import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const editUserSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  username: z.string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(50, 'El usuario no puede exceder 50 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Solo se permiten letras, números y guiones bajos'),
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

const roles = [
  { value: "USER_ROLE", label: "Usuario" },
  { value: "ADMIN_ROLE", label: "Administrador" },
];

const UserEditForm = ({ user, onSave, onCancel }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      monthlyIncome: "",
      role: "USER_ROLE",
      address: "",
      status: true,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone !== undefined && user.phone !== null ? String(user.phone) : "",
        monthlyIncome: user.monthlyIncome !== undefined && user.monthlyIncome !== null ? String(user.monthlyIncome) : "",
        role: user.role || "USER_ROLE",
        address: user.address || "",
        status: user.status !== undefined ? user.status : true,
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      phone: data.phone ? parseInt(data.phone) : null,
      monthlyIncome: data.monthlyIncome ? parseFloat(data.monthlyIncome) : null,
      _id: user._id
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

        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Ingreso Mensual *</Label>
          <Controller
            name="monthlyIncome"
            control={control}
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
          disabled={!isValid}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Guardar Cambios
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UserEditForm; 