import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "../components/ui/Button";
import useProducts from "../shared/hooks/useProducts";
import ProductCard from "../components/cards/ProductCard";

const Products = () => {
  const { products, isLoading, getProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log("Products recibidos", products);
  }, [products]);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-white">Productos y Servicios</h1>
        <Button leftIcon={<Plus size={16} />} size="sm">
          Solicitar Producto
        </Button>
      </div>

      <div className="mb-6 rounded-lg bg-gray-900 p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-lg font-semibold text-white">
            Catálogo de Productos
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                //value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-md border-0 bg-gray-800 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary md:w-64"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))
          ) : (
            <p>No se encontraron productos :P</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
