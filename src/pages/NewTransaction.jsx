import React, { useState, useEffect } from "react";
import { ArrowLeft, Search, Download, CheckCircle2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAccountStore from "../shared/stores/accountStore";
import useAccount from "../shared/hooks/useAccount";
import { toast } from "sonner";
import useTransactions from "../shared/hooks/useTransactions";

const transactionSchema = z.object({
  destinationAccount: z
    .string()
    .min(10, "La cuenta debe tener 10 caracteres")
    .max(10, "La cuenta debe tener 10 caracteres"),
  amount: z
    .string()
    .min(1, "El monto es requerido")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "El monto debe ser mayor a 0",
    })
    .refine((val) => parseFloat(val) >= 5, {
      message: "El monto no puede ser menor a Q5",
    })
    .refine((val) => parseFloat(val) <= 2000, {
      message: "El monto no puede ser mayor a Q2000",
    }),
  comment: z.string().optional(),
  twoFactorCode: z
    .string()
    .length(6, "El código debe tener 6 dígitos")
    .regex(/^\d+$/, "El código debe contener solo números"),
});

const NewTransaction = () => {
  const { createTransaction } = useTransactions();
  const navigate = useNavigate();
  const location = useLocation();
  const account = useAccountStore((state) => state.account);
  const [foundUser, setFoundUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const { searchAccount } = useAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      destinationAccount: "",
      amount: "",
      comment: "",
      twoFactorCode: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (location.state) {
      const { destinationAccount, amount, comment, twoFactorCode, foundUser } = location.state;
      setValue('destinationAccount', destinationAccount);
      setValue('amount', amount);
      setValue('comment', comment);
      setValue('twoFactorCode', twoFactorCode);
      setFoundUser(foundUser);
      setShowConfirmation(true);
    }
  }, [location.state, setValue]);

  const steps = [
    { id: 1, name: "Datos de Transferencia", completed: true },
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
    setShowConfirmation(true);
  };

  const handleConfirmTransaction = async () => {
    const formData = watch();
    const transactionPayload = {
      accountNo: parseFloat(formData.destinationAccount),
      amount: parseFloat(formData.amount),
      description: formData.comment || "",
      twoFactorCode: parseFloat(formData.twoFactorCode),
      type: "TRANSFER",
    };

    const response = await createTransaction(transactionPayload);

    const transaction = {
      ...transactionPayload,
      fromAccount: account.accountNo,
      toName: foundUser.name,
      date: new Date().toLocaleDateString(),
      id: response.data.transaction._id || "N/A",
      status: response.data.transaction.status ? "Completed" : "Failed",
    }
    
    setTransactionData(transaction);
    setShowConfirmation(false);
    setShowReceipt(true);
  };

  const handleDownloadReceipt = async () => {
    try {
      console.log('Generando comprobante PDF...');
      // SVG a base64
      const svgLogo = `<svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#0F1114"/><path d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6ZM20.4287 16C20.4287 18.4501 18.4501 20.4287 16 20.4287C13.5499 20.4287 11.5713 18.4501 11.5713 16C11.5713 13.5499 13.5499 11.5713 16 11.5713C18.4501 11.5713 20.4287 13.5499 20.4287 16Z" fill="#3DD9C9"/></svg>`;
      const svgBase64 = `data:image/svg+xml;base64,${btoa(svgLogo)}`;

      const jsPDF = (await import('jspdf')).default;
      const autoTable = (await import('jspdf-autotable')).default;
      const doc = new jsPDF();

      // Fondo oscuro
      doc.setFillColor(15, 17, 20); // #0F1114
      doc.rect(0, 0, 210, 297, 'F');

      // Logo
      try {
        doc.addImage(svgBase64, 'SVG', 80, 10, 50, 50);
      } catch (e) {
        toast.error('No se pudo agregar el logo al PDF.');
        console.error('Error al agregar el logo:', e);
      }

      // Título
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(61, 217, 201); // #3DD9C9
      doc.text('COMPROBANTE DE TRANSFERENCIA', 105, 70, { align: 'center' });

      // Datos de la transferencia
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      const yStart = 85;
      let y = yStart;
      const lineHeight = 10;
      const datos = [
        ['Fecha', transactionData.date],
        ['ID de Transacción', transactionData.id],
        ['Cuenta Origen', transactionData.fromAccount],
        ['Cuenta Destino', transactionData.accountNo],
        ['Beneficiario', transactionData.toName],
        ['Monto', `Q${transactionData.amount}`],
        ['Estado', transactionData.status],
      ];
      if (transactionData.description) {
        datos.push(['Comentario', transactionData.description]);
      }
      datos.forEach(([label, value]) => {
        doc.setTextColor(61, 217, 201);
        doc.text(`${label}:`, 30, y);
        doc.setTextColor(255, 255, 255);
        doc.text(`${value}`, 80, y);
        y += lineHeight;
      });

      // Mensaje de agradecimiento
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(61, 217, 201);
      doc.text('¡Gracias por usar Nova Bank!', 105, y, { align: 'center' });

      // Descargar PDF
      doc.save(`comprobante-transferencia-${transactionData.id}.pdf`);
      toast.success('Comprobante PDF generado');
    } catch (error) {
      toast.error('Error al generar el comprobante PDF');
      console.error('Error al generar el PDF:', error);
    }
  };

  if (showReceipt && transactionData) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Breadcrumb />
        <div className="text-center mb-8">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Transferencia Exitosa
          </h1>
          <p className="text-gray-400">
            Tu transferencia se ha realizado correctamente
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
            <span className="text-gray-400">Cuenta Origen</span>
            <span className="text-white">{transactionData.fromAccount}</span>
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
            onClick={handleDownloadReceipt}
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
          Confirmar Transferencia
        </h1>

        <div className="space-y-6">
          <div className="rounded-lg bg-gray-800 p-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Cuenta de Origen</h3>
              <p className="text-white font-medium">{account.accountNo}</p>
              <p className="text-sm text-gray-400">
                Balance disponible: Q{account.balance}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400">Cuenta de Destino</h3>
              <p className="text-white font-medium">{foundUser?.name}</p>
              <p className="text-sm text-gray-400">{foundUser?.email}</p>
              <p className="text-sm text-gray-400">{formData.destinationAccount}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400">Monto a Transferir</h3>
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
              Confirmar Transferencia
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
        Nueva Transferencia
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Cuenta de Origen
          </label>
          <div className="rounded-lg bg-gray-800 p-4">
            <p className="text-white font-medium">{account.accountNo}</p>
            <p className="text-sm text-gray-400">
              Balance disponible: Q{account.balance}
            </p>
          </div>
        </div>

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
            type="text"
            id="amount"
            className="w-full rounded-lg bg-gray-800 border-0 text-white px-4 py-3 focus:ring-2 focus:ring-primary"
            placeholder="0.00"
            // min="0" // Elimino min y step porque ya no es type number
            // step="0.01"
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

        <div>
          <label
            htmlFor="twoFactorCode"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Código de Verificación 2FA
          </label>
          <input
            {...register("twoFactorCode")}
            type="text"
            id="twoFactorCode"
            className="w-full rounded-lg bg-gray-800 border-0 text-white px-4 py-3 focus:ring-2 focus:ring-primary"
            placeholder="Ingresa el código de 6 dígitos"
            maxLength="6"
          />
          {errors.twoFactorCode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.twoFactorCode.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Realizar Transferencia
        </Button>
      </form>
    </div>
  );
};

export default NewTransaction;
