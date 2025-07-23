import { toast } from 'sonner';

const useReceiptGenerator = () => {
  const downloadReceipt = async (transactionData) => {
    try {
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

  return downloadReceipt;
};

export default useReceiptGenerator; 