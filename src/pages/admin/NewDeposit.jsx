import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, z } from "zod";
import { ArrowLeft, Search, Download, CheckCircle2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { useState, useEffect } from "react";
import useAccount from "../../shared/hooks/useAccount";
import  useAccountStore  from "../../shared/stores/accountStore";
import { toast } from "sonner";
import useTransactions from "../../shared/hooks/useTransactions";
import useReceiptGenerator from "../../shared/hooks/useReceiptGenerator";

const depositSchema = z.object({
  destinationAccount: z
    .string()
    .min(10, "La cuenta debe tener 10 caracteres")
    .max(10, "La cuenta debe tener 10 caracteres"),
  amount: z
    .string()
    .min(1, "El monto es requerido")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "El monto debe ser mayor a 0",
    }),
  comment: z.string().optional(),

});

const NewDeposit = () => {
  const { createDeposit } = useTransactions();
  const navigate = useNavigate();
  const location = useLocation();
  const account = useAccountStore((state) => state.account);
  const [foundUser, setFoundUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const { searchAccount } = useAccount();
  const downloadReceipt = useReceiptGenerator();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      destinationAccountNumber: "",
      amount: "",
      comment: "",
    },
  });

  useEffect(() => {
      if (location.state) {
        const { destinationAccount, amount, comment, twoFactorCode, foundUser } = location.state;
        setValue('destinationAccount', destinationAccount);
        setValue('amount', amount);
        setValue('comment', comment);
        setFoundUser(foundUser);
        setShowConfirmation(true);
      }
    }, [location.state, setValue]);

    const steps = [
      { id: 1, name: "Datos del Deposito", completed: true },
      { id: 2, name: "Confirmación", completed: showConfirmation },
      { id: 3, name: "Comprobante", completed: showReceipt },
    ];

    const Breadcrumb = () => (
        <div className="mb-8">
          <nav className="flex items-center justify-center" aria-label="Progress">
            <ol role="list" className="flex items-center space-x-5">
              {steps.map((step, index) => (
                <li key={step.id} className="relative">
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute left-8 top-4 -ml-px h-0.5 w-16 ${
                        step.completed ? "bg-primary" : "bg-gray-700"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex items-center">
                    <span
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        step.completed
                          ? "border-primary bg-primary text-white"
                          : "border-gray-700 bg-gray-800 text-gray-400"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </span>
                    <span
                      className={`ml-3 text-sm font-medium ${
                        step.completed ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      );

  const handleSearchAccount = async () => {
      const accountNo = watch("destinationAccount");
      if (!accountNo || accountNo.length !== 10) {
        toast.error("Error", {
          description: "Ingresa un número de cuenta válido de 10 caracteres",
        });
        return;
      }
  
      setIsSearching(true);
      const response = await searchAccount(accountNo);
      setIsSearching(false);
  
      if (response.error) {
        toast.error("Error", {
          description: "No se encontró la cuenta",
        });
        setFoundUser(null);
        return;
      }
  
      setFoundUser(response.user);
      toast.success("Cuenta encontrada", {
        description: `Usuario: ${response.user.name}`,
      });
    };

  const onSubmit = (data) => {
    if (!foundUser) {
      toast.error("Debes buscar y seleccionar una cuenta de destino válida antes de continuar.");
      return;
    }
    if (data.destinationAccount === String(account.accountNo)) {
      toast.error("No puedes depositar a tu propia cuenta.");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmTransaction = async () => {
      const formData = watch();
      const transactionPayload = {
        accountNo: parseFloat(formData.destinationAccount),
        amount: parseFloat(formData.amount),
        description: formData.comment || "",
        type: "DEPOSIT",
      };
  
      const response = await createDeposit(transactionPayload);
  
      if (response.error) {
        toast.error("Error al realizar la transferencia", {
          description: response.error.message || "Ocurrió un error inesperado",
        });
        return;
      }
  
      const transaction = {
        ...transactionPayload,
        toName: foundUser.name,
        date: new Date().toLocaleDateString(),
        id: response.data.transaction._id || "N/A",
        status: response.data.transaction.status ? "Completed" : "Failed",
      }
      
      setTransactionData(transaction);
      setShowConfirmation(false);
      setShowReceipt(true);
    };

      if (showReceipt && transactionData) {
          return (
            <div className="max-w-2xl mx-auto p-6">
              <Breadcrumb />
              <div className="text-center mb-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">
                  Deposito Exitoso
                </h1>
                <p className="text-gray-400">
                  Tu Deposito se ha realizado correctamente
                </p>
              </div>
      
              <div className="rounded-lg bg-gray-800 p-6 space-y-4 mb-6">
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-gray-400">ID de Transacción</span>
                  <span className="text-white font-medium">{transactionData.id}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-gray-400">Fecha</span>
                  <span className="text-white">{transactionData.date}</span>
                </div>
      
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-gray-400">Cuenta Destino</span>
                  <span className="text-white">{transactionData.accountNo}</span>
                </div>
      
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-gray-400">Beneficiario</span>
                  <span className="text-white">{transactionData.toName}</span>
                </div>
      
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-gray-400">Monto</span>
                  <span className="text-white font-bold">Q{transactionData.amount}</span>
                </div>
      
                {transactionData.comment && (
                  <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                    <span className="text-gray-400">Comentario</span>
                    <span className="text-white">{transactionData.comment}</span>
                  </div>
                )}
      
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Estado</span>
                  <span className="text-green-500 font-medium">{transactionData.status}</span>
                </div>
              </div>
      
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  Volver al Inicio
                </Button>
                <Button
                  type="button"
                  onClick={() => downloadReceipt(transactionData)}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Comprobante
                </Button>
              </div>
            </div>
          );
        }

      if (showConfirmation) {
          const formData = watch();
          return (
            <div className="max-w-2xl mx-auto p-6">
              <Breadcrumb />
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex items-center text-gray-400 hover:text-white mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </button>
      
              <h1 className="text-2xl font-bold text-white mb-6">
                Confirmar Deposito
              </h1>
      
              <div className="space-y-6">
                <div className="rounded-lg bg-gray-800 p-6 space-y-4">
      
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Cuenta de Destino</h3>
                    <p className="text-white font-medium">{foundUser?.name}</p>
                    <p className="text-sm text-gray-400">{foundUser?.email}</p>
                    <p className="text-sm text-gray-400">{formData.destinationAccount}</p>
                  </div>
      
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Monto a Depositar</h3>
                    <p className="text-white font-medium">Q{formData.amount}</p>
                  </div>
      
                  {formData.comment && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Comentario</h3>
                      <p className="text-white">{formData.comment}</p>
                    </div>
                  )}
                </div>
      
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleConfirmTransaction}
                    className="flex-1"
                  >
                    Confirmar Deposito
                  </Button>
                </div>
              </div>
            </div>
          );
        }

      


  return (
      <div className="max-w-2xl mx-auto p-6">
        <Breadcrumb />
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </button>
  
        <h1 className="text-2xl font-bold text-white mb-6">
          Nuevo Deposito
        </h1>
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="destinationAccount"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Cuenta de Destino
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  {...register("destinationAccount")}
                  type="text"
                  id="destinationAccount"
                  className="w-full rounded-lg bg-gray-800 border-0 text-white px-4 py-3 focus:ring-2 focus:ring-primary"
                  placeholder="Ingresa el número de cuenta"
                />
                {errors.destinationAccount && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.destinationAccount.message}
                  </p>
                )}
              </div>
              <Button
                type="button"
                onClick={handleSearchAccount}
                disabled={isSearching}
                className="whitespace-nowrap"
              >
                <Search className="w-4 h-4 mr-2" />
                {isSearching ? "Buscando..." : "Buscar"}
              </Button>
            </div>
            {foundUser && (
              <div className="mt-2 rounded-lg bg-gray-800 p-4">
                <p className="text-white font-medium">{foundUser.name}</p>
                <p className="text-sm text-gray-400">{foundUser.email}</p>
              </div>
            )}
          </div>
  
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Monto
            </label>
            <input
              {...register("amount")}
              type="number"
              id="amount"
              className="w-full rounded-lg bg-gray-800 border-0 text-white px-4 py-3 focus:ring-2 focus:ring-primary"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>
  
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Comentario (opcional)
            </label>
            <textarea
              {...register("comment")}
              id="comment"
              className="w-full rounded-lg bg-gray-800 border-0 text-white px-4 py-3 focus:ring-2 focus:ring-primary"
              placeholder="Agrega un comentario para esta transferencia"
              rows="3"
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-500">
                {errors.comment.message}
              </p>
            )}
          </div>
  
          <Button type="submit" className="w-full">
            Realizar Deposit
          </Button>
        </form>
      </div>
    );
  };

  export default NewDeposit;
