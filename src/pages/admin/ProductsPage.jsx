import { useEffect, useState, useMemo } from "react";
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
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      const res = await getProducts();
      if (!res.error) setProducts(res.products);
    };
    loadProducts();
  }, []);

  // Filtrar products para le buscar
  const filteredProducts = useMemo(() => {
    return Array.isArray(products)
      ? products.filter(
          (product) =>
            product &&
            typeof product.name === "string" &&
            typeof product.description === "string" &&
            (product.name.toLowerCase().includes(search.toLowerCase()) ||
              product.description.toLowerCase().includes(search.toLowerCase()))
        )
      : [];
  }, [products, search]);

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

  const handleSave = async (formData) => {
    try {
      let res;
      if (editingProduct && editingProduct._id) {
        // EDITANDO PRODUCTO
        res = await updateProduct(editingProduct._id, formData);
        if (!res.error && res.data && res.data.updatedProduct) {
          const updatedProduct = res.data.updatedProduct;
          setProducts((prev) =>
            prev.map((p) =>
              p._id === editingProduct._id ? updatedProduct : p
            )
          );
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
                Empresa
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
                      {product.enterprise || "N/A"}
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
                      className="text-blue-400 hover:text-blue-300 mr-3"
                      onClick={() => {
                        if (product.img) {
                          setSelectedImage(product.img);
                          setImageDialogOpen(true);
                        } else {
                          alert('No hay imagen disponible para este producto');
                        }
                      }}
                      title="Ver imagen"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      className="text-indigo-400 hover:text-indigo-300 mr-3"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => {
                        setProductToDelete(product._id);
                        setConfirmDeleteOpen(true);
                      }}
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

      {/* Dialog para mostrar imagen */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Imagen del Producto
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img 
              src={selectedImage} 
              alt="Imagen del producto" 
              className="max-w-full max-h-96 object-contain rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div 
              className="hidden max-w-full max-h-96 flex items-center justify-center text-gray-400"
              style={{ display: 'none' }}
            >
              <p>Error al cargar la imagen</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación de eliminación */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              ¿Estás seguro de que deseas eliminar este producto?
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setConfirmDeleteOpen(false)}
              className="border-gray-600 text-gray-300"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                await handleDelete(productToDelete);
                setConfirmDeleteOpen(false);
                setProductToDelete(null);
              }}
              className="bg-red-600 text-white"
            >
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
