# 📖 Guía Rápida de Referencia

## 🎯 Quick Start

```bash
# Clonar e instalar
git clone https://github.com/zkjon/fruco.git
cd fruco
pnpm install

# Desarrollo
pnpm dev          # → http://localhost:4321

# Producción
pnpm build        # Build optimizado
pnpm start        # Servidor local → http://localhost:3000
```

---

## 📂 Ubicaciones Clave

| Necesitas           | Archivo/Carpeta                      |
| ------------------- | ------------------------------------ |
| Agregar componente  | `src/components/NuevoComponente.tsx` |
| Modificar estilos   | `src/styles/globals.css`             |
| Agregar idioma      | `src/lib/i18n/nuevo.ts`              |
| Agregar producto    | `src/lib/Products.tsx`               |
| Configurar build    | `astro.config.mjs`                   |
| Configurar servidor | `server.js`                          |
| Agregar animación   | `src/utils/animations.ts`            |

---

## 🎨 Componentes Rápidos

### Usar Traducciones

```tsx
import { useTranslations } from "@/hooks/useI18n";

function MyComponent() {
  const t = useTranslations();
  return <h1>{t.common.company}</h1>;
}
```

### Cambiar Idioma

```tsx
import { useI18n } from "@/hooks/useI18n";

function LanguageButton() {
  const { setLanguage } = useI18n();
  return <button onClick={() => setLanguage("en")}>English</button>;
}
```

### Lazy Loading de Imagen

```tsx
import { useRef } from "preact/hooks";
import { useLazyImage } from "@/hooks/useLazyImage";

function Image({ src, alt }) {
  const imgRef = useRef(null);
  const { isLoaded } = useLazyImage(imgRef, src);

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      className={isLoaded ? "loaded" : "loading"}
    />
  );
}
```

### Animación Simple

```tsx
import { useEffect } from "preact/hooks";
import { gsap } from "gsap";

function AnimatedBox() {
  useEffect(() => {
    gsap.fromTo(
      ".box",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 },
    );
  }, []);

  return <div className="box">Animado!</div>;
}
```

### Animación con ScrollTrigger

```tsx
import { useEffect } from "preact/hooks";
import { fadeInOnScroll } from "@/utils/animations";

function ScrollAnimated() {
  useEffect(() => {
    fadeInOnScroll(".element");
  }, []);

  return <div className="element">Aparece en scroll</div>;
}
```

---

## 🎨 Clases Tailwind Útiles

### Layout

```css
/* Contenedor de sección */
.section-container

/* Glassmorphism */
bg-white/10 backdrop-blur-md border border-white/20

/* Grid responsivo */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8

/* Flexbox centrado */
flex items-center justify-center

/* Padding responsivo */
px-4 md:px-8 lg:px-16
```

### Colores del Tema

```css
/* Colores Fruco */
bg-fruco-green      /* Verde principal */
bg-fruco-red        /* Rojo acento */
bg-fruco-black      /* Negro de fondo */
bg-fruco-gold       /* Dorado */

text-fruco-green
border-fruco-red
```

### Animaciones CSS

```css
/* Fade in */
animate-[fadeIn_1s_ease-in-out]

/* Slide up */
animate-[slideUp_0.8s_ease-out]

/* Transiciones */
transition-all duration-300 ease-out
hover:scale-105
```

---

## 🔧 Scripts Npm

```bash
# Desarrollo
pnpm dev              # Dev server con HMR

# Build
pnpm build            # Build de producción
pnpm serve            # Build + Start

# Servidor
pnpm start            # Inicia Express

# Calidad
pnpm lint             # ESLint con auto-fix
pnpm format           # Prettier
```

---

## 🌍 Agregar Nuevo Idioma

### 1. Crear archivo de traducciones

```typescript
// src/lib/i18n/de.ts
export const de: Translations = {
  common: {
    company: "Fruco",
    tagline: "Authentische Tomatensauce",
    since: "Seit 1959",
  },
  // ... resto de traducciones
};
```

### 2. Agregar al index

```typescript
// src/lib/i18n/index.ts
import { de } from "./de";

export const translations = {
  es,
  en,
  fr,
  pt,
  de, // ← Nuevo idioma
};
```

### 3. Actualizar tipo

```typescript
// src/lib/i18n/types.ts
export type Language = "es" | "en" | "fr" | "pt" | "de";
```

### 4. Agregar bandera

```
public/flags/de.svg
```

### 5. Agregar al selector

```tsx
// src/components/LanguageSelector.tsx
const languages = [
  // ...existentes
  { code: "de", flag: "/flags/de.svg", name: "Deutsch" },
];
```

---

## 🖼️ Agregar Nuevas Imágenes

### Estructura requerida

```
public/products/optimized/
├── small/nuevo_producto.avif       # 320px
├── medium/nuevo_producto.avif      # 640px
└── large/nuevo_producto.avif       # 1024px
```

### Conversión a AVIF

```bash
# Con Squoosh CLI
npx @squoosh/cli --avif auto imagen.jpg

# Con ImageMagick
magick convert imagen.jpg -quality 75 imagen.avif

# Batch (Windows PowerShell)
Get-ChildItem *.jpg | ForEach-Object {
  npx @squoosh/cli --avif auto $_.FullName
}
```

### Uso en componente

```tsx
<img
  src="/products/optimized/medium/producto.avif"
  srcSet="
    /products/optimized/small/producto.avif 320w,
    /products/optimized/medium/producto.avif 640w,
    /products/optimized/large/producto.avif 1024w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Producto"
  loading="lazy"
/>
```

---

## 📦 Agregar Nuevo Producto

### 1. Definir en Products.tsx

