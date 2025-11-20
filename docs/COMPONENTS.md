# 🧩 Documentación de Componentes

## 📋 Índice

- [Arquitectura de Componentes](#arquitectura-de-componentes)
- [Componentes Principales](#componentes-principales)
- [Componentes de Layout](#componentes-de-layout)
- [Componentes Utilitarios](#componentes-utilitarios)
- [Hooks Personalizados](#hooks-personalizados)
- [Patrón de Diseño](#patrón-de-diseño)

---

## Arquitectura de Componentes

### Jerarquía de Componentes

```
Layout.astro (Astro Layout)
    ↓
index.astro (Página Principal)
    ↓
_App.tsx (Raíz de la Aplicación Preact)
    ↓
I18nProvider (Contexto de Internacionalización)
    ↓
    ├── LanguageSelector (Selector flotante)
    ├── NavBar (Navegación sticky)
    ├── main
    │   ├── HeroSection
    │   ├── Spliter
    │   ├── ProductShowcase
    │   ├── Spliter
    │   ├── History
    │   ├── Spliter
    │   ├── VisionAndMision
    │   ├── Spliter
    │   └── Contact
    │       └── GoogleMaps
    └── Footer
```

---

## Componentes Principales

### 1. **\_App.tsx** - Componente Raíz

**Ubicación**: `src/pages/_App.tsx`

**Propósito**: Punto de entrada principal de la aplicación Preact. Orquesta todos los componentes y maneja la configuración global de GSAP.

**Características**:

- ✅ Inicializa GSAP y ScrollTrigger
- ✅ Configura scroll suave
- ✅ Provee contexto i18n
- ✅ Animación de fade-in inicial

**Código**:

```tsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "preact/hooks";
import { useSmoothScroll } from "@/hooks/useGSAP";
import { I18nProvider } from "@/hooks/useI18n";
import { refreshScrollTrigger } from "@/utils/animations";

// Registrar plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useSmoothScroll();

  useEffect(() => {
    // Configuración GSAP
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    // ScrollTrigger config
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
    });

    // Fade-in inicial
    gsap.fromTo(
      "body",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
    );

    // Refresh después de carga
    const timer = setTimeout(refreshScrollTrigger, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <I18nProvider>
      <LanguageSelector />
      <NavBar />
      <main>{/* Secciones */}</main>
      <Footer />
    </I18nProvider>
  );
}
```

**Props**: Ninguna

**Estado**: Ninguno (stateless)

**Hooks usados**:

- `useSmoothScroll()`: Habilita scroll suave en la página
- `useEffect()`: Configuración inicial y cleanup

---

### 2. **NavBar.tsx** - Barra de Navegación

**Ubicación**: `src/components/NavBar.tsx`

**Propósito**: Navegación sticky con efecto de hover animado y scroll suave a secciones.

**Características**:

- ✅ Posición fija en la parte superior
- ✅ Efecto glassmorphism (fondo blur)
- ✅ Hover indicator animado que se desliza
- ✅ Scroll suave a secciones con GSAP
- ✅ Responsive: oculta en móvil

**Estructura**:

```tsx
export default function NavBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const navRef = useRef<HTMLFieldSetElement>(null);
  const t = useTranslations();

  const navItems = [
    { label: t.navigation.home, target: "inicio" },
    { label: t.navigation.products, target: "productos" },
    // ...
  ];

  const handleMouseEnter = (index, event) => {
    // Calcular posición del hover indicator
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const navRect = navRef.current?.getBoundingClientRect();

    setHoveredIndex(index);
    setHoverStyle({
      left: rect.left - navRect.left,
      width: rect.width,
      opacity: 1,
    });
  };

  const handleClick = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power2.inOut",
      });
    }
  };

  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
      <fieldset
        ref={navRef}
        className="relative flex bg-white/10 backdrop-blur-md rounded-full"
      >
        {/* Hover indicator animado */}
        <div
          className="absolute ... transition-all duration-300"
          style={hoverStyle}
        />

        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item.target)}
            onMouseEnter={(e) => handleMouseEnter(index, e)}
            className="relative z-10 px-6 py-3 text-white/90 hover:text-white"
          >
            {item.label}
          </button>
        ))}
      </fieldset>
    </nav>
  );
}
```

**Props**: Ninguna

**Estado**:

- `hoveredIndex`: Índice del botón con hover actual
- `hoverStyle`: Estilos dinámicos para el indicador de hover

**Estilos Clave**:

```css
/* Glassmorphism */
bg-white/10 backdrop-blur-md

/* Border sutil */
border border-white/20

/* Hover indicator */
.absolute.bg-white/20.rounded-full.transition-all.duration-300
```

---

### 3. **LanguageSelector.tsx** - Selector de Idioma

**Ubicación**: `src/components/LanguageSelector.tsx`

**Propósito**: Selector flotante para cambiar el idioma de la interfaz.

**Características**:

- ✅ Posición fija (bottom-right)
- ✅ Banderas SVG para cada idioma
- ✅ Transición suave entre idiomas
- ✅ Persiste selección en localStorage (opcional)

**Estructura**:

```tsx
export default function LanguageSelector() {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "es", flag: "/flags/es.svg", name: "Español" },
    { code: "en", flag: "/flags/us.svg", name: "English" },
    { code: "fr", flag: "/flags/fr.svg", name: "Français" },
    { code: "pt", flag: "/flags/pt.svg", name: "Português" },
  ];

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
    // Opcional: guardar en localStorage
    localStorage.setItem("language", code);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/10 backdrop-blur-md rounded-full p-3"
      >
        <img src={currentFlag} alt={language} className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white/10 backdrop-blur-md rounded-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center gap-2 px-4 py-2 ${
                language === lang.code ? "bg-white/20" : ""
              }`}
            >
              <img src={lang.flag} alt={lang.name} className="w-6 h-6" />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Props**: Ninguna

**Estado**:

- `isOpen`: Controla visibilidad del menú desplegable

---

### 4. **HeroSection.tsx** - Sección Hero

**Ubicación**: `src/components/HeroSection.tsx`

**Propósito**: Primera sección con logo animado y call-to-action.

**Características**:

- ✅ Logo con animación de entrada (scale + fade)
- ✅ Texto animado con stagger
- ✅ Parallax sutil en scroll
- ✅ Imagen optimizada con srcset responsivo

**Animaciones**:

```tsx
useEffect(() => {
  const tl = gsap.timeline();

  // Logo aparece con scale
  tl.fromTo(
    ".hero-logo",
    { opacity: 0, scale: 0.8, y: 100 },
    { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
  );

  // Texto con stagger
  tl.fromTo(
    ".hero-text",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
    "-=0.6",
  );

  // Parallax en scroll
  gsap.to(".hero-logo", {
    y: () => window.innerHeight * 0.3,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}, []);
```

**Imagen Responsiva**:

```tsx
<img
  src="/logo_fruco.svg"
  srcSet="
    /logo_fruco.svg 320w,
    /logo_fruco.svg 640w,
    /logo_fruco.svg 1024w
  "
  sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
  alt="Fruco Logo"
  fetchpriority="high"
  loading="eager"
/>
```

---

### 5. **ProductShowcase.tsx** - Vitrina de Productos

**Ubicación**: `src/components/ProductShowcase.tsx`

**Propósito**: Grid animado de productos con información detallada.

**Características**:

- ✅ Grid responsivo (1/2/3 columnas)
- ✅ Animación stagger en scroll
- ✅ Hover effects con scale
- ✅ Modal con información nutricional
- ✅ Imágenes lazy-loading con srcset

**Estructura**:

```tsx
export default function ProductShowcase() {
  const t = useTranslations();
  const products = useTranslatedProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Animación stagger del grid
    gsap.fromTo(
      ".product-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 80%",
        },
      },
    );
  }, []);

  return (
    <section id="productos" className="section-container">
      <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
```

**ProductCard Sub-Componente**:

```tsx
function ProductCard({ product, onClick }) {
  const imgRef = useRef(null);
  const { isLoaded, error } = useLazyImage(imgRef, product.image);

  return (
    <div
      className="product-card bg-white/5 rounded-lg overflow-hidden cursor-pointer
                 transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="aspect-square relative">
        <img
          ref={imgRef}
          data-src={product.image}
          srcSet={`
            ${product.image.small} 320w,
            ${product.image.medium} 640w,
            ${product.image.large} 1024w
          `}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
        {!isLoaded && <Skeleton />}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
        <p className="text-white/70">{product.description}</p>
      </div>
    </div>
  );
}
```

---

### 6. **History.tsx** - Timeline Histórica

**Ubicación**: `src/components/History.tsx`

**Propósito**: Línea de tiempo interactiva con hitos de la empresa.

**Características**:

- ✅ Timeline vertical responsiva
- ✅ Animación secuencial de elementos
- ✅ Imágenes decorativas con parallax
- ✅ Efecto de desenfoque en elementos fuera de vista

**Animaciones**:

```tsx
useEffect(() => {
  // Timeline items aparecen uno por uno
  gsap.fromTo(
    ".timeline-item",
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 70%",
      },
    },
  );

  // Línea de timeline se dibuja progresivamente
  gsap.fromTo(
    ".timeline-line",
    { scaleY: 0 },
    {
      scaleY: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 70%",
      },
    },
  );
}, []);
```

---

### 7. **VisionAndMision.tsx** - Valores Corporativos

**Ubicación**: `src/components/VisionAndMision.tsx`

**Propósito**: Muestra visión, misión y valores de la empresa.

**Características**:

- ✅ Cards con glassmorphism
- ✅ Iconos animados
- ✅ Fade-in en scroll
- ✅ Layout responsivo

**Estructura**:

```tsx
export default function VisionAndMision() {
  const t = useTranslations();

  const sections = [
    {
      title: t.visionMission.vision.title,
      content: t.visionMission.vision.content,
      icon: "🎯",
    },
    {
      title: t.visionMission.mission.title,
      content: t.visionMission.mission.content,
      icon: "🚀",
    },
    {
      title: t.visionMission.values.title,
      items: t.visionMission.values.list,
      icon: "⭐",
    },
  ];

  return (
    <section id="vision-mision" className="section-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="vision-card bg-white/5 backdrop-blur-sm p-8 rounded-lg"
          >
            <div className="text-6xl mb-4">{section.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
            <p className="text-white/80">{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### 8. **Contact.tsx** - Formulario de Contacto

**Ubicación**: `src/components/Contact.tsx`

**Propósito**: Formulario de contacto con validación y Google Maps.

**Características**:

- ✅ Validación de campos
- ✅ Integración con backend (opcional)
- ✅ Estados de envío (loading, success, error)
- ✅ Google Maps embebido

**Estructura**:

```tsx
export default function Contact() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Aquí iría la lógica de envío
      // await sendContactForm(formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="section-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder={t.contact.form.name}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-3 bg-white/10 rounded-lg"
          />
          {/* Más campos... */}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-fruco-red text-white py-3 rounded-lg"
          >
            {status === "loading"
              ? t.contact.form.sending
              : t.contact.form.send}
          </button>

          {status === "success" && (
            <p className="text-green-500">{t.contact.form.success}</p>
          )}
        </form>

        {/* Mapa */}
        <GoogleMaps />
      </div>
    </section>
  );
}
```

---

### 9. **GoogleMaps.tsx** - Integración de Mapas

**Ubicación**: `src/components/GoogleMaps.tsx`

**Propósito**: Muestra ubicación de la empresa en Google Maps.

**Características**:

- ✅ Lazy loading del iframe
- ✅ Responsive
- ✅ Placeholder mientras carga

**Código**:

```tsx
export default function GoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
          <p>Cargando mapa...</p>
        </div>
      )}

      <iframe
        src="https://www.google.com/maps/embed?pb=..."
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
```

---

### 10. **Footer.tsx** - Pie de Página

**Ubicación**: `src/components/Footer.tsx`

**Propósito**: Footer con información legal y enlaces.

**Estructura**:

```tsx
export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fruco-black border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div>
            <img src="/logo_fruco.svg" alt="Fruco" className="h-12 mb-4" />
            <p className="text-white/70">{t.footer.description}</p>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="font-bold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio">{t.navigation.home}</a>
              </li>
              <li>
                <a href="#productos">{t.navigation.products}</a>
              </li>
              {/* Más enlaces... */}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold mb-4">{t.footer.contact}</h4>
            <p>info@fruco.com</p>
            <p>+34 123 456 789</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50">
            © {currentYear} Fruco. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
```

---

### 11. **Spliter.tsx** - Separador de Secciones

**Ubicación**: `src/components/Spliter.tsx`

**Propósito**: Separador visual decorativo entre secciones.

**Código**:

```tsx
export default function Spliter() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-16" />
  );
}
```

---

## Componentes de Layout

### Layout.astro

**Ubicación**: `src/layouts/Layout.astro`

**Propósito**: Layout principal con SEO, meta tags y configuración global.

**Características**:

- ✅ Meta tags optimizados para SEO
- ✅ Open Graph y Twitter Cards
- ✅ JSON-LD para Schema.org
- ✅ Preload de recursos críticos
- ✅ Google Fonts optimizado
- ✅ Analytics y Speed Insights

**Estructura**:

```astro
---
const { title } = Astro.props;
const description = "Descripción SEO...";
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>

    <!-- SEO -->
    <meta name="description" content={description} />
    <meta name="keywords" content="..." />

    <!-- Favicons -->
    <link rel="icon" href="/favicon/favicon.ico" />

    <!-- Preload LCP image -->
    <link rel="preload" href="/logo_fruco.svg" as="image" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />

    <!-- JSON-LD -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Fruco"
      }
    </script>
  </head>
  <body>
    <Analytics />
    <SpeedInsights />
    <slot />
  </body>
