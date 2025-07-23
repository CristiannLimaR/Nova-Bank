import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "../components/ui/Button";
import useProducts from "../shared/hooks/useProducts";
import ProductCard from "../components/cards/ProductCard";
import useTransactions from "../shared/hooks/useTransactions";
import useAccount from "../shared/hooks/useAccount";
import useAccountStore from "../shared/stores/accountStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import ProductPurchaseModal from "../components/modals/ProductPurchaseModal";

const Products = () => {
  const { products, loading, getProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { createTransaction } = useTransactions();
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const { getMyAccount } = useAccount();
  const account = useAccountStore((state) => state.account);
  const [paymentMethod, setPaymentMethod] = useState("balance");
  const getVerify = useAccountStore((state) => state.getVerify);
  const isVerified = getVerify();

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'All' || product.type === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, filterCategory]);

  const categories = ['All', ...new Set(products.map(p => p.type))];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
    }).format(price);
  };

  const handleOpenModal = async (product) => {
    setSelectedProduct(product);
    if (!account) {
      await getMyAccount();
    }
    document.getElementById("product_modal").showModal();
  };

  if (!isVerified) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500/10 mb-4">
              <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Cuenta Pendiente de Activación</h3>
            <p className="text-sm text-gray-300">
              Tu cuenta bancaria no ha sido activada, un administrador la activará pronto
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-white">Productos y Servicios</h1>
        
      </div>

      <div className="mb-6 rounded-lg bg-gray-900 p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-lg font-semibold text-white">
            Catálogo de Productos
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-md border-0 bg-gray-800 text-white border-gray-700 pl-10 pr-4 text-sm placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary md:w-64"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="h-10 rounded-md border-0 bg-gray-800 text-white border-gray-700 px-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary w-48">
                <SelectValue placeholder="Todos los Tipos" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "All" ? "Todos los Tipos" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="text-white">Cargando productos...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div key={product._id} className="rounded-lg bg-gray-800 p-6">
                <div className="mb-4 flex items-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-700 overflow-hidden">
                    {product.img ? (
                      <img
                        src={product.img}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400">{product.type}</p>
                    <p className="text-xs text-gray-500">
                      {product.enterprise}
                    </p>
                  </div>
                </div>

                <p className="mb-4 text-sm text-gray-300">
                  {product.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    {product.disscountPorcent > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{product.disscountPorcent}%
                      </span>
                    )}
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-white">
                      {formatPrice(product.profitPrice)}
                    </p>
                    {product.disscountPorcent > 0 && (
                      <p className="text-xs text-green-400">
                        Ahorras{" "}
                        {formatPrice(
                          product.originalPrice - product.profitPrice
                        )}
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    disabled={!product.status}
                    onClick={() => handleOpenModal(product)}
                  >
                    {product.status ? "Solicitar" : "No Disponible"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={(open) => { if (!open) { setSelectedProduct(null); } }}>
        <ProductPurchaseModal
          open={!!selectedProduct}
          onClose={() => { setSelectedProduct(null); setTwoFactorCode(""); }}
          product={selectedProduct}
          account={account}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          twoFactorCode={twoFactorCode}
          setTwoFactorCode={setTwoFactorCode}
          createTransaction={createTransaction}
        />
      </Dialog>
    </div>
  );
};

export default Products;