```typescript
// src/lib/Products.tsx
export const PRODUCTS = [
  // ...existentes
  {
    id: "nuevo_producto",
    image: {
      small: "/products/optimized/small/nuevo.avif",
      medium: "/products/optimized/medium/nuevo.avif",
      large: "/products/optimized/large/nuevo.avif",
    },
    nutritionalInfo: {
      calories: 120,
      proteins: 2.5,
      carbs: 18,
      fats: 3.5,
    },
  },
];
```

### 2. Agregar traducciones

```typescript
// src/lib/i18n/es.ts
products: {
  nuevo_producto: {
    name: "Nombre del Producto",
    description: "Descripción corta",
    detailedDescription: "Descripción larga...",
    ingredients: ["Tomate", "Aceite", "Sal"],
  }
}

// Repetir para en.ts, fr.ts, pt.ts
```

---

## 🎬 Crear Nueva Animación

### Animación simple

```typescript
// src/utils/animations.ts
export const myAnimation = (element: string | Element) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -100 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
    },
  );
};
```

### Con ScrollTrigger

```typescript
export const myScrollAnimation = (element: string | Element) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    },
  );
};
```

### Uso en componente

```tsx
import { useEffect } from "preact/hooks";
import { myAnimation } from "@/utils/animations";

function MyComponent() {
  useEffect(() => {
    myAnimation(".my-element");
  }, []);

  return <div className="my-element">Contenido</div>;
}
```

---

## 🐛 Debugging

### Ver logs de GSAP

```javascript
gsap.config({ trialWarn: false });
ScrollTrigger.config({ logWarnings: true });
```

### Inspeccionar ScrollTriggers

```javascript
// En consola del navegador
ScrollTrigger.getAll(); // Ver todos
ScrollTrigger.getById("myTrigger"); // Por ID
ScrollTrigger.refresh(); // Recalcular
```

### Ver bundle analysis

```bash
pnpm build
# Abrir dist/stats.html en navegador
```

### Testing de performance

```bash
# Lighthouse
npx lighthouse http://localhost:3000 --view

# Web Vitals
npm install -g web-vitals-cli
web-vitals http://localhost:3000
```

---

## 🚀 Deployment Rápido

### Build y deploy

```bash
# 1. Build
pnpm build

# 2. Test local
pnpm start

# 3. Subir a servidor (SFTP)
# dist/, server.js, package.json, pnpm-lock.yaml

# 4. En servidor
ssh usuario@servidor.com
cd public_html
pnpm install --prod
pm2 start server.js --name fruco
pm2 save
```

### Actualizar sitio

```bash
# Local
pnpm build

# Servidor
ssh usuario@servidor.com
cd public_html
# Subir nueva carpeta dist/
pm2 restart fruco
```

---

## 🔍 Troubleshooting Rápido

| Problema                  | Solución                                               |
| ------------------------- | ------------------------------------------------------ |
| Hot reload no funciona    | Reiniciar `pnpm dev`                                   |
| Build falla               | `rm -rf node_modules dist .astro && pnpm install`      |
| Imágenes no cargan        | Verificar rutas en `/public`                           |
| Animaciones no se ven     | Verificar que GSAP esté importado                      |
| Traducciones no cambian   | Verificar que componente está dentro de `I18nProvider` |
| Port 3000 ocupado         | `PORT=3001 pnpm start`                                 |
| ScrollTrigger no funciona | Llamar `ScrollTrigger.refresh()`                       |
| TypeScript errors         | `pnpm astro check`                                     |

---

## 📚 Recursos Externos

### Documentación Oficial

- **Astro**: https://docs.astro.build
- **Preact**: https://preactjs.com/guide/v10/getting-started
- **Tailwind**: https://tailwindcss.com/docs
- **GSAP**: https://greensock.com/docs/v3/GSAP
- **ScrollTrigger**: https://greensock.com/docs/v3/Plugins/ScrollTrigger

### Herramientas

- **AVIF Converter**: https://squoosh.app
- **Lighthouse**: Chrome DevTools → Lighthouse tab
- **WebPageTest**: https://www.webpagetest.org
- **Bundle Analyzer**: Incluido en build

### Cheatsheets

- **Tailwind**: https://nerdcave.com/tailwind-cheat-sheet
- **GSAP**: https://ihatetomatoes.net/wp-content/uploads/2016/07/GreenSock-Cheatsheet-4.pdf
- **Git**: https://education.github.com/git-cheat-sheet-education.pdf

---

## 💡 Tips y Tricks

### Performance

```typescript
// Usar useMemo para cálculos costosos
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Usar useCallback para funciones
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

### Animaciones

```typescript
// Matar animaciones al desmontar
useEffect(() => {
  const anim = gsap.to(".el", { x: 100 });
  return () => anim.kill();
}, []);

// Batch animations para mejor performance
gsap.set([".el1", ".el2", ".el3"], { opacity: 0 });
```

### Debugging

```typescript
// Log de re-renders
useEffect(() => {
  console.log("Component rendered");
});

// Performance measurement
const start = performance.now();
// código costoso
console.log(`Took ${performance.now() - start}ms`);
```

---

## 🎓 Aprender Más

### Tutoriales Recomendados

1. **Astro**: "Build faster websites" - docs.astro.build
2. **GSAP**: GreenSock Learning Center - greensock.com/learning
3. **Tailwind**: "Utility-First CSS" - tailwindcss.com/docs
4. **Performance**: web.dev/learn-web-vitals

### Proyectos Similar para Inspiración

- https://github.com/withastro/astro
- https://github.com/saadeghi/daisyui
- https://github.com/pacocoursey/next-themes

---

**Última actualización**: Octubre 2025

_¿Necesitas más ayuda? Consulta la documentación completa en `/docs`_
