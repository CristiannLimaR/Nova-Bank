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

const roles = [
  { value: "USER_ROLE", label: "Usuario" },
  { value: "ADMIN_ROLE", label: "Administrador" },
];

const accountTypes = [
  { value: "SAVINGS", label: "Cuenta de Ahorro" },
  { value: "CHECKING", label: "Cuenta Corriente" },
];

const UserForm = ({ user, onSave, onCancel, setEditingUser, isCreating }) => {
  console.log("User accountType:", user.accountType);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Información Personal */}
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={user.name}
            onChange={(e) => setEditingUser({ ...user, name: e.target.value })}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Usuario</Label>
          <Input
            id="username"
            value={user.username}
            onChange={(e) =>
              setEditingUser({ ...user, username: e.target.value })
            }
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        {isCreating && (
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={user.password || ""}
              onChange={(e) =>
                setEditingUser({ ...user, password: e.target.value })
              }
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        )}
        {isCreating && (
          <div className="space-y-2">
            <Label htmlFor="dpi">DPI</Label>
            <Input
              id="dpi"
              value={user.dpi || ""}
              onChange={(e) => setEditingUser({ ...user, dpi: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        )}

        {/* Información de Contacto */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setEditingUser({ ...user, email: e.target.value })}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            type="number"
            value={user.phone}
            onChange={(e) =>
              setEditingUser({ ...user, phone: parseInt(e.target.value) })
            }
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        {isCreating && (
          <div className="space-y-2">
            <Label htmlFor="accountType">Tipo de Cuenta</Label>
            <Select
              defaultValue={user.accountType}
              value={user.accountType}
              onValueChange={(value) =>
                setEditingUser({ ...user, accountType: value })
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Tipo de Cuenta" />
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
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Ingreso Mensual</Label>
          <Input
            id="monthlyIncome"
            type="number"
            value={user.monthlyIncome}
            onChange={(e) =>
              setEditingUser({
                ...user,
                monthlyIncome: parseFloat(e.target.value),
              })
            }
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        {/* Información de Rol */}
        <div className="space-y-2">
          <Label htmlFor="role">Rol</Label>
          <Select
            value={user.role}
            onValueChange={(value) => setEditingUser({ ...user, role: value })}
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Selecciona un rol" />
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
        </div>
      </div>

      {/* Dirección */}
      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          value={user.address}
          onChange={(e) => setEditingUser({ ...user, address: e.target.value })}
          className="bg-gray-700 border-gray-600 text-white"
        />
      </div>

      {/* Estado */}
      <div className="flex items-center space-x-2">
        <Switch
          id="status"
          checked={user.status}
          onCheckedChange={(checked) =>
            setEditingUser({ ...user, status: checked })
          }
          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
        />
        <Label htmlFor="status">Estado Activo</Label>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="destructive" className="mr-2" onClick={onCancel}>
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={() => onSave(user)}>Guardar Cambios</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};

export default UserForm;
