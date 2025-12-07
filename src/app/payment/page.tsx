"use client";

import WhatsAppButton from "@/components/WhatsAppButton";
import PaymentMethods from "@/components/PaymentMethods";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Completa tu compra
          </h1>
          <p className="text-xl text-gray-600">
            Obtén acceso inmediato a los 40 MEGAPACKS de cursos y recursos digitales
          </p>
        </div>
        
        <PaymentMethods />
      </div>
      
      <WhatsAppButton />
    </div>
  );
}