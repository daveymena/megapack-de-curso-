"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function StaticPaymentLinksPage() {
  const [copied, setCopied] = useState<string | null>(null);

  // INSTRUCCIONES: 
  // 1. Ve a /payment/links y genera los links
  // 2. Copia el link de Mercado Pago y pégalo aquí
  // 3. Para PayPal, usa la página /payment normal ya que los links expiran
  
  const MERCADO_PAGO_LINK = "PEGAR_AQUI_EL_LINK_DE_MERCADO_PAGO";
  const GOOGLE_DRIVE_LINK = "https://drive.google.com/drive/folders/1nyGxtM-0gOy98e4bAHd50VooPhicvM_8";

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const whatsappMessage = `🎉 ¡Obtén acceso a los 40 MEGAPACKS!

💰 Precio Colombia: $40.000 COP
💰 Precio Internacional: $15 USD

Para pagar con Mercado Pago (Colombia):
${MERCADO_PAGO_LINK}

Para pagar con PayPal (Internacional):
${typeof window !== 'undefined' ? window.location.origin : ''}/payment

Después del pago recibirás acceso inmediato a todos los cursos y recursos 🚀`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Links de Pago Estáticos
          </h1>
          <p className="text-xl text-gray-600">
            Links permanentes para compartir con tus clientes
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mercado Pago - Colombia (40.000 COP)</CardTitle>
              <CardDescription>
                Link permanente de pago para clientes en Colombia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg break-all text-sm">
                {MERCADO_PAGO_LINK}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(MERCADO_PAGO_LINK, 'mp')}
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied === 'mp' ? '¡Copiado!' : 'Copiar Link'}
                </Button>
                <Button
                  onClick={() => window.open(MERCADO_PAGO_LINK, '_blank')}
                  className="flex-1"
                  disabled={MERCADO_PAGO_LINK === "PEGAR_AQUI_EL_LINK_DE_MERCADO_PAGO"}
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
                Para PayPal, dirige a los clientes a la página de pago
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg break-all text-sm">
                {typeof window !== 'undefined' ? window.location.origin : ''}/payment
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(`${window.location.origin}/payment`, 'pp')}
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied === 'pp' ? '¡Copiado!' : 'Copiar Link'}
                </Button>
                <Button
                  onClick={() => window.location.href = '/payment'}
                  className="flex-1"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ir a Página de Pago
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Nota: Los links de PayPal expiran después de 3 horas, por eso es mejor usar la página de pago.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle>Link de Descarga (Google Drive)</CardTitle>
              <CardDescription>
                Envía este link SOLO después de confirmar el pago
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-lg break-all text-sm">
                {GOOGLE_DRIVE_LINK}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(GOOGLE_DRIVE_LINK, 'drive')}
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied === 'drive' ? '¡Copiado!' : 'Copiar Link'}
                </Button>
                <Button
                  onClick={() => window.open(GOOGLE_DRIVE_LINK, '_blank')}
                  className="flex-1"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Abrir Drive
                </Button>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                ⚠️ <strong>Importante:</strong> Solo envía este link después de verificar que el pago fue exitoso.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle>Mensaje para WhatsApp (Antes del Pago)</CardTitle>
              <CardDescription>
                Envía este mensaje para que los clientes paguen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-white rounded-lg text-sm whitespace-pre-wrap">
                {whatsappMessage}
              </div>
              <Button
                onClick={() => copyToClipboard(whatsappMessage, 'whatsapp')}
                variant="outline"
                className="w-full mt-4"
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied === 'whatsapp' ? '¡Copiado!' : 'Copiar Mensaje'}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle>Mensaje para WhatsApp (Después del Pago)</CardTitle>
              <CardDescription>
                Envía este mensaje SOLO después de confirmar el pago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-white rounded-lg text-sm whitespace-pre-wrap">
{`🎉 ¡Gracias por tu compra de los 40 MEGAPACKS!

Tu pago ha sido confirmado ✅

Aquí está tu acceso a todos los cursos y recursos:
📁 ${GOOGLE_DRIVE_LINK}

✅ Acceso inmediato
✅ Más de 40 MEGAPACKS de contenido
✅ Actualizaciones gratuitas

¿Necesitas ayuda? Contáctanos por WhatsApp 📱`}
              </div>
              <Button
                onClick={() => copyToClipboard(`🎉 ¡Gracias por tu compra de los 40 MEGAPACKS!\n\nTu pago ha sido confirmado ✅\n\nAquí está tu acceso a todos los cursos y recursos:\n📁 ${GOOGLE_DRIVE_LINK}\n\n✅ Acceso inmediato\n✅ Más de 40 MEGAPACKS de contenido\n✅ Actualizaciones gratuitas\n\n¿Necesitas ayuda? Contáctanos por WhatsApp 📱`, 'whatsapp2')}
                variant="outline"
                className="w-full mt-4"
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied === 'whatsapp2' ? '¡Copiado!' : 'Copiar Mensaje'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg border-2 border-blue-200">
          <h3 className="font-bold text-lg mb-4">📋 Instrucciones para configurar el link de Mercado Pago:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Ve a <code className="bg-gray-100 px-2 py-1 rounded">/payment/links</code></li>
            <li>Copia el link de Mercado Pago que se genera</li>
            <li>Abre el archivo <code className="bg-gray-100 px-2 py-1 rounded">src/app/payment/static-links/page.tsx</code></li>
            <li>Reemplaza <code className="bg-gray-100 px-2 py-1 rounded">PEGAR_AQUI_EL_LINK_DE_MERCADO_PAGO</code> con el link real</li>
            <li>Guarda el archivo y recarga esta página</li>
          </ol>
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
