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
    const { orderId } = body;

    // Validar los datos de entrada
    if (!orderId) {
      return NextResponse.json(
        { error: 'Falta el ID de la orden' },
        { status: 400 }
      );
    }

    // Obtener el token de acceso
    const accessToken = await getPayPalAccessToken();

    // Capturar el pago
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error en la respuesta de PayPal:', data);
      return NextResponse.json(
        { error: 'Error al capturar el pago' },
        { status: 500 }
      );
    }

    // Verificar si el pago fue completado exitosamente
    if (data.status === 'COMPLETED') {
      console.log('Pago completado exitosamente:', data.id);
      
      // Aquí puedes procesar el pago:
      // - Actualizar la base de datos
      // - Enviar un email de confirmación
      // - Dar acceso al usuario a los megapacks
      
      return NextResponse.json({
        status: 'completed',
        orderId: data.id,
        payer: data.payer,
        purchase_units: data.purchase_units,
      });
    } else {
      return NextResponse.json(
        { error: 'El pago no fue completado' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}