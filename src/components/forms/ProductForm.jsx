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

const ProductForm = ({ product, onSave, onCancel, setEditingProduct }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={product.name}
            onChange={(e) =>
              setEditingProduct({ ...product, name: e.target.value })
            }
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descripcion</Label>
          <Input
            id="description"
            value={product.description}
            onChange={(e) =>
              setEditingProduct({ ...product, description: e.target.value })
            }
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Empresa</Label>
          <Input
            id="enterprise"
            value={product.enterprise}
            onChange={(e) =>
              setEditingProduct({ ...product, enterprise: e.target.value })
            }
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Porcentaje de Descuento</Label>
          <Input
            id="disscountPorcent"
            value={product.disscountPorcent}
            onChange={(e) =>
              setEditingProduct({
                ...product,
                disscountPorcent: e.target.value,
              })
            }
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountType">Tipo de Beneficio</Label>
          <Select
            value={product.type}
            onValueChange={(value) =>
              setEditingProduct({ ...product, type: value })
            }
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Selecciona el tipo" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem
                value="Service"
                className="text-white hover:bg-gray-700"
              >
                Servicio
              </SelectItem>
              <SelectItem
                value="Product"
                className="text-white hover:bg-gray-700"
              >
                Producto
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="originalPrice">Precio Original</Label>
        <Input
          id="originalPrice"
          type="number"
          value={product.originalPrice}
          onChange={(e) =>
            setEditingProduct({
              ...product,
              originalPrice: parseFloat(e.target.value),
            })
          }
          className="bg-gray-700 border-gray-600 text-white"
        />
      </div>
      <div className="space-y-2">
        <input
          type="file"
          className="file-input file-input-info"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => { 
            const file = e.target.files[0]
            if (file) {
              setEditingProduct({...product, img: file})
            }
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Estado</Label>
        <Switch
          id="status"
          checked={product.status}
          onCheckedChange={(checked) =>
            setEditingProduct({ ...product, status: checked })
          }
          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant="desttructive"
            onClick={onCancel}
            className="btn btn-soft btn-error"
          >
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={() => onSave(product)}>Guardar</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};

export default ProductForm;
