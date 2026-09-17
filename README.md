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
- Visual editorial con **foto de workspace** + **tarjetas flotantes de cristal** ("IA que no duerme", "Deploy sin drama", "Resultados medibles", "Pasajeros primero") animadas con `float` (se detienen con `prefers-reduced-motion`).
- Sin logos de clientes en el hero (viven en el marquee de abajo) y sin demo de chat (vive en `/es/ia`).

> Crédito de imagen: foto de Jakub Żerdzicki vía [Unsplash](https://unsplash.com/photos/coding-on-dual-monitors-S8E1yLUNAw8) (Unsplash License, uso comercial libre).

### QA visual

`npm run shots` captura screenshots en 375/768/1024/1440 (claro y oscuro) y reporta scroll horizontal.
Requiere instalar Playwright aparte: `npm i -D playwright && npx playwright install chromium` (no está en `package.json` para que Vercel no descargue navegadores).

## Videos ambientales

Patrón Shopify (`preload="none"`, poster siempre, sin `autoplay` en el HTML, arranque por JS).
Componente: `src/components/shared/AmbientVideo.tsx`.

| Video | Sección | Peso desktop / móvil |
| --- | --- | --- |
| `hero-geometric` (oscuro) + `space` (claro) | Hero de la home (variante por tema, zoom `scale-[1.3] origin-bottom`, `videoOpacity={0.8}` + velo `black/35`) | 1.3 MB/539 KB · 206/83 KB |
| `ai-chat` | Sección IA-Native (home) + hero de `/ia` | 580 / 258 KB |
| `abstract-blue` | Sección "Lo que construimos, en acción" (carrusel) | 357 / 156 KB |
| `servers` | Hero de `/soporte-a-aerolineas` | 388 / 158 KB |
| `glass-corridor` | Hero de `/servicios` | 395 / 161 KB |
| `night-phone` | Sección de contacto del home · "responde mientras duermes" | 357 / 153 KB |
| `ai-brain` (vertical 9:16) | Tarjeta de marca en `/productos/kivi-ia` (logo KIVI AI animado, sin velo) | 545 / 314 KB |

**Carga**: el HTML solo trae el poster (imagen). El `src` del video se asigna tras `window.load` + `requestIdleCallback`, y además solo cuando la sección está a ~600 px del viewport (IntersectionObserver). Se salta por completo con `prefers-reduced-motion`, `saveData` o `deviceMemory < 2 GB`. Pausa al salir del viewport o con la pestaña oculta.
Velo adaptativo por tema: `white/75` en claro · `black/45` en oscuro (secciones: 88/65) + degradado inferior que funde con el fondo.

## SEO

| Elemento | Implementación |
| --- | --- |
| `lang` SSR por idioma | El layout raíz vive en `src/app/[lang]/layout.tsx` → `/es` sale con `lang="es-CO"` y `/en` con `lang="en"` |
| Metadatos por página | `src/lib/page-seo.ts` + `buildMetadata()`: title, description, **canonical** y **hreflang** (`es`, `en`, `x-default`) en las 16 rutas |
| Open Graph / Twitter | `og:title/description/url/locale`, `twitter:summary_large_image` + **imagen OG dinámica 1200×630** por idioma (`/[lang]/opengraph-image`) |
| Datos estructurados (JSON-LD) | `Organization` + `WebSite` (global), `Service` (servicios/IA/aerolíneas), `SoftwareApplication` (4 productos), `JobPosting` ×3 (carreras), `BreadcrumbList` (páginas internas vía `PageHero`) |
| `sitemap.xml` | 32 URLs con `alternates.languages` (`src/app/sitemap.ts`) |
| `robots.txt` | Allow total, `Disallow: /api/`, referencia al sitemap, `Host` |
| `manifest.webmanifest` | Nombre, colores de marca, iconos (`src/app/manifest.ts`) |
| Rendimiento | `optimizePackageImports` (lucide), AVIF/WebP, cache inmutable de assets, `poweredByHeader: false` |
| Seguridad | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS |
| Keyword map | `dict.meta.keywords` (ES/EN) por industria |

Verificación local: `/sitemap.xml`, `/robots.txt`, `/es/opengraph-image` y el JSON-LD embebido en el HTML (`"@type"`).

### Google Search Console

`public/google88210860d2a53fdc.html` es el archivo de verificación de propiedad del dominio (método "HTML file"). Se sirve en `https://www.kivio.com.co/google88210860d2a53fdc.html` (el middleware lo deja pasar porque la ruta contiene un punto). **No lo borres**, incluso después de verificar.

Pasos tras el deploy: Search Console → Verificar → Sitemaps → enviar `sitemap.xml`.

### Sistema de vida y originalidad (UI UX Pro Max)

El skill `ui-ux-pro-max` (`.opencode/skills/`) aporta la capa de motion y estilos:

| Capa | Estilo aplicado | Dónde |
| --- | --- | --- |
| Base | AI-Native UI + Dark Mode OLED | Hero, KIVI, sección IA |
| Layout | Bento Box Grid | Productos, metodología IA, casos de uso |
| Profundidad | Glassmorphism + Dimensional layering | Nav, chat demo, chips, formulario |
| Motion | Motion-Driven + Kinetic Typography | Reveals, stagger, parallax, máquina de escribir |
| Detalle | Micro-interactions + acento offset | Botones, cards spotlight, hover |

**Componentes de motion** (`src/components/motion/motion.tsx`):
| Componente | Qué hace | Preset del skill |
| --- | --- | --- |
| `FadeUp` / `Stagger` | Reveals de entrada (300–500 ms, stagger 80 ms) | motion #4/#5 |
| `ScrollText` | Texto que se revela palabra a palabra **al ritmo del scroll** (scrub, rAF, sin re-renders) | motion #6/#9 |
| `RotatingWord` | Palabra rotativa del hero con rollo vertical recortado (sin solapamiento) | motion #5 |
| `ActiveCard` / `ScrollSteps` | Tarjetas de pasos que se iluminan al pasar por el centro del viewport | motion #4 |
| `Parallax` | Capas decorativas (solo desktop ≥1024 px, yPercent 4–6) | motion #13 |
| `Counter` | Métricas que cuentan al entrar en vista | — |
| `Magnetic` | CTA magnético (máx. 1–2 por vista) | motion #3 |
| `SpotlightCard` | Halo que sigue el cursor | micro-interacciones |
| `Typewriter` | Texto progresivo (hero IA + manifiesto) | Kinetic Typography |
| `ScrollCue` / `ScrollProgress` | Indicador de scroll del hero + barra superior | — |

> Nota técnica: el degradado de la palabra rotativa vive en cada palabra (no en la ventana) porque un descendiente con `transform` real rompe `background-clip: text` en Chromium.

**Utilidades CSS** (`globals.css`): `.aurora` (gradient mesh 12–16 s), `.glass`, `.gradient-border`, `.grain`, `.dots-pattern`, `.watermark-number`, `.typing-dot`, `.shadow-accent-hard`.

**Reglas respetadas**: `prefers-reduced-motion` en todo el sitio (estado final estático), contraste ≥ 4.5:1 en ambos temas, focus-visible, targets ≥ 44 px, z-index 50/60, `text-balance` en titulares, marquee con pausa en hover/focus, `scroll-padding-top` para el nav fijo.
"# Kivio.Product.Innovations.KivioPage" 
