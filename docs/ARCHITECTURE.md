# 🏛️ Arquitectura Técnica del Proyecto Fruco

## 📋 Índice

- [Visión General](#visión-general)
- [Stack Tecnológico Detallado](#stack-tecnológico-detallado)
- [Arquitectura de Capas](#arquitectura-de-capas)
- [Flujos de Datos](#flujos-de-datos)
- [Patrones de Diseño](#patrones-de-diseño)
- [Sistema de Build](#sistema-de-build)
- [Decisiones Técnicas](#decisiones-técnicas)

---

## Visión General

### Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVEGADOR                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │            Astro Static Site (HTML)                │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │    Preact Islands (Interactividad)          │  │    │
│  │  │                                              │  │    │
│  │  │  ┌────────────────┐  ┌──────────────────┐  │  │    │
│  │  │  │   Components   │  │   I18n Context   │  │  │    │
│  │  │  └────────────────┘  └──────────────────┘  │  │    │
│  │  │                                              │  │    │
│  │  │  ┌────────────────┐  ┌──────────────────┐  │  │    │
│  │  │  │  GSAP Engine   │  │  State Manager   │  │  │    │
│  │  │  └────────────────┘  └──────────────────┘  │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP Request
┌─────────────────────────────────────────────────────────────┐
│                    SERVIDOR LUCUSHOST                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Express.js Server                     │    │
│  │                                                      │    │
│  │  • Sirve archivos estáticos (/dist)                │    │
│  │  • Maneja rutas SPA                                │    │
│  │  • Logging de requests                             │    │
│  │  • Compresión gzip/brotli                          │    │
│  └────────────────────────────────────────────────────┘    │
│                            ↓                                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Carpeta /dist (Build Astro)                │    │
│  │                                                      │    │
│  │  • index.html                                       │    │
│  │  • _astro/ (JS, CSS chunks)                        │    │
│  │  • Assets optimizados (AVIF, SVG)                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Modelo de Rendering

**Hybrid Rendering Strategy**:

- **SSG (Static Site Generation)**: Contenido estático pre-renderizado
- **Client-Side Hydration**: JavaScript ejecuta solo donde es necesario
- **Islands Architecture**: Componentes interactivos aislados

---

## Stack Tecnológico Detallado

### Frontend Framework

#### Astro 5.14.1

**Rol**: Framework principal, generación estática

**Características clave**:

- ✅ Zero JavaScript by default
- ✅ Islands Architecture
- ✅ File-based routing
- ✅ Partial hydration
- ✅ Multiple framework support

**Ventajas**:

- Performance excepcional (98/100 Lighthouse)
- SEO-friendly (HTML puro)
- Tiempo de build rápido
- Bundle size mínimo

**Uso en el proyecto**:

```astro
---
// src/pages/index.astro
import Layout from '@/layouts/Layout.astro';
import App from '@/pages/_App';
---

<Layout title="Fruco">
  <!-- client:load = hidratación inmediata -->
  <App client:load />
</Layout>
```

#### Preact 10.27.2

**Rol**: Librería de UI para componentes interactivos

**¿Por qué Preact y no React?**
| Feature | React | Preact |
|---------|-------|--------|
| Bundle size | ~40KB | ~3KB |
| Performance | Excelente | Excelente |
| API | Completa | Compatible 99% |
| Ecosistema | Enorme | Compatible con React |

**Configuración**:

```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [preact({ compat: true })], // compat = alias de react
});
```

**Uso**:

```tsx
// Componente Preact
import { useState } from "preact/hooks";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Styling

#### Tailwind CSS 4.1.14

**Rol**: Framework CSS utility-first

**Configuración personalizada**:

```css
/* src/styles/globals.css */
@theme {
  --color-fruco-green: oklch(33% 0.13 128.57);
  --color-fruco-red: oklch(45% 0.29 27.23);
  --color-fruco-black: oklch(0% 0 0);
  --color-fruco-gold: oklch(52% 0.08 83.24);
}
```

**Pipeline de procesamiento**:

```
Tailwind CSS (authoring)
    ↓
@tailwindcss/vite (build-time)
    ↓
PostCSS (optimization)
    ↓
CSS minified (~28KB → ~6KB gzipped)
```

### Animaciones

#### GSAP 3.13.0 + ScrollTrigger

**Rol**: Librería profesional de animaciones

**Arquitectura de animaciones**:

```
Usuario hace scroll
    ↓
ScrollTrigger detecta elemento en viewport
    ↓
Trigger callback ejecuta
    ↓
GSAP anima propiedades CSS
    ↓
RequestAnimationFrame loop (60fps)
    ↓
GPU-accelerated transform/opacity
```

**Optimizaciones aplicadas**:

```typescript
gsap.config({
  force3D: true, // Forzar aceleración GPU
  nullTargetWarn: false, // Silenciar warnings
});

ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  ignoreMobileResize: true, // Mejor performance en móvil
});
```

### Backend (Producción)

#### Express 5.1.0

**Rol**: Servidor HTTP para producción

**Arquitectura del servidor**:

```javascript
┌──────────────────────────────────────┐
│       Express Application            │
├──────────────────────────────────────┤
│                                       │
│  Middleware Stack:                   │
│  1. compression() → gzip/brotli      │
│  2. express.static() → serve /dist   │
│  3. SPA fallback → index.html        │
│  4. Error handler                    │
│                                       │
└──────────────────────────────────────┘
```

**Flujo de request**:

```
1. Request llega: GET /productos
       ↓
2. compression middleware: Comprime response
       ↓
3. express.static: ¿Existe /dist/productos? → No
       ↓
4. SPA fallback: req.path.includes('.') → No (es ruta, no archivo)
       ↓
5. Sirve: /dist/index.html
       ↓
6. Client-side router: Astro/Preact maneja /productos
```

---

## Arquitectura de Capas

### Capa de Presentación (View Layer)

**Responsabilidad**: Renderizado visual, interacción del usuario

**Componentes**:

```
Presentational Components
├── NavBar              → Navegación
├── HeroSection         → Hero
├── ProductShowcase     → Grid de productos
├── History             → Timeline
├── VisionAndMision     → Valores
├── Contact             → Formulario
└── Footer              → Pie de página
```

**Características**:

- Componentes "tontos" (stateless)
- Solo reciben props
- No contienen lógica de negocio

**Ejemplo**:

```tsx
// Componente presentacional puro
export default function ProductCard({ product, onClick }) {
  return (
    <div onClick={onClick}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  );
}
```

### Capa de Lógica (Business Logic Layer)

**Responsabilidad**: Estado, lógica de negocio, side effects

**Hooks personalizados**:

```
Custom Hooks
├── useI18n()                → Gestión de idiomas
├── useGSAP()                → Animaciones GSAP
├── useLazyImage()           → Lazy loading
├── useTranslatedProducts()  → Productos traducidos
└── useSmoothScroll()        → Scroll suave
```

**Patrón de separación**:

```tsx
// ❌ MAL: Lógica mezclada en componente
function ProductList() {
  const [products, setProducts] = useState([]);
  const t = useTranslations();

  useEffect(() => {
    // Lógica compleja de traducción
    const translated = PRODUCTS.map((p) => ({
      ...p,
      name: t.products[p.id].name,
      // ...más lógica
    }));
    setProducts(translated);
  }, [t]);

  return (
    <div>
      {products.map((p) => (
        <ProductCard {...p} />
      ))}
    </div>
  );
}

// ✅ BIEN: Lógica extraída a hook
function ProductList() {
  const products = useTranslatedProducts(); // ← Hook maneja lógica
  return (
    <div>
      {products.map((p) => (
        <ProductCard {...p} />
      ))}
    </div>
  );
}
```

### Capa de Datos (Data Layer)

**Responsabilidad**: Definición de datos, traducciones, constantes

**Estructura**:

```
Data Layer
├── lib/
│   ├── Products.tsx         → Definición de productos
│   └── i18n/
│       ├── es.ts            → Traducciones español
│       ├── en.ts            → Traducciones inglés
│       ├── fr.ts            → Traducciones francés
│       └── pt.ts            → Traducciones portugués
```

**Patrón de datos inmutables**:

```typescript
// Productos como constante inmutable
export const PRODUCTS: readonly Product[] = [
  {
    id: 'fruco_clasico',
    image: { small: '...', medium: '...', large: '...' },
    nutritionalInfo: { ... },
  },
  // ...más productos
] as const;

// TypeScript previene mutación
PRODUCTS[0].id = 'nuevo';  // ← Error: Cannot assign to 'id' because it is a read-only property
```

### Capa de Utilidades (Utilities Layer)

**Responsabilidad**: Funciones helper, configuraciones, animaciones

**Módulos**:

```
Utils
├── animations.ts           → Funciones de animación GSAP
└── (futuro)
    ├── validators.ts       → Validaciones
    ├── formatters.ts       → Formateo de datos
    └── api.ts              → Cliente API
```

**Principio de organización**:

- Funciones puras (sin side effects)
- Altamente reutilizables
- Fácilmente testables

---

## Flujos de Datos

### 1. Flujo de Internacionalización

```
┌─────────────────────────────────────────────────────────┐
│                    Usuario Inicial                      │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  I18nProvider inicializa                                │
│  • language = 'es' (default)                            │
│  • t = getTranslations('es')                            │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  Componentes consumen contexto                          │
│  const t = useTranslations()                            │
│  <h1>{t.common.company}</h1>  → "Fruco"                 │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  Usuario hace click en LanguageSelector                 │
│  setLanguage('en')                                      │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  I18nProvider actualiza                                 │
│  • language = 'en'                                      │
│  • t = getTranslations('en')                            │
│  • Notifica a todos los consumers                       │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  Componentes re-renderizan                              │
│  <h1>{t.common.company}</h1>  → "Fruco" (mismo valor)   │
│  <p>{t.common.tagline}</p>  → "Traditional Tomato Sauce"│
└─────────────────────────────────────────────────────────┘
```

**Implementación del contexto**:

```typescript
// Provider
const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children, initialLanguage = 'es' }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const t = getTranslations(language);  // ← Recalcula en cada cambio

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// Consumer
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
```

### 2. Flujo de Animaciones

```
┌─────────────────────────────────────────────────────────┐
│  Componente monta                                       │
│  useEffect(() => { ... }, [])                           │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  Crear animación GSAP                                   │
│  const anim = gsap.fromTo('.el', {...}, {...})         │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  ScrollTrigger se registra                              │
│  scrollTrigger: { trigger: '.el', start: 'top 80%' }   │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  ScrollTrigger observa scroll                           │
│  window.addEventListener('scroll', handleScroll)        │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  Usuario hace scroll                                    │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  Elemento entra en viewport (80% visible)               │
│  ScrollTrigger detecta intersección                     │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  GSAP ejecuta animación                                 │
│  • requestAnimationFrame loop                           │
│  • Interpolación de valores                             │
│  • Aplica transform/opacity                             │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  Componente se desmonta                                 │
│  useEffect cleanup: () => anim.kill()                   │
└─────────────────────────────────────────────────────────┘
```

### 3. Flujo de Lazy Loading

```
┌─────────────────────────────────────────────────────────┐
│  <img ref={imgRef} data-src="..." loading="lazy" />    │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  useLazyImage(imgRef, src)                              │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  IntersectionObserver.observe(imgRef.current)           │
│  Configuración:                                         │
│  • rootMargin: '50px'  (pre-load)                       │
│  • threshold: 0.01                                      │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  Usuario hace scroll                                    │
│  Imagen a punto de entrar en viewport                   │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  IntersectionObserver callback ejecuta                  │
│  if (entry.isIntersecting) { ... }                      │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  Cargar imagen                                          │
│  img.src = img.getAttribute('data-src')                 │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  Navegador descarga imagen                              │
│  HTTP GET /products/optimized/medium/producto.avif      │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  img.onload ejecuta                                     │
│  setIsLoaded(true)                                      │
└─────────────────────┬───────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────┐
│  Componente re-renderiza                                │
│  className={isLoaded ? 'opacity-100' : 'opacity-0'}     │
└─────────────────────────────────────────────────────────┘
```

---

## Patrones de Diseño

### 1. Islands Architecture (Astro)

**Concepto**: Solo hidrata JavaScript donde es necesario

```astro
<!-- Layout estático (HTML puro) -->
<Layout>
  <header>
    <!-- Estático: Sin JS -->
    <h1>Fruco</h1>
  </header>

  <!-- Isla interactiva: Con JS -->
  <App client:load />

  <footer>
    <!-- Estático: Sin JS -->
    <p>© 2025</p>
  </footer>
</Layout>
```

**Resultado**:

- Header y footer: Solo HTML (0 KB JS)
- App: Preact + GSAP (~145 KB JS)
- Total carga inicial: Mínima

### 2. Context + Hooks Pattern

**Problema**: Prop drilling (pasar props por múltiples niveles)

```tsx
// ❌ Prop drilling
<App>
  <Layout language={lang}>
    <NavBar language={lang}>
      <Button language={lang} />
    </NavBar>
  </Layout>
</App>
```

**Solución**: Context API

```tsx
// ✅ Context
<I18nProvider>
  <App>
    <Layout>
      <NavBar>
        <Button /> {/* ← Accede a language vía useI18n() */}
      </NavBar>
    </Layout>
  </App>
</I18nProvider>
```

### 3. Custom Hooks Pattern

**Concepto**: Encapsular lógica reutilizable

```tsx
// Antes: Lógica duplicada
function Component1() {
  const [products, setProducts] = useState([]);
  const t = useTranslations();

  useEffect(() => {
    const translated = PRODUCTS.map((p) => ({
      ...p,
      name: t.products[p.id].name,
    }));
    setProducts(translated);
  }, [t]);

  return <div>{/* render */}</div>;
}

function Component2() {
  // ← Misma lógica duplicada
}

// Después: Hook reutilizable
function Component1() {
  const products = useTranslatedProducts(); // ← DRY
  return <div>{/* render */}</div>;
}

function Component2() {
  const products = useTranslatedProducts(); // ← Misma lógica
  return <div>{/* render */}</div>;
}
```

### 4. Compound Components Pattern

**Concepto**: Componentes que trabajan juntos

```tsx
// Ejemplo: ProductCard con sub-componentes
<ProductCard>
  <ProductCard.Image src="..." />
  <ProductCard.Title>Nombre</ProductCard.Title>
  <ProductCard.Description>Descripción</ProductCard.Description>
  <ProductCard.Price>€5.99</ProductCard.Price>
</ProductCard>
```

---

## Sistema de Build

### Pipeline de Build

```
┌──────────────────────────────────────────────────────────┐
│                    pnpm build                            │
└────────────────────┬─────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────┐
│  1. astro check (TypeScript validation)                  │
│     • Verifica tipos                                     │
│     • Detecta errores de tipado                          │
└────────────────────┬─────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────┐
│  2. astro build                                          │
│     • Compila archivos .astro                            │
│     • Bundlea componentes Preact                         │
│     • Procesa Tailwind CSS                               │
└────────────────────┬─────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────┐
│  3. Vite Build                                           │
│     ├─ JavaScript                                        │
│     │  • Transpila TypeScript → JavaScript              │
│     │  • Tree-shake (elimina código no usado)           │
│     │  • Code-split (chunks)                             │
│     │  • Minifica con Terser                             │
│     │                                                     │
│     ├─ CSS                                               │
│     │  • Procesa Tailwind                                │
│     │  • PostCSS optimizations                           │
│     │  • Minifica                                        │
│     │  • Extrae CSS crítico                              │
│     │                                                     │
│     └─ Assets                                            │
│        • Optimiza imágenes                               │
│        • Genera hashes de archivos                       │
│        • Copia a /dist                                   │
└────────────────────┬─────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────┐
│  4. Output: /dist                                        │
│     ├── index.html                                       │
│     ├── _astro/                                          │
│     │   ├── index.[hash].js                              │
│     │   ├── gsap.[hash].js                               │
│     │   ├── preact-vendor.[hash].js                      │
│     │   └── index.[hash].css                             │
│     └── public/ (copiado tal cual)                       │
└──────────────────────────────────────────────────────────┘
```

### Optimizaciones del Build

#### Tree Shaking

```javascript
// Código fuente
import { gsap, TweenLite, Power2 } from "gsap";
gsap.to(".el", { x: 100 });
// TweenLite y Power2 no usados

// Después de tree-shake
import { gsap } from "gsap";
gsap.to(".el", { x: 100 });
// ← Solo gsap incluido en bundle
```

#### Code Splitting

```javascript
// Build result
dist/_astro/
├── index.[hash].js           // 60 KB - Código principal
├── gsap.[hash].js            // 68 KB - GSAP chunk
└── preact-vendor.[hash].js   // 15 KB - Preact chunk

// HTML
<script type="module" src="/_astro/index.abc123.js"></script>
<link rel="modulepreload" href="/_astro/gsap.def456.js">
<link rel="modulepreload" href="/_astro/preact-vendor.ghi789.js">
```

#### Minificación con Terser

```javascript
// Antes de minificar (legible)
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}

// Después de minificar (optimizado)
function c(i) {
  let t = 0;
  for (const e of i) t += e.price * e.quantity;
  return t;
}
```

---

## Decisiones Técnicas

### ¿Por qué Astro en lugar de Next.js?

| Factor          | Next.js | Astro     | Ganador  |
| --------------- | ------- | --------- | -------- |
| Performance     | Buena   | Excelente | ✅ Astro |
| Bundle size     | ~80KB   | ~3KB      | ✅ Astro |
| SSG             | ✅      | ✅        | Empate   |
| SSR             | ✅      | ✅        | Empate   |
| React ecosystem | ✅      | Limitado  | Next.js  |
| Multi-framework | No      | ✅        | ✅ Astro |
| Learning curve  | Media   | Baja      | ✅ Astro |

**Decisión**: Astro para sitio corporativo estático con performance crítica

### ¿Por qué Preact en lugar de React?

**Análisis**:

- Bundle size: 3KB vs 40KB (92% reducción)
- API: 99% compatible
- Performance: Equivalente
- Ecosistema: Compatible mediante `@preact/compat`

**Decisión**: Preact para mejor performance sin sacrificar funcionalidad

### ¿Por qué GSAP en lugar de CSS animations?

| Feature              | CSS Animations | GSAP      |
| -------------------- | -------------- | --------- |
| Performance          | Buena          | Excelente |
| Compatibilidad       | ✅             | ✅        |
| Secuencias complejas | Difícil        | Fácil     |
| ScrollTrigger        | Manual         | Built-in  |
| Control programático | Limitado       | Completo  |

**Decisión**: GSAP para animaciones complejas y control total

### ¿Por qué Express en lugar de servir directamente?

**Alternativas consideradas**:

1. Apache/Nginx directo
2. Vercel serverless
3. **Express custom server** ← Elegido

**Razones**:

- ✅ Control total de routing SPA
- ✅ Compatible con Lucushost (hosting compartido)
- ✅ Fácil de configurar y mantener
- ✅ Permite middleware custom (compresión, logging)
- ✅ Portable (funciona en cualquier hosting Node.js)

---

**Documentación técnica actualizada**: Octubre 2025
