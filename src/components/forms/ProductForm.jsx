import { useState, useEffect } from "react";
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
import { X } from "lucide-react";

const ProductForm = ({ product, onSave, onCancel, setEditingProduct }) => {
  const [newImage, setNewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [existingImage, setExistingImage] = useState(product.img || null);

  const isEditing = !!product._id;

  useEffect(() => {
    // Limpiar la URL anterior antes de crear una nueva
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    if (newImage) {
      const url = URL.createObjectURL(newImage);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [newImage]);

  useEffect(() => {
    setExistingImage(product.img || null);
  }, [product.img]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setEditingProduct({ ...product, img: file });
    }
  };

  const removeImage = () => {
    if (newImage) {
      URL.revokeObjectURL(previewUrl);
      setNewImage(null);
      setPreviewUrl(null);
      setEditingProduct({ ...product, img: null });
    }
    if (existingImage) {
      setExistingImage(null);
      setEditingProduct({ ...product, img: null });
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('type', product.type);
    formData.append('enterprise', product.enterprise);

    // Asegúrate de que sean números válidos
    const disscountPorcent = Number(product.disscountPorcent) || 0;
    const originalPrice = Number(product.originalPrice) || 0;

    formData.append('disscountPorcent', disscountPorcent);
    formData.append('originalPrice', originalPrice);
    formData.append('status', product.status);
    
    if (newImage) {
      formData.append('file', newImage);
    }

    // Si estamos editando y hay imagen existente, la incluimos
    if (isEditing && existingImage && !newImage) {
      formData.append('existingImage', existingImage);
    }

    onSave(formData);
  };

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
        <Label>Imagen del Producto</Label>
        <div className="space-y-4">
          {!(previewUrl || existingImage) ? (
            <div>
              <Input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleImageChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-gray-700 border-gray-600 text-white"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative inline-block">
                <img
                  src={previewUrl || existingImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('image-input').click()}
                  className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  Cambiar Imagen
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={removeImage}
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                >
                  Eliminar Imagen
                </Button>
              </div>
              
              <Input
                id="image-input"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          )}
        </div>
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
            variant="destructive"
            onClick={onCancel}
            className="btn btn-soft btn-error"
          >
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};

export default ProductForm;
