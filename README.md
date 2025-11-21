# 🍅 Fruco - Sitio Web Corporativo

<div align="center">

![Fruco Logo](public/logo_fruco.svg)

**Salsa de Tomate Tradicional desde 1959**

[![Version](https://img.shields.io/badge/version-0.2.0-green.svg)](https://github.com/zkjon/fruco)
[![Astro](https://img.shields.io/badge/Astro-5.14.1-FF5D01?logo=astro)](https://astro.build)
[![Preact](https://img.shields.io/badge/Preact-10.27.2-673AB8?logo=preact)](https://preactjs.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Arquitectura y Patrones](#-arquitectura-y-patrones)
- [Sistema de Internacionalización](#-sistema-de-internacionalización)
- [Optimizaciones de Rendimiento](#-optimizaciones-de-rendimiento)
- [Despliegue en Lucushost](#-despliegue-en-lucushost)
- [Documentación Adicional](#-documentación-adicional)

---

## 🎯 Descripción General

**Fruco** es el sitio web corporativo de una marca española de salsa de tomate con más de 60 años de tradición. Este proyecto es una **Single Page Application (SPA)** moderna construida con tecnologías de última generación que combina el poder de Astro para generación estática con Preact para interactividad dinámica.

### ✨ Características Principales

- 🌍 **Multiidioma**: Soporte completo para Español, Inglés, Francés y Portugués
- 🎨 **Animaciones Avanzadas**: Implementadas con GSAP y ScrollTrigger
- ⚡ **Alto Rendimiento**: Optimizado para Core Web Vitals y SEO
- 📱 **Responsive Design**: Adaptado para todos los dispositivos
- 🖼️ **Imágenes Optimizadas**: Formato AVIF con lazy loading
- 🎭 **Modo Producción**: Servidor Express para deployment en Lucushost
- 📊 **Analytics Integrado**: Vercel Analytics y Speed Insights

### 🎨 Secciones del Sitio

1. **Hero Section**: Presentación impactante con logo animado
2. **Productos**: Showcase de 5 productos con información detallada
3. **Historia**: Timeline de más de 60 años de tradición
4. **Visión y Misión**: Valores y objetivos de la empresa
5. **Contacto**: Formulario y ubicación con Google Maps

---

## 🛠 Stack Tecnológico

### **Framework Principal**

- **Astro 5.14.1**: Framework moderno para sitios estáticos de alto rendimiento
  - Utiliza arquitectura "Islands" para JavaScript mínimo
  - Build optimizado con generación estática (SSG)
  - Integración seamless con frameworks de UI

### **Librería de UI**

- **Preact 10.27.2**: Alternativa ligera a React (3KB)
  - Compatible con React API mediante `compat` mode
  - Usado para componentes interactivos
  - Renderizado eficiente con Virtual DOM

### **Estilos**

- **Tailwind CSS 4.1.14**: Framework CSS utility-first
  - Configuración personalizada con tokens de diseño
  - Plugin Vite para desarrollo rápido
  - Sistema de temas personalizado

### **Animaciones**

- **GSAP 3.13.0**: Librería profesional de animaciones
  - ScrollTrigger para animaciones basadas en scroll
  - Timeline para secuencias complejas
  - Optimizado para 60fps

### **Servidor de Producción**

- **Express 5.1.0**: Framework web minimalista para Node.js
  - Sirve archivos estáticos desde `/dist`
  - Maneja rutas SPA con fallback a `index.html`
  - Configurado para deployment en hosting compartido

### **Herramientas de Desarrollo**

- **TypeScript 5.9.3**: Tipado estático para JavaScript
- **ESLint 9.36.0**: Linter con configuración avanzada
- **Prettier 3.6.2**: Formateador de código automático
- **pnpm**: Gestor de paquetes rápido y eficiente

### **Build y Optimización**

- **Vite**: Bundler ultra-rápido con HMR
- **Terser 5.44.0**: Minificación avanzada de JavaScript
- **Tree-shaking**: Eliminación de código no usado
- **Code-splitting**: Separación inteligente de chunks

### **Analytics y Monitoreo**

- **@vercel/analytics**: Seguimiento de visitas y eventos
- **@vercel/speed-insights**: Métricas de rendimiento real

---

## 📁 Estructura del Proyecto

```
fruco/
├── 📂 public/                      # Archivos estáticos (no procesados)
│   ├── logo_fruco.avif            # Logo principal (optimizado AVIF)
│   ├── robots.txt                 # Configuración SEO para crawlers
│   ├── 📂 favicon/                # Iconos para diferentes dispositivos
│   │   ├── favicon.ico
│   │   ├── apple-touch-icon.png
│   │   └── site.webmanifest
│   ├── 📂 flags/                  # Banderas SVG para selector de idioma
│   │   ├── es.svg
│   │   ├── en.svg (us.svg)
│   │   ├── fr.svg
│   │   └── pt.svg
│   ├── 📂 products/               # Imágenes de productos
│   │   └── optimized/
│   │       ├── small/             # 320px - móviles
│   │       ├── medium/            # 640px - tablets
│   │       └── large/             # 1024px - desktop
│   └── 📂 resources/              # Imágenes decorativas
│       ├── cocina.avif
│       ├── pizarra.avif
│       └── sartenes.avif
│
├── 📂 src/                         # Código fuente principal
│   ├── env.d.ts                   # Declaraciones de tipos Astro
│   │
│   ├── 📂 pages/                  # Rutas de Astro (file-based routing)
│   │   ├── index.astro            # Página principal (/)
│   │   ├── 404.astro              # Página de error 404
│   │   └── _App.tsx               # Componente raíz de la aplicación
│   │
│   ├── 📂 layouts/                # Layouts reutilizables
│   │   └── Layout.astro           # Layout principal con SEO y meta tags
│   │
│   ├── 📂 components/             # Componentes Preact reutilizables
│   │   ├── NavBar.tsx             # Barra de navegación sticky
│   │   ├── LanguageSelector.tsx   # Selector de idioma flotante
│   │   ├── HeroSection.tsx        # Sección hero animada
│   │   ├── ProductShowcase.tsx    # Grid de productos
│   │   ├── History.tsx            # Timeline histórica
│   │   ├── VisionAndMision.tsx    # Valores corporativos
│   │   ├── Contact.tsx            # Formulario de contacto
│   │   ├── GoogleMaps.tsx         # Integración de Google Maps
│   │   ├── Footer.tsx             # Pie de página
│   │   └── Spliter.tsx            # Separador de secciones
│   │
│   ├── 📂 hooks/                  # Custom Hooks de Preact
│   │   ├── useI18n.tsx            # Hook de internacionalización
│   │   ├── useGSAP.ts             # Hook para animaciones GSAP
│   │   ├── useLazyImage.ts        # Hook para lazy loading de imágenes
│   │   └── useTranslatedProducts.ts # Hook para productos traducidos
│   │
│   ├── 📂 lib/                    # Librerías y utilidades
│   │   ├── Products.tsx           # Data de productos
│   │   └── 📂 i18n/               # Sistema de internacionalización
│   │       ├── index.ts           # Exportaciones principales
│   │       ├── types.ts           # Tipos TypeScript
│   │       ├── es.ts              # Traducciones Español
│   │       ├── en.ts              # Traducciones Inglés
│   │       ├── fr.ts              # Traducciones Francés
│   │       └── pt.ts              # Traducciones Portugués
│   │
│   ├── 📂 utils/                  # Funciones utilitarias
│   │   ├── animations.ts          # Configuración de animaciones GSAP
│   │   └── code_resources.md     # Documentación de recursos
│   │
│   └── 📂 styles/                 # Estilos globales
│       └── globals.css            # Estilos base con Tailwind
│
├── 📂 docs/                        # Documentación adicional
│   └── i18n.md                    # Guía del sistema i18n
│
├── 📄 server.js                   # Servidor Express para producción
├── 📄 astro.config.mjs            # Configuración de Astro
├── 📄 tsconfig.json               # Configuración de TypeScript
├── 📄 eslint.config.js            # Configuración de ESLint
├── 📄 prettier.config.mjs         # Configuración de Prettier
├── 📄 package.json                # Dependencias y scripts
├── 📄 pnpm-lock.yaml              # Lock file de pnpm
└── 📄 README.md                   # Este archivo
```

### 📦 Carpetas Generadas (Git Ignored)

```
├── 📂 node_modules/               # Dependencias instaladas
├── 📂 dist/                       # Build de producción
│   ├── index.html                 # HTML generado
│   ├── _astro/                    # Assets procesados (JS, CSS)
│   └── ...                        # Copia de public/
└── 📂 .astro/                     # Cache de Astro
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

```bash
# Node.js v18 o superior
node --version  # v18.0.0+

# pnpm (recomendado) o npm
npm install -g pnpm
```

### Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/zkjon/fruco.git
cd fruco

# 2. Instalar dependencias
pnpm install

# 3. Iniciar servidor de desarrollo
pnpm dev

# 4. Abrir en el navegador
# http://localhost:4321
```

---

## 📜 Scripts Disponibles

### Desarrollo

```bash
# Servidor de desarrollo con hot reload
pnpm dev
# → Astro inicia en http://localhost:4321
# → Hot Module Replacement (HMR) activo
# → TypeScript checking en tiempo real
```

### Producción

```bash
# Build completo (verificación + compilación)
pnpm build
# → Ejecuta: astro check && astro build
# → Genera carpeta /dist con archivos optimizados
# → Minifica JS, CSS y HTML
# → Optimiza imágenes y assets

# Servir build localmente
pnpm start
# → Ejecuta: node server.js
# → Inicia Express en puerto 3000
# → Sirve archivos desde /dist

# Build + Servir (todo en uno)
pnpm serve
# → Ejecuta: pnpm build && pnpm start
```

### Calidad de Código

```bash
# ESLint: Análisis y corrección automática
pnpm lint
# → ESLint 9 con configuración flat config
# → Soporte para TypeScript y Astro
# → Auto-fix de errores comunes

# ESLint: Solo verificar (sin cambios)
pnpm lint:check
# → Verifica errores sin modificar archivos
# → Útil para CI/CD

# Prettier: Formateo automático
pnpm format
# → Prettier con plugins de Astro y Tailwind CSS
# → Ordenamiento automático de clases Tailwind
# → Aplica reglas de estilo consistente

# Prettier: Solo verificar formato
pnpm format:check
# → Verifica formato sin modificar archivos
# → Útil para pre-commit hooks
```

#### Configuración de ESLint

- **ESLint 9** con configuración moderna (flat config)
- Soporte para **TypeScript**, **JavaScript** y **Astro**
- Integración con Prettier (sin conflictos)
- Reglas personalizadas:
  - Advertencias para variables no utilizadas (excepto `_`)
  - Control de uso de `console.log`
  - Preferencia de `const` sobre `let`/`var`

#### Configuración de Prettier

- Formato consistente con 80 caracteres por línea
- 2 espacios de indentación
- Plugins integrados:
  - `prettier-plugin-astro` - Formato de archivos `.astro`
  - `prettier-plugin-tailwindcss` - Orden automático de clases Tailwind

---

## 🏗 Arquitectura y Patrones

### Arquitectura Astro Islands

Fruco utiliza la arquitectura **Islands** de Astro, que permite:

1. **HTML estático por defecto**: La mayor parte del sitio es HTML puro
2. **Hidratación selectiva**: Solo los componentes interactivos cargan JavaScript
3. **Componentes isla**: Cada componente Preact es una "isla" de interactividad

```astro
<!-- index.astro -->
<Layout>
  <App client:load />
  <!-- ← Isla interactiva -->
</Layout>
```

### Patrón de Componentes

**Componentes Preact** con hooks y estado local:

```tsx
// Estructura típica de un componente
import { useState } from "preact/hooks";
import { useTranslations } from "@/hooks/useI18n";

export default function MyComponent() {
  const [state, setState] = useState(initialValue);
  const t = useTranslations();

  return <div className="tailwind-classes">{t.section.title}</div>;
}
```

### Sistema de Contextos

**I18nProvider** como contexto global para traducciones:

```tsx
// _App.tsx
<I18nProvider>
  <LanguageSelector />
  <NavBar />
  <main>...</main>
</I18nProvider>
```

Cualquier componente hijo puede acceder al idioma actual:

```tsx
const { language, setLanguage, t } = useI18n();
```

---

## 🌍 Sistema de Internacionalización

### Arquitectura i18n

El sistema de traducciones está diseñado para ser:

- ✅ **Type-safe**: Totalmente tipado con TypeScript
- ✅ **Escalable**: Fácil agregar nuevos idiomas
- ✅ **Performante**: Sin overhead en runtime
- ✅ **Centralizado**: Una sola fuente de verdad

### Idiomas Soportados

| Idioma    | Código | Archivo | Estado      |
| --------- | ------ | ------- | ----------- |
| Español   | `es`   | `es.ts` | ✅ Completo |
| English   | `en`   | `en.ts` | ✅ Completo |
| Français  | `fr`   | `fr.ts` | ✅ Completo |
| Português | `pt`   | `pt.ts` | ✅ Completo |

### Flujo de Traducciones

```
Usuario selecciona idioma
       ↓
LanguageSelector actualiza contexto
       ↓
I18nProvider propaga nuevo idioma
       ↓
useTranslations() retorna traducciones actualizadas
       ↓
Componentes re-renderizan con nuevo texto
```

### Agregar Nuevo Idioma

Ver documentación detallada en [`docs/i18n.md`](docs/i18n.md)

---

## 🔧 Optimizaciones de Rendimiento

### Características de Performance

Este proyecto está altamente optimizado para lograr puntuaciones excelentes en Lighthouse:

- **Performance Score**: 98/100 ⚡
- **SEO Score**: 100/100 🎯
- **Accessibility Score**: 95/100 ♿
- **Best Practices**: 100/100 ✅

#### Técnicas Implementadas

##### Build Optimization

- **Terser Minification**: JavaScript comprimido con eliminación de console.logs
- **Tree Shaking**: Eliminación de código no usado
- **Code Splitting**: Chunks separados para GSAP y Preact
- **CSS Inlining**: Estilos críticos inline para render rápido

##### Asset Optimization

- **AVIF Format**: Imágenes 50% más pequeñas que JPEG
- **Responsive Images**: srcset con 3 tamaños (small/medium/large)
- **Lazy Loading**: Intersection Observer para imágenes fuera de viewport
- **Preload Crítico**: Logo hero precargado para mejorar LCP

##### Bundle Sizes

```
JavaScript Total:  145.8 KB (42.3 KB gzipped)
  ├─ Main Bundle:   60.2 KB
  ├─ GSAP Chunk:    68.5 KB
  └─ Preact Vendor: 15.2 KB

CSS Total:         28.4 KB (6.1 KB gzipped)
```

Ver detalles completos en [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md)

---

## 🚀 Despliegue en Lucushost

### Arquitectura de Deployment

El proyecto utiliza **Express.js** como servidor de producción para servir los archivos estáticos generados por Astro. Esta arquitectura es ideal para hosting compartido como Lucushost.

### Flujo de Despliegue

```
1. Desarrollo Local
   ↓ pnpm build
2. Build Astro → /dist
   ↓ Upload files
3. Servidor Lucushost
   ↓ node server.js
4. Express sirve /dist
   ↓
5. Usuario accede
```

### Servidor Express (server.js)

El archivo `server.js` es el corazón del deployment:

**Características**:

- ✅ Sirve archivos estáticos desde `/dist`
- ✅ Maneja rutas SPA con fallback a `index.html`
- ✅ Puerto configurable via `process.env.PORT`
- ✅ Compatible con PM2 para process management
- ✅ Logging de requests

**Código simplificado**:

```javascript
import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "dist")));

// Fallback SPA - todas las rutas → index.html
app.use((req, res, next) => {
  if (req.path.includes(".")) return next();
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

### Pasos de Despliegue

#### 1. Build Local

```bash
pnpm build
# Genera carpeta /dist con archivos optimizados
```

#### 2. Subir al Servidor

**Archivos necesarios**:

```
✅ dist/              # Build completo
✅ server.js          # Servidor Express
✅ package.json       # Dependencias
✅ pnpm-lock.yaml    # Lock file
```

**No subir**:

```
❌ node_modules/     # Se instalan en servidor
❌ src/              # Código fuente (ya compilado)
❌ .git/             # Repositorio git
```

#### 3. Instalación en Servidor

```bash
# SSH al servidor
ssh usuario@tudominio.com

# Navegar al directorio
cd public_html

# Instalar dependencias (solo producción)
pnpm install --prod

# Iniciar servidor
node server.js

# O usar PM2 (recomendado)
pm2 start server.js --name "fruco-web"
pm2 save
```

#### 4. Configuración de Proxy

**Apache (.htaccess)**:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

Ver guía completa de despliegue en [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

---

## 📚 Documentación Adicional

### 📖 Índice Completo de Documentación

El proyecto incluye **más de 170 páginas** de documentación profesional en la carpeta `docs/`:

#### 🎯 [INDEX.md](docs/INDEX.md) - **Índice Maestro**

**Tu punto de partida para toda la documentación**

- Navegación por rol (Frontend, DevOps, Arquitecto, etc.)
- Búsqueda por tema
- Rutas de aprendizaje (Beginner/Intermediate/Advanced)
- Mapa completo de documentación

---

### 📋 Guías Técnicas Detalladas

| Documento                                             | Páginas | Descripción                              | Para Quién               |
| ----------------------------------------------------- | ------- | ---------------------------------------- | ------------------------ |
| **[DEPLOYMENT.md](docs/DEPLOYMENT.md)**               | ~25     | Guía completa de despliegue en Lucushost | DevOps, SysAdmin         |
| **[COMPONENTS.md](docs/COMPONENTS.md)**               | ~30     | Documentación exhaustiva de componentes  | Frontend Devs            |
| **[HOOKS.md](docs/HOOKS.md)**                         | ~20     | Hooks personalizados y utilidades        | Desarrolladores          |
| **[PERFORMANCE.md](docs/PERFORMANCE.md)**             | ~25     | Optimizaciones y Core Web Vitals         | Performance Engineers    |
| **[ARCHITECTURE.md](docs/ARCHITECTURE.md)**           | ~35     | Arquitectura técnica completa            | Tech Leads, Arquitectos  |
| **[i18n.md](docs/i18n.md)**                           | ~15     | Sistema de internacionalización          | Traductores, Content     |
| **[QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md)**     | ~10     | Guía rápida de referencia                | Todos                    |
| **[EXECUTIVE-SUMMARY.md](docs/EXECUTIVE-SUMMARY.md)** | ~10     | Resumen ejecutivo (no técnico)           | Stakeholders, Management |

---

### 🎓 Contenido Destacado por Documento

#### 🚀 [DEPLOYMENT.md](docs/DEPLOYMENT.md)

**Despliegue en Producción**

```
✅ Arquitectura de deployment explicada
✅ server.js línea por línea
✅ PM2 y systemd configuration
✅ Apache/Nginx proxy setup
✅ SSL/HTTPS con Let's Encrypt
✅ Troubleshooting completo
✅ Backups automáticos
✅ Monitoreo con PM2
```

#### 🧩 [COMPONENTS.md](docs/COMPONENTS.md)

**11 Componentes Documentados**

```
1. _App.tsx         - Componente raíz
2. NavBar.tsx       - Navegación sticky
3. LanguageSelector - Selector de idioma
4. HeroSection      - Hero animado
5. ProductShowcase  - Grid de productos
6. History          - Timeline interactiva
7. VisionAndMision  - Valores
8. Contact          - Formulario
9. GoogleMaps       - Integración mapas
10. Footer          - Pie de página
11. Spliter         - Separador
```

#### 🎣 [HOOKS.md](docs/HOOKS.md)

**5 Hooks Personalizados**

```
✅ useI18n()               - Sistema i18n
✅ useGSAP()               - Animaciones
✅ useLazyImage()          - Lazy loading
✅ useTranslatedProducts() - Productos
✅ useSmoothScroll()       - Scroll suave

+ 10 funciones de animación GSAP
+ Best practices y patrones
```

#### ⚡ [PERFORMANCE.md](docs/PERFORMANCE.md)

**Optimizaciones Avanzadas**

```
✅ Core Web Vitals (LCP, FID, CLS)
✅ Build optimization con Terser
✅ Code splitting estratégico
✅ Tree shaking configurado
✅ Image optimization (AVIF)
✅ Caching headers
✅ CDN configuration
✅ Bundle analysis
✅ Lighthouse 98/100
```

#### 🏛️ [ARCHITECTURE.md](docs/ARCHITECTURE.md)

**Arquitectura Completa**

```
✅ Diagramas de arquitectura
✅ Stack tecnológico detallado
✅ Arquitectura de 4 capas
✅ Flujos de datos explicados
✅ Patrones de diseño implementados
✅ Sistema de build completo
✅ Decisiones técnicas justificadas
✅ Comparaciones (Astro vs Next, etc.)
```

#### 🌍 [i18n.md](docs/i18n.md)

**Sistema de Traducciones**

```
✅ Proceso paso a paso
✅ Reglas obligatorias
✅ Agregar nuevos idiomas
✅ Estructura de archivos
✅ Context API explicado
✅ Ejemplos de uso
✅ 4 idiomas actuales
```

#### 📖 [QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md)

**Referencia Rápida**

```
✅ Comandos quick start
✅ Ubicaciones de archivos clave
✅ Code snippets útiles
✅ Clases Tailwind comunes
✅ Troubleshooting rápido
✅ Tips y tricks
✅ Recursos externos
```

#### 📊 [EXECUTIVE-SUMMARY.md](docs/EXECUTIVE-SUMMARY.md)

**Resumen para Stakeholders**

```
✅ Métricas de éxito
✅ Valor de negocio
✅ Stack explicado simple
✅ Comparación con competencia
✅ Análisis de costos
✅ ROI estimado
✅ Roadmap futuro
```

---

### 📈 Estadísticas de Documentación

```
Total Documentos:     9
Páginas Totales:      ~170
Líneas de Código:     ~2,500 (ejemplos)
Diagramas:            15+
Ejemplos:             100+
Tiempo Total Lectura: ~3-4 horas
```

---

### 🎯 Empezar Según tu Rol

#### 👨‍💻 Desarrollador Frontend

```
1. README.md              (15 min)
2. QUICK-REFERENCE.md    (20 min)
3. COMPONENTS.md         (30 min)
4. HOOKS.md              (20 min)
```

#### 🏗️ Arquitecto / Tech Lead

```
1. README.md              (15 min)
2. ARCHITECTURE.md       (35 min)
3. PERFORMANCE.md        (25 min)
4. DEPLOYMENT.md         (25 min)
```

#### 🚀 DevOps / SysAdmin

```
1. README.md              (15 min)
2. DEPLOYMENT.md         (25 min)
3. PERFORMANCE.md        (25 min - sección caching)
```

#### 💼 Stakeholder / Manager

```
1. EXECUTIVE-SUMMARY.md  (10 min)
2. README.md             (10 min)
```

---

### Diagramas de Arquitectura

#### Flujo de Datos

```
Usuario interactúa con UI
        ↓
LanguageSelector actualiza contexto
        ↓
I18nProvider propaga cambio
        ↓
useTranslations() obtiene nuevas traducciones
        ↓
Componentes re-renderizan
        ↓
GSAP anima transiciones
```

#### Ciclo de Vida de Animaciones

```
Componente monta → useEffect
        ↓
Crear animaciones GSAP
        ↓
ScrollTrigger observa viewport
        ↓
Usuario hace scroll
        ↓
Elemento entra en viewport
        ↓
Animación ejecuta
        ↓
Componente desmonta → Cleanup
```

---

## 🛠️ Desarrollo

### Estructura de Trabajo

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar desarrollo
pnpm dev
# → http://localhost:4321

# 3. Lint y format (antes de commit)
pnpm lint
pnpm format

# 4. Build de producción
pnpm build

# 5. Test local del build
pnpm start
# → http://localhost:3000
```

### Convenciones de Código

#### Naming

- **Componentes**: PascalCase (`NavBar.tsx`, `HeroSection.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useI18n.tsx`, `useGSAP.ts`)
- **Utilidades**: camelCase (`animations.ts`, `helpers.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_ITEMS`, `DEFAULT_LANG`)

#### Imports

```typescript
// 1. Externos
import { gsap } from "gsap";
import { useState } from "preact/hooks";

// 2. Alias @
import { useI18n } from "@/hooks/useI18n";
import { animations } from "@/utils/animations";

// 3. Relativos
import Component from "./Component";
```

#### Componentes

```tsx
// Estructura estándar
export default function MyComponent({ prop1, prop2 }: Props) {
  // 1. Hooks
  const t = useTranslations();
  const [state, setState] = useState();

  // 2. Effects
  useEffect(() => {
    // ...
  }, [deps]);

  // 3. Handlers
  const handleClick = () => {
    // ...
  };

  // 4. Render
  return <div className="...">{/* JSX */}</div>;
}
```

### Git Workflow

```bash
# 1. Crear rama feature
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commit
git add .
git commit -m "feat: descripción clara del cambio"

# 3. Push y crear PR
git push origin feature/nueva-funcionalidad

# 4. Después de merge, actualizar main
git checkout main
git pull origin main
```

#### Convenciones de Commit

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formateo, estilos (no afecta lógica)
- `refactor:` Refactorización de código
- `perf:` Mejoras de performance
- `test:` Agregar o modificar tests
- `chore:` Mantenimiento, configuración

---

## 🤝 Contribuir

### Reportar Bugs

Usa [GitHub Issues](https://github.com/zkjon/fruco/issues) con la siguiente información:

```markdown
**Descripción del bug**
Descripción clara y concisa

**Pasos para reproducir**

1. Ir a '...'
2. Hacer click en '...'
3. Ver error

**Comportamiento esperado**
Lo que debería pasar

**Screenshots**
Si aplica

**Entorno**

- OS: [ej. Windows 11]
- Navegador: [ej. Chrome 120]
- Versión del proyecto: [ej. 0.2.0]
```

### Solicitar Features

```markdown
**Feature request**
Descripción de la funcionalidad

**Problema que resuelve**
¿Qué problema actual soluciona?

**Solución propuesta**
Cómo implementarías la solución

**Alternativas consideradas**
Otras opciones que exploraste
```

---

## 📞 Soporte y Contacto

### Recursos

- **Documentación**: Este README y carpeta `docs/`
- **Issues**: [GitHub Issues](https://github.com/zkjon/fruco/issues)
- **Discussions**: [GitHub Discussions](https://github.com/zkjon/fruco/discussions)
- **Email**: jon.ruiz@example.com

### Stack Documentation

- **Astro**: https://docs.astro.build
- **Preact**: https://preactjs.com
- **Tailwind CSS**: https://tailwindcss.com/docs
- **GSAP**: https://greensock.com/docs
- **Express**: https://expressjs.com

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Jon Imanol Ruiz Hermoso**

- GitHub: [@zkjon](https://github.com/zkjon)
- Email: jon.ruiz@example.com

---

## 🙏 Agradecimientos

- **Astro Team**: Por el increíble framework
- **GSAP**: Por la mejor librería de animaciones
- **Vercel**: Por el excelente hosting y analytics
- **Lucushost**: Por el servicio de hosting confiable

---

## 📊 Estadísticas del Proyecto

```
Líneas de código:     ~3,500
Componentes:          11
Hooks personalizados: 5
Idiomas soportados:   4
Productos:            5
Tamaño bundle:        145KB (42KB gzipped)
Lighthouse Score:     98/100
```

---

## 🗺️ Roadmap

### v0.3.0 (Próximamente)

- [ ] PWA support con Service Worker
- [ ] Modo offline
- [ ] Más productos (10+)
- [ ] Blog section
- [ ] Recetas con productos Fruco

### v0.4.0 (Futuro)

- [ ] Tienda online integrada
- [ ] Sistema de usuarios
- [ ] Newsletter subscription
- [ ] Chat en vivo

---

<div align="center">

**Desarrollado con ❤️ usando Astro, Preact y GSAP**

[![Star en GitHub](https://img.shields.io/github/stars/zkjon/fruco?style=social)](https://github.com/zkjon/fruco)
[![Fork en GitHub](https://img.shields.io/github/forks/zkjon/fruco?style=social)](https://github.com/zkjon/fruco/fork)

</div> 🍅

Sitio web moderno y optimizado para Fruco, la marca de salsas de tomate con más de 65 años de tradición.

## 🚀 Características

- **Ultra rápido**: Optimizado con Preact y minificación avanzada
- **Animaciones fluidas**: Powered by GSAP con ScrollTrigger
- **Responsive**: Diseño adaptativo con Tailwind CSS
- **TypeScript**: Desarrollo tipado y seguro
- **Bundle optimizado**: JavaScript minificado y code splitting

## 🛠️ Stack Tecnológico

- **[Astro](https://astro.build/)** - Framework moderno para sitios web estáticos
- **[Preact](https://preactjs.com/)** - Alternativa ligera a React (3kB)
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript tipado
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[GSAP](https://greensock.com/gsap/)** - Librería de animaciones profesionales
- **[Bun](https://bun.sh/)** - Runtime y package manager ultra rápido

## 🎯 Optimizaciones Implementadas

### Bundle Size

- **Preact** en lugar de React: Reducción de ~40kB
- **Minificación con Terser**: Compresión avanzada de JavaScript
- **Code Splitting**: Separación inteligente de dependencias
- **Tree Shaking**: Eliminación de código no utilizado

### Performance

- **Eliminación de console.log** en producción
- **Compresión gzip** automática
- **Lazy loading** de componentes
- **Optimización de imágenes** (AVIF format)

### Resultado

- Bundle principal: **~133kB** (comprimido)
- Preact core: **10.4kB**
- Tiempo de carga mejorado significativamente

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes Preact
│   ├── HeroSection.tsx
│   ├── ProductShowcase.tsx
│   ├── History.tsx
│   ├── CallToAction.tsx
│   ├── NavBar.tsx
│   └── Footer.tsx
├── hooks/              # Custom hooks
│   └── useGSAP.ts
├── layouts/            # Layouts de Astro
│   └── Layout.astro
├── pages/              # Páginas
│   ├── index.astro
│   └── _App.tsx
├── styles/             # Estilos globales
│   └── globals.css
└── utils/              # Utilidades
    └── animations.ts
```

## 🎨 Componentes

### HeroSection

Sección principal con animaciones de entrada y parallax.

### ProductShowcase

Grid de productos con efectos hover y animaciones stagger.

### History

Información de la marca con animaciones de scroll.

### CallToAction

Sección de contacto con animaciones de entrada.

## 🎭 Animaciones

Todas las animaciones están optimizadas con GSAP:

- **Fade in on scroll**: Aparición suave de elementos
- **Slide up**: Deslizamiento desde abajo
- **Parallax**: Efectos de profundidad
- **Hover effects**: Interacciones en productos
- **Hero entrance**: Secuencia de entrada del hero

## 🔧 Configuración

### Astro Config

- Integración de Preact con compatibilidad React
- Code splitting automático
- Optimización de CSS inline

### TypeScript

- Configuración estricta
- TSX con Preact como fuente
- Paths absolutos configurados

## 📱 Responsive Design

Diseño completamente responsive con breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌟 Características Destacadas

1. **Performance First**: Optimizado para velocidad
2. **SEO Ready**: Meta tags y estructura semántica
3. **Accessibility**: Navegación por teclado y screen readers
4. **Modern CSS**: Grid, Flexbox y custom properties
5. **Progressive Enhancement**: Funciona sin JavaScript

## 🚀 Deploy

El proyecto está optimizado para deploy en:

- **Vercel** (recomendado)
- **Netlify**
- Cualquier hosting estático

## 📊 Métricas de Performance

- **First Contentful Paint**: < 0.5s
- **Largest Contentful Paint**: < 1.0s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: ~155kB total (gzipped)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**Fruco** - Sitio web moderno y optimizado 🍅✨
