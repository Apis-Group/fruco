# 🎣 Documentación de Hooks y Utilidades

## 📋 Índice

- [Hooks Personalizados](#hooks-personalizados)
- [Utilidades y Helpers](#utilidades-y-helpers)
- [Sistema de Animaciones](#sistema-de-animaciones)
- [Best Practices](#best-practices)

---

## Hooks Personalizados

### 1. **useI18n** - Hook de Internacionalización

**Ubicación**: `src/hooks/useI18n.tsx`

**Propósito**: Proporciona acceso al contexto de internacionalización, permitiendo leer y cambiar el idioma actual.

#### API Completa

```typescript
interface I18nContextType {
  language: Language; // Idioma actual ('es' | 'en' | 'fr' | 'pt')
  setLanguage: (lang: Language) => void; // Función para cambiar idioma
  t: Translations; // Objeto con todas las traducciones
}

// Hook principal
function useI18n(): I18nContextType;

// Hook simplificado (solo traducciones)
function useTranslations(): Translations;
```

#### Implementación Interna

```typescript
import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import {
  defaultLanguage,
  getTranslations,
  type Language,
  type Translations,
} from "@/lib/i18n";

// Contexto
const I18nContext = createContext<I18nContextType | null>(null);

// Provider
export function I18nProvider({ children, initialLanguage = defaultLanguage }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const t = getTranslations(language);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    // Opcional: persistir en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

// Hook simplificado
export function useTranslations(): Translations {
  const { t } = useI18n();
  return t;
}
```

#### Uso en Componentes

```tsx
// Ejemplo 1: Solo traducciones
function MyComponent() {
  const t = useTranslations();

  return <h1>{t.common.company}</h1>;
}

// Ejemplo 2: Con control de idioma
function LanguageSelector() {
  const { language, setLanguage } = useI18n();

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="es">Español</option>
      <option value="en">English</option>
    </select>
  );
}

// Ejemplo 3: Acceso completo
function ComplexComponent() {
  const { language, setLanguage, t } = useI18n();

  useEffect(() => {
    console.log("Idioma actual:", language);
  }, [language]);

  return (
    <div>
      <h1>{t.hero.subtitle}</h1>
      <button onClick={() => setLanguage("en")}>English</button>
    </div>
  );
}
```

#### Estructura de Traducciones

```typescript
// Tipo base
export type Language = "es" | "en" | "fr" | "pt";

// Estructura de traducciones
export interface Translations {
  common: {
    company: string;
    tagline: string;
    since: string;
  };
  navigation: {
    home: string;
    products: string;
    history: string;
    visionMission: string;
    contact: string;
  };
  hero: {
    subtitle: string;
    scrollIndicator: string;
  };
  products: {
    title: string;
    // ...más propiedades
  };
  // ...más secciones
}
```

---

### 2. **useGSAP** - Hook de Animaciones GSAP

**Ubicación**: `src/hooks/useGSAP.ts`

**Propósito**: Gestiona animaciones GSAP con cleanup automático y registro de tweens.

#### API

```typescript
interface UseGSAPReturn {
  addAnimation: (animation: gsap.core.Tween) => gsap.core.Tween;
  refreshScrollTrigger: () => void;
}

function useGSAP(): UseGSAPReturn;
```

#### Implementación

```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef } from "preact/hooks";
import {
  cleanupScrollTriggers,
  refreshScrollTrigger,
} from "@/utils/animations";

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  // Registrar animación
  const addAnimation = useCallback((animation: gsap.core.Tween) => {
    animationsRef.current.push(animation);
    return animation;
  }, []);

  // Cleanup al desmontar
  useEffect(() => {
    const animations = animationsRef.current;

    return () => {
      // Matar todas las animaciones
      animations.forEach((animation) => {
        if (animation?.kill) {
          animation.kill();
        }
      });

      // Limpiar ScrollTriggers
      cleanupScrollTriggers();
    };
  }, []);

  return {
    addAnimation,
    refreshScrollTrigger,
  };
};
```

#### Uso

```tsx
function AnimatedComponent() {
  const { addAnimation, refreshScrollTrigger } = useGSAP();

  useEffect(() => {
    // Registrar animación para cleanup automático
    const animation = gsap.fromTo(
      ".element",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 },
    );

    addAnimation(animation);

    // Refresh ScrollTrigger después de cambios en el DOM
    setTimeout(refreshScrollTrigger, 100);
  }, [addAnimation, refreshScrollTrigger]);

  return <div className="element">Contenido animado</div>;
}
```

---

### 3. **useSmoothScroll** - Scroll Suave

**Ubicación**: `src/hooks/useGSAP.ts`

**Propósito**: Habilita scroll suave en toda la página usando GSAP ScrollTo.

#### API

```typescript
function useSmoothScroll(): void;
```

#### Implementación

```typescript
export const useSmoothScroll = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);

    // Configurar scroll suave para enlaces internos
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;

      if (target.tagName === "A" && target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);

        if (element) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: element,
              offsetY: 80, // Offset para navbar
            },
            ease: "power2.inOut",
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
};
```

#### Uso

```tsx
function App() {
  useSmoothScroll(); // Se activa en toda la app

  return <div>...</div>;
}
```

---

### 4. **useLazyImage** - Lazy Loading de Imágenes

**Ubicación**: `src/hooks/useLazyImage.ts`

**Propósito**: Implementa lazy loading de imágenes con Intersection Observer.

#### API

```typescript
interface UseLazyImageReturn {
  isLoaded: boolean;
  error: boolean;
}

function useLazyImage(
  ref: RefObject<HTMLImageElement>,
  src: string,
): UseLazyImageReturn;
```

#### Implementación

```typescript
import { useEffect, useState } from "preact/hooks";
import type { RefObject } from "preact";

export function useLazyImage(ref: RefObject<HTMLImageElement>, src: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const imgElement = ref.current;
    if (!imgElement) return;

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Cargar imagen
            const img = entry.target as HTMLImageElement;
            const dataSrc = img.getAttribute("data-src");

            if (dataSrc) {
              img.src = dataSrc;
              img.onload = () => setIsLoaded(true);
              img.onerror = () => setError(true);
            }

            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px", // Cargar 50px antes de ser visible
        threshold: 0.01,
      },
    );

    observer.observe(imgElement);

    return () => {
      if (imgElement) {
        observer.unobserve(imgElement);
      }
    };
  }, [ref, src]);

  return { isLoaded, error };
}
```

#### Uso

```tsx
function ProductCard({ product }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const { isLoaded, error } = useLazyImage(imgRef, product.image);

  return (
    <div>
      <img
        ref={imgRef}
        data-src={product.image}
        alt={product.name}
        className={`transition-opacity ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
      {!isLoaded && <Skeleton />}
      {error && <ErrorPlaceholder />}
    </div>
  );
}
```

---

### 5. **useTranslatedProducts** - Productos Traducidos

**Ubicación**: `src/hooks/useTranslatedProducts.ts`

**Propósito**: Obtiene lista de productos traducidos según idioma actual.

#### API

```typescript
function useTranslatedProducts(): Product[];
```

#### Implementación

```typescript
import { useMemo } from "preact/hooks";
import { useTranslations } from "./useI18n";
import { PRODUCTS } from "@/lib/Products";

export function useTranslatedProducts() {
  const t = useTranslations();

  // Memorizar para evitar re-cálculos innecesarios
  return useMemo(() => {
    return PRODUCTS.map((product) => ({
      ...product,
      name: t.products[product.id].name,
      description: t.products[product.id].description,
      detailedDescription: t.products[product.id].detailedDescription,
      ingredients: t.products[product.id].ingredients,
    }));
  }, [t]);
}
```

#### Uso

```tsx
function ProductShowcase() {
  const products = useTranslatedProducts();

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## Utilidades y Helpers

### animations.ts - Utilidades de Animación

**Ubicación**: `src/utils/animations.ts`

#### Configuraciones Predefinidas

```typescript
export const animationConfig = {
  fadeIn: {
    duration: 1,
    ease: "power2.out",
    opacity: 0,
    y: 30,
  },
  slideUp: {
    duration: 0.8,
    ease: "power3.out",
    opacity: 0,
    y: 50,
  },
  parallax: {
    duration: 1,
    ease: "none",
    yPercent: -50,
  },
  scaleOnHover: {
    duration: 0.3,
    ease: "power2.out",
    scale: 1.05,
  },
  heroEntrance: {
    duration: 1.2,
    ease: "power3.out",
    opacity: 0,
    scale: 0.8,
    y: 100,
  },
};
```

#### Funciones de Animación

##### fadeInOnScroll

```typescript
/**
 * Anima elemento con fade-in cuando entra en viewport
 */
export const fadeInOnScroll = (
  element: string | Element,
  options?: ScrollTrigger.Vars,
) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: animationConfig.fadeIn.y,
    },
    {
      opacity: 1,
      y: 0,
      duration: animationConfig.fadeIn.duration,
      ease: animationConfig.fadeIn.ease,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        ...options,
      },
    },
  );
};
```

##### slideUpOnScroll

```typescript
/**
 * Anima elemento deslizándolo hacia arriba en scroll
 */
export const slideUpOnScroll = (
  element: string | Element,
  options?: ScrollTrigger.Vars,
) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: animationConfig.slideUp.y,
    },
    {
      opacity: 1,
      y: 0,
      duration: animationConfig.slideUp.duration,
      ease: animationConfig.slideUp.ease,
      scrollTrigger: {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none none",
        ...options,
      },
    },
  );
};
```

##### parallaxEffect

```typescript
/**
 * Crea efecto parallax en elemento
 */
export const parallaxEffect = (
  element: string | Element,
  speed: number = 0.5,
) => {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};
```

##### heroEntrance

```typescript
/**
 * Animación de entrada para hero section
 */
export const heroEntrance = (element: string | Element) => {
  return gsap.fromTo(
    element,
    {
      opacity: animationConfig.heroEntrance.opacity,
      scale: animationConfig.heroEntrance.scale,
      y: animationConfig.heroEntrance.y,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: animationConfig.heroEntrance.duration,
      ease: animationConfig.heroEntrance.ease,
    },
  );
};
```

##### productGridAnimation

```typescript
/**
 * Animación stagger para grid de productos
 */
export const productGridAnimation = (
  gridSelector: string,
  itemSelector: string = ".product-card",
) => {
  return gsap.fromTo(
    `${gridSelector} ${itemSelector}`,
    {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: gridSelector,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    },
  );
};
```

##### scaleOnHover (Timeline)

```typescript
/**
 * Crea timeline de hover para elemento
 */
export const scaleOnHover = (element: HTMLElement) => {
  const tl = gsap.timeline({ paused: true });

  tl.to(element, {
    scale: animationConfig.scaleOnHover.scale,
    duration: animationConfig.scaleOnHover.duration,
    ease: animationConfig.scaleOnHover.ease,
  });

  element.addEventListener("mouseenter", () => tl.play());
  element.addEventListener("mouseleave", () => tl.reverse());

  return tl;
};
```

#### Utilidades de Gestión

##### refreshScrollTrigger

```typescript
/**
 * Recalcula posiciones de ScrollTrigger
 */
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};
```

##### cleanupScrollTriggers

```typescript
/**
 * Limpia todos los ScrollTriggers activos
 */
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
```

##### killAnimation

```typescript
/**
 * Mata animación específica
 */
export const killAnimation = (
  animation: gsap.core.Tween | gsap.core.Timeline,
) => {
  if (animation && typeof animation.kill === "function") {
    animation.kill();
  }
};
```

---

## Sistema de Animaciones

### Flujo de Animaciones

```
1. Componente se monta
       ↓
2. useEffect se ejecuta
       ↓
3. Crear animaciones GSAP
       ↓
4. Registrar con useGSAP (opcional)
       ↓
5. ScrollTrigger observa viewport
       ↓
6. Usuario hace scroll
       ↓
7. Elemento entra en viewport
       ↓
8. Animación se ejecuta
       ↓
9. Componente se desmonta
       ↓
10. Cleanup automático (useEffect return)
```

### Ejemplo Completo de Animación

```tsx
import { useEffect, useRef } from "preact/hooks";
import { useGSAP } from "@/hooks/useGSAP";
import {
  fadeInOnScroll,
  slideUpOnScroll,
  parallaxEffect,
  productGridAnimation,
} from "@/utils/animations";

function AnimatedSection() {
  const { addAnimation, refreshScrollTrigger } = useGSAP();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Fade-in del título
    const titleAnim = fadeInOnScroll(".section-title");
    addAnimation(titleAnim);

    // 2. Slide-up del contenido
    const contentAnim = slideUpOnScroll(".section-content", {
      start: "top 70%",
    });
    addAnimation(contentAnim);

    // 3. Parallax de imagen de fondo
    const parallaxAnim = parallaxEffect(".section-bg", 0.3);
    addAnimation(parallaxAnim);

    // 4. Grid de productos con stagger
    const gridAnim = productGridAnimation(".products-grid");
    addAnimation(gridAnim);

    // 5. Refresh después de que todo cargue
    setTimeout(refreshScrollTrigger, 100);
  }, [addAnimation, refreshScrollTrigger]);

  return (
    <div ref={sectionRef} className="relative">
      <div className="section-bg absolute inset-0">
        <img src="/background.jpg" alt="Background" />
      </div>

      <h2 className="section-title">Título Animado</h2>
      <p className="section-content">Contenido animado</p>

      <div className="products-grid grid grid-cols-3 gap-4">
        <div className="product-card">Producto 1</div>
        <div className="product-card">Producto 2</div>
        <div className="product-card">Producto 3</div>
      </div>
    </div>
  );
}
```

---

## Best Practices

### 1. **Siempre hacer Cleanup**

```tsx
// ❌ MAL - Memory leak
useEffect(() => {
  gsap.to(".element", { x: 100 });
}, []);

// ✅ BIEN - Cleanup adecuado
useEffect(() => {
  const animation = gsap.to(".element", { x: 100 });

  return () => {
    animation.kill();
  };
}, []);
```

### 2. **Usar useGSAP para múltiples animaciones**

```tsx
// ✅ Gestión automática
const { addAnimation } = useGSAP();

useEffect(() => {
  addAnimation(gsap.to(".el1", { x: 100 }));
  addAnimation(gsap.to(".el2", { y: 100 }));
  addAnimation(gsap.to(".el3", { rotation: 360 }));
  // Todas se limpian automáticamente
}, [addAnimation]);
```

### 3. **Memoizar funciones costosas**

```tsx
// ✅ Evita recálculos innecesarios
const products = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

### 4. **Refresh ScrollTrigger después de cambios DOM**

```tsx
useEffect(() => {
  // Después de que imágenes carguen
  const images = document.querySelectorAll("img");
  let loadedCount = 0;

  images.forEach((img) => {
    img.addEventListener("load", () => {
      loadedCount++;
      if (loadedCount === images.length) {
        ScrollTrigger.refresh();
      }
    });
  });
}, []);
```

### 5. **Lazy loading para performance**

```tsx
// ✅ Carga diferida de componentes pesados
const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

**Documentación actualizada**: Octubre 2025
