# KIVIO — Sitio web

Nueva web de [kivio.com.co](https://www.kivio.com.co): Next.js 15, tema claro/oscuro, español e inglés. Lista para Vercel.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Redirige a `/es`. Inglés en `/en`.

## Despliegue en Vercel

1. Sube este directorio a GitHub (o importa la carpeta).
2. En [vercel.com](https://vercel.com/new) → Import Project → framework **Next.js** (detectado solo).
3. Root Directory: esta carpeta (`KIMI K3` si el repo es el padre).
4. Deploy. Sin variables de entorno.

El formulario de contacto responde `200` en `/api/contact`. Conecta Resend, Formspree o un webhook si quieres correo real; si falla, el cliente abre `mailto:admin@kivio.com.co`.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/es` `/en` | Inicio |
| `/es/ia` | IA-Native |
| `/es/servicios` | Servicios y paquetes |
| `/es/soporte-a-aerolineas` | Aerolíneas PSS/IBE |
| `/es/sobre-nosotros` | Sobre nosotros |
| `/es/contacto` | Contacto |
| `/es/carreras` | Carreras |
| `/es/productos/kivio-cms` | CMS |
| `/es/productos/kivio-ecommerce` | eCommerce |
| `/es/productos/kivio-bidmax` | BidMax |
| `/es/productos/kivi-ia` | KIVI IA Assistant |
| `/es/portafolio` | Portafolio |
| `/es/portafolio/flyr` | FLYR / Newshore |
| `/es/portafolio/merkko` | Merkko |
| `/es/portafolio/nutrir` | Nutrir |
| `/es/politicas-de-privacidad` | Privacidad |

## Diseño

Tokens y voz de `KIVIO-SAS---Inicio` (DESIGN.md): negro Kivio, naranja `#f66e4c`, Poppins + NeutraText, CTAs píldora 52px.
"# Kivio.Product.Innovations.KivioPage" 
