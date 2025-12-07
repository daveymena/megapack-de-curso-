import { NextRequest, NextResponse } from 'next/server';

// Configuración de PayPal
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'BAAtdQwVN8LvIoRstmHZWlo2ndcJBP8dFZdXLc8HJGdYUXstriO6mO0GJMZimkBCdZHotBkulELqeFm_R4';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || 'EP5jZdzbUuHva4I8ERnbNYSHQ_BNe0niXQe91Bvf33Kl88nRKY-ivRx0_PGERS72JbjQSiMr63y9lEEL';
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'live'; // 'sandbox' o 'live'
const PAYPAL_API_URL = process.env.PAYPAL_API_URL || 'https://api-m.paypal.com';

// Función para obtener el token de acceso de PayPal
async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error('Error al obtener el token de acceso de PayPal');
  }
  
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, description } = body;

    // Validar los datos de entrada
    if (!amount || !currency || !description) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    // Forzar USD ya que PayPal no soporta COP
    const paypalCurrency = 'USD';

    // Obtener el token de acceso
    const accessToken = await getPayPalAccessToken();

    // Crear la orden de pago
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: '40-megapacks',
          description: description,
          amount: {
            currency_code: paypalCurrency,
            value: amount.toString(),
          },
        },
      ],
      application_context: {
        brand_name: 'MEGAPACKS',
        landing_page: 'BILLING',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/cancel`,
      },
    };

    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': `order-${Date.now()}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error en la respuesta de PayPal:', data);
      return NextResponse.json(
        { error: 'Error al crear la orden de pago' },
        { status: 500 }
      );
    }

    // Encontrar la URL de aprobación
    const approveUrl = data.links.find((link: any) => link.rel === 'approve')?.href;

    if (!approveUrl) {
      return NextResponse.json(
        { error: 'No se encontró la URL de aprobación' },
        { status: 500 }
      );
    }

    // Devolver la URL de aprobación y el ID de la orden
    return NextResponse.json({
      orderId: data.id,
      approveUrl: approveUrl,
    });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}