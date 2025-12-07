"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, Globe } from "lucide-react";

export default function PaymentMethods() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Precios
  const prices = {
    cop: 40000, // 40.000 COP para Colombia
    usd: 15     // 15 USD para el extranjero
  };

  // Función para procesar pago con Mercado Pago
  const processMercadoPago = async (currency: 'cop' | 'usd') => {
    setIsProcessing(true);
    
    try {
      // Mercado Pago: COP para Colombia, para internacional usar la moneda del país
      // Si es USD, convertir a COP ya que Mercado Pago Colombia solo acepta COP
      const mpCurrency = 'COP';
      const mpPrice = currency === 'cop' ? prices.cop : 60000; // ~60.000 COP equivalente a 15 USD
      
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: '40 MEGAPACKS - Cursos y Recursos Digitales',
          quantity: 1,
          currency_id: mpCurrency,
          unit_price: mpPrice
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la preferencia de pago');
      }
      
      // Redirigir a la página de pago de Mercado Pago
      window.location.href = data.init_point;
      
    } catch (error) {
      console.error('Error processing Mercado Pago payment:', error);
      alert('Hubo un error al procesar el pago. Por favor, intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Función para procesar pago con PayPal
  const processPayPal = async (currency: 'cop' | 'usd') => {
    setIsProcessing(true);
    
    try {
      // PayPal no soporta COP, convertir a USD
      const paypalCurrency = 'usd';
      const paypalAmount = currency === 'cop' ? 10 : prices.usd; // ~10 USD equivalente a 40.000 COP
      
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paypalAmount,
          currency: paypalCurrency,
          description: '40 MEGAPACKS - Cursos y Recursos Digitales'
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la orden de pago');
      }
      
      // Redirigir a la página de pago de PayPal
      window.location.href = data.approveUrl;
      
    } catch (error) {
      console.error('Error processing PayPal payment:', error);
      alert('Hubo un error al procesar el pago. Por favor, intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Métodos de Pago
          </CardTitle>
          <CardDescription>
            Elige tu método de pago preferido y obtén acceso inmediato a los 40 MEGAPACKS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="colombia" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="colombia" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Colombia
              </TabsTrigger>
              <TabsTrigger value="internacional" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Internacional
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="colombia" className="mt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">
                    Precio para Colombia
                  </Badge>
                  <div className="text-3xl font-bold">$40.000 COP</div>
                  <p className="text-gray-600">Acceso a los 40 MEGAPACKS</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                        onClick={() => setSelectedPayment('mercadopago-cop')}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                        {selectedPayment === 'mercadopago-cop' && (
                          <Badge className="bg-green-500">Seleccionado</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">Mercado Pago</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Paga de forma segura con Mercado Pago. Aceptamos todos los métodos de pago colombianos.
                      </p>
                      <Button 
                        className="w-full bg-blue-500 hover:bg-blue-600"
                        onClick={() => processMercadoPago('cop')}
                        disabled={isProcessing}
                      >
                        {isProcessing && selectedPayment === 'mercadopago-cop' ? 'Procesando...' : 'Pagar con Mercado Pago'}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedPayment('paypal-cop')}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-yellow-600" />
                        </div>
                        {selectedPayment === 'paypal-cop' && (
                          <Badge className="bg-green-500">Seleccionado</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">PayPal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Paga de forma segura con tu cuenta de PayPal o tarjeta de crédito internacional.
                      </p>
                      <Button 
                        className="w-full bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => processPayPal('cop')}
                        disabled={isProcessing}
                      >
                        {isProcessing && selectedPayment === 'paypal-cop' ? 'Procesando...' : 'Pagar con PayPal'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="internacional" className="mt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">
                    Precio Internacional
                  </Badge>
                  <div className="text-3xl font-bold">$15.00 USD</div>
                  <p className="text-gray-600">Acceso a los 40 MEGAPACKS</p>
                </div>
                
                <div className="flex justify-center">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow max-w-md w-full"
                        onClick={() => setSelectedPayment('paypal-usd')}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-yellow-600" />
                        </div>
                        {selectedPayment === 'paypal-usd' && (
                          <Badge className="bg-green-500">Seleccionado</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">PayPal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Paga de forma segura con tu cuenta de PayPal o tarjeta de crédito/débito internacional.
                      </p>
                      <Button 
                        className="w-full bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => processPayPal('usd')}
                        disabled={isProcessing}
                      >
                        {isProcessing && selectedPayment === 'paypal-usd' ? 'Procesando...' : 'Pagar con PayPal'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  <p>PayPal acepta tarjetas de crédito y débito de todo el mundo</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Información de pago:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Recibirás acceso inmediato después de confirmar el pago</li>
              <li>• Todos los pagos son seguros y están encriptados</li>
              <li>• Ofrecemos garantía de satisfacción de 7 días</li>
              <li>• Soporte 24/7 por WhatsApp</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}