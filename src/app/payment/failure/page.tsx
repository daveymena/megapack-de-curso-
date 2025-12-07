"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, RefreshCw, MessageCircle } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

function PaymentFailureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const external_reference = searchParams.get('external_reference');
    const merchant_order_id = searchParams.get('merchant_order_id');

    setTimeout(() => {
      setErrorDetails({
        paymentId,
        status,
        externalReference: external_reference,
        merchantOrderId: merchant_order_id,
        error: status === 'rejected' ? 'Pago rechazado' : 'Error en el proceso de pago',
        date: new Date().toLocaleDateString(),
      });
      setIsLoading(false);
    }, 1500);
  }, [searchParams]);

  const handleRetry = () => {
    router.push('/payment');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Procesando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ¡Pago Fallido!
          </h1>
          <p className="text-xl text-gray-600">
            Lo sentimos, hubo un problema con tu pago. Por favor, intenta nuevamente.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detalles del Error</CardTitle>
            <CardDescription>
              Información sobre el intento de pago
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">ID del Pago</p>
                <p className="font-semibold">{errorDetails?.paymentId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <p className="font-semibold text-red-600">{errorDetails?.status || 'Fallido'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Error</p>
                <p className="font-semibold">{errorDetails?.error}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha</p>
                <p className="font-semibold">{errorDetails?.date}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Reintentar Pago
              </CardTitle>
              <CardDescription>
                Intenta realizar el pago nuevamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                A veces los errores son temporales. Por favor, intenta realizar el pago nuevamente.
              </p>
              <Button onClick={handleRetry} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reintentar Pago
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Soporte
              </CardTitle>
              <CardDescription>
                ¿Necesitas ayuda con el pago?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Si el problema persiste, nuestro equipo de soporte está disponible para ayudarte.
              </p>
              <Button variant="outline" className="w-full">
                Contactar Soporte
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-yellow-800 mb-2">Posibles soluciones:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Verifica que tengas fondos suficientes en tu cuenta</li>
            <li>• Confirma que los datos de tu tarjeta sean correctos</li>
            <li>• Intenta con otro método de pago</li>
            <li>• Contacta a tu banco para verificar si hay algún bloqueo</li>
          </ul>
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={() => router.push('/')}>
            Volver al Inicio
          </Button>
        </div>
      </div>
      
      <WhatsAppButton />
    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Cargando...</p>
        </div>
      </div>
    }>
      <PaymentFailureContent />
    </Suspense>
  );
}
