import React, { useState } from "react";
import {
  Search,
  Plus,
  ShoppingBag,
  Star,
  CreditCard,
  Shield,
  Gift,
  Coffee,
  BookOpen,
  Heart,
  Sparkles,
  Scissors,
  GraduationCap,
  Ticket,
  Briefcase,
  Dumbbell,
  Tv,
  GamepadIcon,
  Utensils,
  Plane,
  Wine,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import useProducts from "../shared/hooks/useProducts";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(products.map((p) => p.category))];

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-md border-0 bg-gray-800 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary md:w-64"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-10 rounded-md border-0 bg-gray-800 px-3 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-primary"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All" ? "Todas las Categorías" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="rounded-lg bg-gray-800 p-6">
              <div className="mb-4 flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
                  {product.icon}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-white">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-400">{product.category}</p>
                </div>
              </div>
              <p className="mb-4 text-sm text-gray-300">
                {product.description}
              </p>
              <div className="mb-4 space-y-2">
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-300"
                  >
                    <svg
                      className="mr-2 h-4 w-4 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-white">
                  {product.price === 0
                    ? "Gratis"
                    : `$${product.price.toFixed(2)}`}
                </p>
                <Button size="sm">Solicitar</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
