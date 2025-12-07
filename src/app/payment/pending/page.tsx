export const dynamic = 'force-dynamic';

"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, RefreshCw, MessageCircle } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

function PaymentPendingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const external_reference = searchParams.get('external_reference');
    const merchant_order_id = searchParams.get('merchant_order_id');

    setTimeout(() => {
      setPaymentDetails({
        paymentId,
        status,
        externalReference: external_reference,
        merchantOrderId: merchant_order_id,
        statusMessage: 'Tu pago está siendo procesado',
        date: new Date().toLocaleDateString(),
      });
      setIsLoading(false);
    }, 1500);
  }, [searchParams]);

  const handleCheckStatus = () => {
    alert('Verificando estado del pago...');
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
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-12 h-12 text-yellow-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ¡Pago en Proceso!
          </h1>
          <p className="text-xl text-gray-600">
            Tu pago está siendo procesado. Te notificaremos cuando se complete.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detalles del Pago</CardTitle>
            <CardDescription>
              Información sobre tu pago en proceso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">ID del Pago</p>
                <p className="font-semibold">{paymentDetails?.paymentId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <p className="font-semibold text-yellow-600">{paymentDetails?.status || 'Pendiente'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mensaje</p>
                <p className="font-semibold">{paymentDetails?.statusMessage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha</p>
                <p className="font-semibold">{paymentDetails?.date}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Verificar Estado
              </CardTitle>
              <CardDescription>
                Consulta el estado actual de tu pago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Puedes verificar si el estado de tu pago ha cambiado. Algunos pagos pueden tardar unos minutos en procesarse.
              </p>
              <Button onClick={handleCheckStatus} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Verificar Estado
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
                ¿Necesitas ayuda con tu pago?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Si tienes alguna pregunta sobre el estado de tu pago, nuestro equipo de soporte está disponible para ayudarte.
              </p>
              <Button variant="outline" className="w-full">
                Contactar Soporte
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-800 mb-2">Información importante:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Recibirás un email cuando tu pago sea procesado</li>
            <li>• Algunos métodos de pago pueden tardar hasta 24 horas</li>
            <li>• Si no recibes confirmación en 24 horas, contacta a soporte</li>
            <li>• Guarda este ID de pago para futuras referencias: {paymentDetails?.paymentId || 'N/A'}</li>
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

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Cargando...</p>
        </div>
      </div>
    }>
      <PaymentPendingContent />
    </Suspense>
  );
}
