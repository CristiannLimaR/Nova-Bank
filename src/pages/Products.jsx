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

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.type === filterCategory;
    return matchesSearch && matchesCategory;
  });

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

      <Dialog open={!!selectedProduct} onOpenChange={(open) => { if (!open) { setSelectedProduct(null); setTwoFactorCode(""); } }}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Confirmar la compra</DialogTitle>
            <DialogDescription>
              Ingrese su TwoFactorCode para completar la compra
            </DialogDescription>
          </DialogHeader>
          {account && (
            <div className="mb-4 p-3 rounded bg-gray-800 text-white">
              <div><span className="font-semibold">Cuenta:</span> {account.accountNo}</div>
              <div><span className="font-semibold">Saldo disponible:</span> {account.balance?.toLocaleString("es-GT", { style: "currency", currency: "GTQ" })}</div>
              <div><span className="font-semibold">Crédito disponible:</span> {account.availableCredit?.toLocaleString("es-GT", { style: "currency", currency: "GTQ" })}</div>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-white mb-1">Método de pago</label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full rounded border bg-gray-800 text-white border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white">
                <SelectValue placeholder="Selecciona método" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                <SelectItem value="balance">Saldo</SelectItem>
                <SelectItem value="credit">Crédito</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            placeholder="492039"
            className="w-full rounded border bg-gray-800 text-white border-gray-700 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white mt-2"
            value={twoFactorCode}
            onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ""))}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="bg-gray-800 text-white border-gray-700">Cerrar</Button>
            </DialogClose>
            <Button
              type="button"
              onClick={() => {
                if (selectedProduct) {
                  if (!twoFactorCode) {
                    alert("Por favor, ingrese su TwoFactorCode.");
                    return;
                  }
                  const transaction = {
                    productId: selectedProduct._id,
                    twoFactorCode: twoFactorCode,
                    type: "PURCHASE",
                    paymentMethod: paymentMethod,
                  };
                  createTransaction(transaction);
                  setTwoFactorCode("");
                  setSelectedProduct(null);
                }
              }}
              className="bg-indigo-500 text-white"
            >
              Comprar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
