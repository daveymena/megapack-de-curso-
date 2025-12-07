"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Mail } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

function PaymentSuccessContent() {
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
        amount: status === 'approved' ? '40.000 COP / $15 USD' : 'N/A',
        date: new Date().toLocaleDateString(),
      });
      setIsLoading(false);
    }, 1500);
  }, [searchParams]);

  const handleDownload = () => {
    const status = paymentDetails?.status;
    if (status === 'approved' || status === 'success') {
      window.open('https://drive.google.com/drive/folders/1nyGxtM-0gOy98e4bAHd50VooPhicvM_8', '_blank');
    } else {
      alert('El pago aún no ha sido confirmado. Por favor espera la confirmación.');
    }
  };

  useEffect(() => {
    if (!isLoading && paymentDetails) {
      const status = paymentDetails.status;
      if (status === 'approved' || status === 'success') {
        const timer = setTimeout(() => {
          window.open('https://drive.google.com/drive/folders/1nyGxtM-0gOy98e4bAHd50VooPhicvM_8', '_blank');
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, paymentDetails]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Procesando tu pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ¡Pago Exitoso!
          </h1>
          <p className="text-xl text-gray-600">
            Gracias por tu compra. Ya tienes acceso a los 40 MEGAPACKS.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detalles del Pedido</CardTitle>
            <CardDescription>
              Información sobre tu compra
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
                <p className="font-semibold text-green-600">{paymentDetails?.status || 'Aprobado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monto</p>
                <p className="font-semibold">{paymentDetails?.amount}</p>
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
                <Download className="h-5 w-5" />
                Descargar Megapacks
              </CardTitle>
              <CardDescription>
                Acceso inmediato a todos los cursos y recursos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Hemos enviado un email con los enlaces de descarga. También puedes descargarlos directamente aquí.
              </p>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Descargar Ahora
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Soporte
              </CardTitle>
              <CardDescription>
                ¿Necesitas ayuda con tu compra?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier consulta.
              </p>
              <Button variant="outline" className="w-full">
                Contactar Soporte
              </Button>
            </CardContent>
          </Card>
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

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Cargando...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
