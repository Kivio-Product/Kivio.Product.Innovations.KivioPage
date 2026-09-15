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

### Hero (inspirado en Shopify)

- Titular centrado con **palabra rotativa** (`RotatingWord`: Software → IA → eCommerce) en una línea propia con degradado de marca. Sin layout shift: las palabras se apilan en la misma celda de grid.
- Visual de producto ancho con **tarjetas flotantes de cristal** (IA 24/7, deploy, conversión, reserva) animadas con `float` (se detienen con `prefers-reduced-motion`).
- Sin logos de clientes en el hero (viven en el marquee de abajo) y sin demo de chat (vive en `/es/ia`).

### QA visual

`npm run shots` captura screenshots en 375/768/1024/1440 (claro y oscuro) y reporta scroll horizontal.
Requiere instalar Playwright aparte: `npm i -D playwright && npx playwright install chromium` (no está en `package.json` para que Vercel no descargue navegadores).

### Sistema de vida y originalidad (UI UX Pro Max)

El skill `ui-ux-pro-max` (`.opencode/skills/`) aporta la capa de motion y estilos:

| Capa | Estilo aplicado | Dónde |
| --- | --- | --- |
| Base | AI-Native UI + Dark Mode OLED | Hero, KIVI, sección IA |
| Layout | Bento Box Grid | Productos, metodología IA, casos de uso |
| Profundidad | Glassmorphism + Dimensional layering | Nav, chat demo, chips, formulario |
| Motion | Motion-Driven + Kinetic Typography | Reveals, stagger, parallax, máquina de escribir |
| Detalle | Micro-interactions + acento offset | Botones, cards spotlight, hover |

**Componentes de motion** (`src/components/motion/motion.tsx`): `FadeUp` (300–400 ms), `Stagger` (delay 80 ms), `Counter`, `Magnetic` (máx. 1–2 por vista), `SpotlightCard`, `Tilt`, `Typewriter`, `Parallax` (capas decorativas), `ScrollProgress`.

**Utilidades CSS** (`globals.css`): `.aurora` (gradient mesh 12–16 s), `.glass`, `.gradient-border`, `.grain`, `.dots-pattern`, `.watermark-number`, `.typing-dot`, `.shadow-accent-hard`.

**Reglas respetadas**: `prefers-reduced-motion` en todo el sitio (estado final estático), contraste ≥ 4.5:1 en ambos temas, focus-visible, targets ≥ 44 px, z-index 50/60, `text-balance` en titulares, marquee con pausa en hover/focus, `scroll-padding-top` para el nav fijo.
"# Kivio.Product.Innovations.KivioPage" 
