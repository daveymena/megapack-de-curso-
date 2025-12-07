"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Phone } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "3042748687";
  const message = "Hola, estoy interesado en los 40 MEGAPACKS. ¿Podrían darme más información?";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-green-600">¿Necesitas ayuda?</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            ¡Hola! Estamos aquí para ayudarte con cualquier consulta sobre nuestros megapacks.
          </p>
          <Button 
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Chatear en WhatsApp
          </Button>
        </div>
      )}
      
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-6 shadow-lg flex items-center gap-2 text-base font-semibold"
      >
        <Phone className="h-5 w-5" />
        <span>{phoneNumber}</span>
      </Button>
    </div>
  );
}