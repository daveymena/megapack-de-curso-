import { NextRequest, NextResponse } from 'next/server';

const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || 'APP_USR-8419296773492182-072623-ec7505166228860ec8b43957c948e7da-2021591453';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Webhook de Mercado Pago recibido:', body);

    // Verificar si es una notificación de pago
    if (body.type === 'payment') {
      const paymentId = body.data.id;
      
      // Obtener los detalles del pago
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      });

      const paymentData = await paymentResponse.json();

      if (paymentResponse.ok) {
        console.log('Detalles del pago:', paymentData);

        // Aquí puedes procesar el pago:
        // - Verificar si el pago está aprobado
        // - Actualizar la base de datos
        // - Enviar un email de confirmación
        // - Dar acceso al usuario a los megapacks

        if (paymentData.status === 'approved') {
          console.log('Pago aprobado:', paymentData.id);
          // Aquí iría la lógica para dar acceso al usuario
        }
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Error en el webhook de Mercado Pago:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Mercado Pago necesita una respuesta GET para verificar el webhook
  const searchParams = request.nextUrl.searchParams;
  const topic = searchParams.get('topic');
  const id = searchParams.get('id');

  if (topic === 'payment') {
    console.log('Verificación de pago:', id);
    // Aquí puedes verificar el estado del pago si es necesario
  }

  return NextResponse.json({ status: 'ok' });
}