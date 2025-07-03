import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

// Esquema de validación para el formulario de producto
const productSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  description: z.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  enterprise: z.string()
    .min(2, 'La empresa debe tener al menos 2 caracteres')
    .max(100, 'La empresa no puede exceder 100 caracteres'),
  disscountPorcent: z.number()
    .min(0, 'El porcentaje de descuento no puede ser negativo')
    .max(100, 'El porcentaje de descuento no puede exceder 100%'),
  type: z.enum(['Service', 'Product'], {
    required_error: 'Debe seleccionar un tipo de beneficio',
  }),
  originalPrice: z.number()
    .positive('El precio original debe ser mayor a cero'),
  status: z.boolean(),
});

const ProductForm = ({ product, onSave, onCancel, setEditingProduct }) => {
  const [newImage, setNewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [existingImage, setExistingImage] = useState(product.img || null);

  const isEditing = !!product._id;

  // Configuración de react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name || "",
      description: product.description || "",
      enterprise: product.enterprise || "",
      disscountPorcent: product.disscountPorcent || 0,
      type: product.type || "Service",
      originalPrice: product.originalPrice || 0,
      status: product.status !== undefined ? product.status : true,
    },
  });

  // Observar cambios en el formulario para actualizar el estado del producto
  const formValues = watch();

  useEffect(() => {
    setEditingProduct({
      ...product,
      ...formValues,
    });
  }, [formValues, setEditingProduct]);

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

  // Resetear formulario cuando cambie el producto
  useEffect(() => {
    reset({
      name: product.name || "",
      description: product.description || "",
      enterprise: product.enterprise || "",
      disscountPorcent: product.disscountPorcent || 0,
      type: product.type || "Service",
      originalPrice: product.originalPrice || 0,
      status: product.status !== undefined ? product.status : true,
    });
  }, [product, reset]);

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

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('type', data.type);
    formData.append('enterprise', data.enterprise);
    formData.append('disscountPorcent', data.disscountPorcent);
    formData.append('originalPrice', data.originalPrice);
    formData.append('status', data.status);
    
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Ingrese el nombre del producto"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="description"
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Ingrese la descripción"
              />
            )}
          />
          {errors.description && (
            <p className="text-red-400 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="enterprise">Empresa</Label>
          <Controller
            name="enterprise"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="enterprise"
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Ingrese el nombre de la empresa"
              />
            )}
          />
          {errors.enterprise && (
            <p className="text-red-400 text-sm">{errors.enterprise.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="disscountPorcent">Porcentaje de Descuento</Label>
          <Controller
            name="disscountPorcent"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="disscountPorcent"
                type="number"
                min="0"
                max="100"
                step="0.01"
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="0"
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            )}
          />
          {errors.disscountPorcent && (
            <p className="text-red-400 text-sm">{errors.disscountPorcent.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipo de Beneficio</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
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
            )}
          />
          {errors.type && (
            <p className="text-red-400 text-sm">{errors.type.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="originalPrice">Precio Original</Label>
        <Controller
          name="originalPrice"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="originalPrice"
              type="number"
              step="0.01"
              min="0"
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="0.00"
              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
            />
          )}
        />
        {errors.originalPrice && (
          <p className="text-red-400 text-sm">{errors.originalPrice.message}</p>
        )}
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
            <div className="relative">
              <img
                src={previewUrl || existingImage}
                alt="Preview"
                className="h-32 w-32 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="status">Producto Activo</Label>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button type="submit">
          {isEditing ? "Actualizar Producto" : "Crear Producto"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ProductForm;
