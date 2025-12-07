import { NextRequest, NextResponse } from 'next/server';

// Configuración de Mercado Pago
const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || 'APP_USR-8419296773492182-072623-ec7505166228860ec8b43957c948e7da-2021591453';
const MERCADO_PAGO_PUBLIC_KEY = process.env.MERCADO_PAGO_PUBLIC_KEY || 'APP_USR-23c2d74a-d01f-473e-a305-0e5999f023bc';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, quantity, currency_id, unit_price } = body;

    // Validar los datos de entrada
    if (!title || !quantity || !currency_id || !unit_price) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    // Crear la preferencia de pago
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const preferenceData: any = {
      items: [
        {
          title: title,
          quantity: parseInt(quantity),
          unit_price: parseFloat(unit_price),
          currency_id: currency_id.toUpperCase(),
        }
      ],
      back_urls: {
        success: `${baseUrl}/payment/success`,
        failure: `${baseUrl}/payment/failure`,
        pending: `${baseUrl}/payment/pending`,
      },
      statement_descriptor: 'MEGAPACKS',
      external_reference: '40-megapacks',
    };
    
    // Hacer la petición a la API de Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preferenceData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error en la respuesta de Mercado Pago:', data);
      return NextResponse.json(
        { error: 'Error al crear la preferencia de pago' },
        { status: 500 }
      );
    }

    // Devolver la URL de pago
    return NextResponse.json({
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
      public_key: MERCADO_PAGO_PUBLIC_KEY,
    });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}