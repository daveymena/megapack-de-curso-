# 🎓 Megapack de Cursos - Sistema de Pagos

Plataforma de venta de cursos digitales con integración de PayPal y Mercado Pago. Construida con Next.js 15, Tailwind CSS, shadcn/ui y TypeScript.

## 🚀 Deploy en Vercel (1 Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/daveymena/megapack-de-curso-)

### 📋 Pasos para desplegar en Vercel:

1. **Haz clic en el botón "Deploy with Vercel"** arriba
2. **Conecta tu cuenta de GitHub** si aún no lo has hecho
3. **Importa el repositorio**
4. **Configura las variables de entorno** (ver abajo)
5. **Despliega** y listo! 🎉

### 🔐 Variables de Entorno Requeridas

En Vercel, ve a **Settings → Environment Variables** y agrega:

```env
# Mercado Pago (Colombia)
MERCADO_PAGO_ACCESS_TOKEN=tu_access_token_aqui
MERCADO_PAGO_PUBLIC_KEY=tu_public_key_aqui

# PayPal (Internacional)
PAYPAL_CLIENT_ID=tu_client_id_aqui
PAYPAL_CLIENT_SECRET=tu_client_secret_aqui
PAYPAL_MODE=live
PAYPAL_API_URL=https://api-m.paypal.com

# URL de tu aplicación
NEXT_PUBLIC_BASE_URL=https://tu-proyecto.vercel.app
```

**Importante:** Después del primer deploy, actualiza `NEXT_PUBLIC_BASE_URL` con tu URL real de Vercel.

## 📦 Características

- ✅ **40 Megapacks** de cursos digitales
- ✅ **PayPal** - Pagos internacionales en USD
- ✅ **Mercado Pago** - Pagos en Colombia (COP)
- ✅ **Verificación de pagos** antes de dar acceso
- ✅ **Redirección automática** a Google Drive después del pago
- ✅ **Imágenes profesionales** de Unsplash
- ✅ **Diseño responsive** con Tailwind CSS
- ✅ **Componentes UI** de shadcn/ui
- ✅ **WhatsApp** integrado para soporte

## 🛠️ Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/daveymena/megapack-de-curso-.git
cd megapack-de-curso-

# Instalar dependencias
npm install

# Copiar el archivo de ejemplo de variables de entorno
cp .env.example .env.local

# Editar .env.local con tus credenciales
# nano .env.local

# Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── mercadopago/        # API de Mercado Pago
│   │   └── paypal/             # API de PayPal
│   ├── payment/                # Páginas de pago
│   │   ├── success/            # Pago exitoso
│   │   ├── failure/            # Pago fallido
│   │   ├── pending/            # Pago pendiente
│   │   ├── cancel/             # Pago cancelado
│   │   ├── links/              # Links de pago dinámicos
│   │   └── static-links/       # Links de pago estáticos
│   └── page.tsx                # Página principal
├── components/
│   ├── ui/                     # Componentes shadcn/ui
│   ├── MegaPackCard.tsx        # Tarjeta de megapack
│   ├── PaymentMethods.tsx      # Métodos de pago
│   └── WhatsAppButton.tsx      # Botón de WhatsApp
└── lib/                        # Utilidades
```

## 💳 Configuración de Pagos

### Mercado Pago (Colombia)

1. Crea una cuenta en [Mercado Pago](https://www.mercadopago.com.co)
2. Ve a **Tus integraciones → Credenciales**
3. Copia el **Access Token** y **Public Key** de producción
4. Agrégalos a las variables de entorno

### PayPal (Internacional)

1. Crea una cuenta en [PayPal Developer](https://developer.paypal.com)
2. Ve a **Dashboard → My Apps & Credentials**
3. Crea una app en **Live**
4. Copia el **Client ID** y **Secret**
5. Agrégalos a las variables de entorno

## 🔗 Links Útiles

- **Página principal:** `/`
- **Página de pago:** `/payment`
- **Links estáticos:** `/payment/static-links`
- **Links dinámicos:** `/payment/links`

## 🌐 Tecnologías Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **shadcn/ui** - Componentes UI
- **Mercado Pago API** - Pagos Colombia
- **PayPal API** - Pagos internacionales
- **Unsplash** - Imágenes

## 📝 Notas Importantes

- Los links de PayPal expiran después de 3 horas
- Los links de Mercado Pago son permanentes
- El acceso a Google Drive solo se da después de verificar el pago
- Las imágenes se cargan desde Unsplash (requiere conexión a internet)

## 🤝 Soporte

Para soporte, contacta por WhatsApp: **3042748687**

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

Hecho con ❤️ para la comunidad educativa
