import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { use2FA } from '../shared/hooks/use2FA';
import { toast } from 'sonner';

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const { start2FA, verify2FA, isLoading } = use2FA();
  const [qrCode, setQrCode] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);

  useEffect(() => {
    const initialize2FA = async () => {
      const response = await start2FA();
      console.log(response)
      if (response) {
        setQrCode(response.qrCode);
        setSecretKey(response.manualEntryKeydame);
      }
    };
    initialize2FA();
  }, []);

  const handleVerification = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Error', {
        description: 'Por favor ingresa un código de 6 dígitos',
      });
      return;
    }

    const response = await verify2FA({ twoFactorCode: verificationCode });
    if (response) {
      toast.success('2FA configurado correctamente');
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
            <svg
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#0F1114" />
              <path
                d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6ZM20.4287 16C20.4287 18.4501 18.4501 20.4287 16 20.4287C13.5499 20.4287 11.5713 18.4501 11.5713 16C11.5713 13.5499 13.5499 11.5713 16 11.5713C18.4501 11.5713 20.4287 13.5499 20.4287 16Z"
                fill="#3DD9C9"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Configuración de Autenticación de Dos Factores
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {step === 1
              ? 'Para mayor seguridad, configura la autenticación de dos factores escaneando el código QR'
              : 'Ingresa el código de verificación generado por tu aplicación'}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                {qrCode && (
                  <div className="bg-white p-4 rounded-lg">
                    <img src={qrCode} alt="QR Code" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">O ingresa manualmente esta clave en tu aplicación:</p>
                <p className="text-white font-mono bg-gray-800 p-2 rounded">{secretKey}</p>
              </div>
              <div className="text-sm text-gray-400">
                <p>Recomendamos usar aplicaciones como:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Google Authenticator</li>
                  <li>Microsoft Authenticator</li>
                  <li>Authy</li>
                </ul>
              </div>
              <Button
                onClick={() => setStep(2)}
                className="w-full"
                disabled={isLoading}
              >
                Continuar
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="verificationCode"
                  className="block text-sm font-medium text-gray-400"
                >
                  Código de Verificación
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="Ingresa el código de 6 dígitos"
                />
              </div>
              <Button
                onClick={handleVerification}
                className="w-full"
                disabled={isLoading}
              >
                Activar 2FA
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth; 