import { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import useProducts from "../../shared/hooks/useProducts";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/forms/ProductForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createProduct, updateProduct } from "../../services/api";

const ProductsPage = () => {
  const { getProducts, deleteProduct, loading } = useProducts();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false); // EDITAR

  // Cargar products
  useEffect(() => {
    const loadProducts = async () => {
      const res = await getProducts();
      if (!res.error) setProducts(res.products);
    };
    loadProducts();
  }, []);

  // Filtrar products para le buscar
  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          product &&
          typeof product.name === "string" &&
          typeof product.description === "string" &&
          (product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  // Eliminar Product
  const handleDelete = async (id) => {
    const res = await deleteProduct(id);
    if (!res.error) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  // ########################### FORMS ###########################
  const [isCreating, setIsCreating] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleCreate = () => {
    setEditingProduct({
      name: "",
      description: "",
      enterprise: "",
      disscountPorcent: "",
      type: "",
      originalPrice: 0,
      status: true,
    });
  };

  const [editingProduct, setEditingProduct] = useState({
    name: "",
    description: "",
    enterprise: "",
    disscountPorcent: "",
    type: "",
    originalPrice: 0,
    status: true,
  });

  const handleSave = async (data) => {
    try {
      const formData = new FormData();

      // Agregar campos base
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("enterprise", data.enterprise);
      formData.append("type", data.type);

      // Convertir precios a float
      const originalPrice = parseFloat(data.originalPrice) || 0;
      const disscountPorcent = parseFloat(data.disscountPorcent) || 0;

      formData.append("originalPrice", originalPrice);
      formData.append("disscountPorcent", disscountPorcent);

      // Calcular precio final
      const profitPrice =
        originalPrice - (originalPrice * disscountPorcent) / 100;
      formData.append("profitPrice", profitPrice);

      // Verificar y agregar imagen
      if (data.img instanceof File) {
        console.log("📸 Imagen válida:", data.img.name);
        formData.append("img", data.img);
      } else {
        console.log("❗ No se adjuntó imagen válida");
      }

      // Enviar al backend
      let res;
      if (editingProduct && editingProduct._id) {
        // EDITANDO PRODUCTO
        res = await updateProduct(editingProduct._id, formData);
        if (!res.error && res.data && res.data.product) {
          const updatedProduct = res.data.product;
          setProducts((prev) =>
            prev.map((p) =>
              p._id === editingProduct._id ? res.data.product : p
            )
          );
          setTimeout(() => {
            console.log("🔁 Producto actualizado:", updatedProduct);
          }, 100);
        }
      } else {
        // CREANDO PRODUCTO
        res = await createProduct(formData);
        if (!res.error && res.data && res.data.product) {
          setProducts((prev) => [...prev, res.data.product]);
        }
      }

      if (res.error) {
        console.error("Error al guardar producto:", res.message || res.error);
        return;
      }

      // Volver a cargar productos del backend
      const reload = await getProducts();
      if (!reload.error) {
        setProducts(reload.products);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
    }

    setEditingUser(null);
    setIsCreating(false);
    setDialogOpen(false);
  };

  // %%%%%%% EDITAR PRODUCT %%%%%%%
  const handleEdit = (product) => {
    console.log("📝 Editando producto:", product);
    setEditingProduct(product);
    setIsCreating(false);
    setDialogOpen(true);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setIsCreating(false);
    setDialogOpen(false);
  };

  // ########################### END CODE FORMS ###########################

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          Gestión de Productos/Servicios
        </h1>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button
              className="text-white px-4 py-2 rounded-lg flex items-center"
              onClick={handleCreate}
            >
              <Plus className="w-5 h-5 mr-2" />
              Agregar
            </Button>
          </DialogTrigger>

          <DialogContent
            key={isCreating ? "create" : "edit"}
            className="bg-gray-800 text-white border-gray-700"
          >
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Agregar Producto/Servicio
              </DialogTitle>
            </DialogHeader>

            <ProductForm
              product={editingProduct}
              onSave={handleSave}
              onCancel={handleCancel}
              setEditingProduct={setEditingProduct}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => {
              console.log(product);
              return (
                <tr key={product._id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {typeof product.profitPrice == "number"
                        ? product.profitPrice === 0
                          ? "Gratis"
                          : ` Q ${product.profitPrice.toFixed(2)}`
                        : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/20 text-green-400">
                      {product.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-400 hover:text-indigo-300 mr-3"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
