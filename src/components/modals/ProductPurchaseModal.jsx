import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
import { toast } from 'sonner';

const ProductPurchaseModal = ({
  open,
  onClose,
  product,
  account,
  paymentMethod,
  setPaymentMethod,
  twoFactorCode,
  setTwoFactorCode,
  createTransaction
}) => {
  if (!product) return null;
  return (
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
      <div className="mb-4">
        <label htmlFor="twoFactorCode" className="block text-white mb-1">Código 2FA</label>
        <Input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          placeholder="492039"
          className="w-full rounded border bg-gray-800 text-white border-gray-700 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white mt-2"
          value={twoFactorCode}
          onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ""))}
          id="twoFactorCode"
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" className="bg-gray-800 text-white border-gray-700" onClick={onClose}>Cerrar</Button>
        </DialogClose>
        <Button
          type="button"
          onClick={() => {
            if (product) {
              if (!twoFactorCode) {
                toast.error("Por favor, ingrese su TwoFactorCode.");
                return;
              }
              // Validar saldo suficiente si el método es saldo
              if (paymentMethod === "balance" && product.profitPrice > account.balance) {
                toast.error("El monto del producto es mayor al saldo disponible. No puedes realizar la compra.");
                return;
              }
              // Validar crédito suficiente si el método es crédito
              if (paymentMethod === "credit" && product.profitPrice > account.availableCredit) {
                toast.error("El monto del producto es mayor al crédito disponible. No puedes realizar la compra.");
                return;
              }
              const transaction = {
                productId: product._id,
                twoFactorCode: twoFactorCode,
                type: "PURCHASE",
                paymentMethod: paymentMethod,
              };
              createTransaction(transaction);
              setTwoFactorCode("");
              onClose();
            }
          }}
          className="bg-indigo-500 text-white"
        >
          Comprar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ProductPurchaseModal; 