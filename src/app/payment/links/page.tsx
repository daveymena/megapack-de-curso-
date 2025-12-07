"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Loader2 } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function PaymentLinksPage() {
  const [links, setLinks] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    generatePaymentLinks();
  }, []);

  const generatePaymentLinks = async () => {
    try {
      // Generar link de Mercado Pago
      const mpResponse = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: '40 MEGAPACKS - Cursos y Recursos Digitales',
          quantity: 1,
          currency_id: 'COP',
          unit_price: 40000
        }),
      });
      const mpData = await mpResponse.json();

      // Generar link de PayPal
      const ppResponse = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 15,
          currency: 'usd',
          description: '40 MEGAPACKS - Cursos y Recursos Digitales'
        }),
      });
      const ppData = await ppResponse.json();

      setLinks({
        mercadoPago: mpData.init_point,
        paypal: ppData.approveUrl,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error generando links:', error);
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-lg">Generando links de pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Links de Pago Directos
          </h1>
          <p className="text-xl text-gray-600">
            Comparte estos links para que tus clientes paguen directamente
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mercado Pago - Colombia (40.000 COP)</CardTitle>
              <CardDescription>
                Link de pago para clientes en Colombia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg break-all text-sm">
                {links?.mercadoPago || 'Error generando link'}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(links?.mercadoPago, 'mp')}
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied === 'mp' ? '¡Copiado!' : 'Copiar Link'}
                </Button>
                <Button
                  onClick={() => window.open(links?.mercadoPago, '_blank')}
                  className="flex-1"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Abrir Link
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PayPal - Internacional (15 USD)</CardTitle>
              <CardDescription>
                Link de pago para clientes internacionales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg break-all text-sm">
                {links?.paypal || 'Error generando link'}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(links?.paypal, 'pp')}
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied === 'pp' ? '¡Copiado!' : 'Copiar Link'}
                </Button>
                <Button
                  onClick={() => window.open(links?.paypal, '_blank')}
                  className="flex-1"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Abrir Link
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle>Link de Descarga (Google Drive)</CardTitle>
              <CardDescription>
                Envía este link a los clientes después del pago
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-lg break-all text-sm">
                https://drive.google.com/drive/folders/1nyGxtM-0gOy98e4bAHd50VooPhicvM_8
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard('https://drive.google.com/drive/folders/1nyGxtM-0gOy98e4bAHd50VooPhicvM_8', 'drive')}
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied === 'drive' ? '¡Copiado!' : 'Copiar Link'}
                </Button>
                <Button
                  onClick={() => window.open('https://drive.google.com/drive/folders/1nyGxtM-0gOy98e4bAHd50VooPhicvM_8', '_blank')}
                  className="flex-1"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Abrir Drive
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle>Mensaje para WhatsApp</CardTitle>
              <CardDescription>
                Copia y pega este mensaje para enviar por WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-white rounded-lg text-sm whitespace-pre-wrap">
{`🎉 ¡Gracias por tu compra de los 40 MEGAPACKS!

Aquí está tu acceso a todos los cursos y recursos:
📁 ${links?.mercadoPago ? 'https://drive.google.com/drive/folders/1nyGxtM-0gOy98e4bAHd50VooPhicvM_8' : ''}

✅ Acceso inmediato
✅ Más de 40 MEGAPACKS de contenido
✅ Actualizaciones gratuitas

¿Necesitas ayuda? Contáctanos por WhatsApp 📱`}
              </div>
              <Button
                onClick={() => copyToClipboard(`🎉 ¡Gracias por tu compra de los 40 MEGAPACKS!\n\nAquí está tu acceso a todos los cursos y recursos:\n📁 https://drive.google.com/drive/folders/1nyGxtM-0gOy98e4bAHd50VooPhicvM_8\n\n✅ Acceso inmediato\n✅ Más de 40 MEGAPACKS de contenido\n✅ Actualizaciones gratuitas\n\n¿Necesitas ayuda? Contáctanos por WhatsApp 📱`, 'whatsapp')}
                variant="outline"
                className="w-full mt-4"
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied === 'whatsapp' ? '¡Copiado!' : 'Copiar Mensaje'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Volver al Inicio
          </Button>
        </div>
      </div>
      
      <WhatsAppButton />
    </div>
  );
}