</html>
```

---

## Hooks Personalizados

Ver documentación completa en [`docs/HOOKS.md`](./HOOKS.md)

### Resumen:

1. **useI18n()**: Contexto de internacionalización
2. **useGSAP()**: Manejo de animaciones GSAP
3. **useLazyImage()**: Lazy loading de imágenes
4. **useTranslatedProducts()**: Productos traducidos dinámicamente
5. **useSmoothScroll()**: Scroll suave en la página

---

## Patrón de Diseño

### Naming Conventions

```tsx
// Componentes: PascalCase
NavBar.tsx;
ProductShowcase.tsx;

// Hooks: camelCase con prefijo 'use'
useI18n.tsx;
useLazyImage.ts;

// Utilidades: camelCase
animations.ts;
code_resources.md;

// Constantes: UPPER_SNAKE_CASE
const MAX_PRODUCTS = 5;
```

### Estructura de Componente Tipo

```tsx
// 1. Imports
import { useState, useEffect } from "preact/hooks";
import { useTranslations } from "@/hooks/useI18n";

// 2. Tipos (si TypeScript)
interface Props {
  title: string;
  onAction?: () => void;
}

// 3. Componente
export default function MyComponent({ title, onAction }: Props) {
  // 4. Hooks
  const t = useTranslations();
  const [state, setState] = useState(initialValue);

  // 5. Effects
  useEffect(() => {
    // Lógica de efecto
  }, [dependencies]);

  // 6. Handlers
  const handleClick = () => {
    // Lógica
  };

  // 7. Render
  return <div className="tailwind-classes">{/* JSX */}</div>;
}
```

---

**Documentación actualizada**: Octubre 2025
