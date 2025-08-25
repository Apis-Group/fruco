# Fruco 🍅

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
