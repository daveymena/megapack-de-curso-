"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, RefreshCw, MessageCircle } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function PaymentCancelPage() {
  const router = useRouter();

  const handleRetry = () => {
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ¡Pago Cancelado!
          </h1>
          <p className="text-xl text-gray-600">
            Has cancelado el proceso de pago. Si fue un error, puedes intentarlo nuevamente.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>¿Qué sucedió?</CardTitle>
            <CardDescription>
              Información sobre la cancelación del pago
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              El proceso de pago fue cancelado. Esto puede haber ocurrido por varias razones:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Decidiste cancelar el pago voluntariamente</li>
              <li>Cerraste la ventana de pago</li>
              <li>Hubo un problema de conexión a internet</li>
              <li>El tiempo de sesión expiró</li>
            </ul>
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
                ¿Quieres intentar pagar nuevamente?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Si la cancelación fue un error o simplemente cambiaste de idea, puedes intentar realizar el pago nuevamente.
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
                ¿Necesitas ayuda?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Si tienes alguna pregunta o necesitas ayuda con el proceso de pago, no dudes en contactarnos.
              </p>
              <Button variant="outline" className="w-full">
                Contactar Soporte
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-green-800 mb-2">Recuerda:</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• La oferta de los 40 MEGAPACKS sigue disponible</li>
            <li>• Puedes pagar con tarjeta de crédito, débito o otros métodos</li>
            <li>• Ofrecemos garantía de satisfacción de 7 días</li>
            <li>• El acceso es inmediato después de confirmar el pago</li>
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