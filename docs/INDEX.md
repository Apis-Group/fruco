# 📚 Índice Maestro de Documentación - Fruco

Bienvenido a la documentación completa del proyecto Fruco. Esta es una guía exhaustiva que cubre cada aspecto técnico del sitio web.

---

## 📖 Documentos Disponibles

### 🏠 [README.md](../README.md)

**Documento principal del proyecto**

**Contenido**:

- ✅ Descripción general del proyecto
- ✅ Stack tecnológico resumido
- ✅ Estructura de carpetas
- ✅ Instalación y configuración
- ✅ Scripts disponibles
- ✅ Quick start guide
- ✅ Información de licencia y contacto

**Para quién**: Todos los usuarios, primera lectura obligatoria

**Tiempo de lectura**: ~10 minutos

---

### 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md)

**Guía completa de despliegue en Lucushost**

**Contenido**:

- ✅ Arquitectura de despliegue
- ✅ server.js explicado línea por línea
- ✅ Proceso paso a paso de deployment
- ✅ Configuración de PM2 y systemd
- ✅ Proxy inverso (Apache/Nginx)
- ✅ SSL/HTTPS configuration
- ✅ Troubleshooting detallado
- ✅ Backups y mantenimiento
- ✅ Monitoreo en producción

**Para quién**: DevOps, administradores de sistemas, deployment

**Tiempo de lectura**: ~25 minutos

**Temas clave**:

- Express.js como servidor de producción
- Configuración de hosting compartido
- Process management con PM2
- Variables de entorno

---

### 🧩 [COMPONENTS.md](./COMPONENTS.md)

**Documentación exhaustiva de componentes**

**Contenido**:

- ✅ Arquitectura de componentes
- ✅ Jerarquía y relaciones
- ✅ Cada componente explicado en detalle
- ✅ Props, estado y hooks utilizados
- ✅ Ejemplos de código completos
- ✅ Patrones de diseño implementados
- ✅ Layout components (Astro)
- ✅ Naming conventions

**Para quién**: Desarrolladores frontend, colaboradores

**Tiempo de lectura**: ~30 minutos

**Componentes documentados**:

1. \_App.tsx (Raíz)
2. NavBar.tsx
3. LanguageSelector.tsx
4. HeroSection.tsx
5. ProductShowcase.tsx
6. History.tsx
7. VisionAndMision.tsx
8. Contact.tsx
9. GoogleMaps.tsx
10. Footer.tsx
11. Spliter.tsx

---

### 🎣 [HOOKS.md](./HOOKS.md)

**Hooks personalizados y utilidades**

**Contenido**:

- ✅ useI18n() - Sistema de traducciones
- ✅ useGSAP() - Gestión de animaciones
- ✅ useLazyImage() - Lazy loading
- ✅ useTranslatedProducts() - Productos traducidos
- ✅ useSmoothScroll() - Scroll suave
- ✅ animations.ts - Utilidades GSAP
- ✅ Patrones y best practices
- ✅ Ejemplos de uso completos

**Para quién**: Desarrolladores, implementadores de features

**Tiempo de lectura**: ~20 minutos

**Funciones de animación**:

- fadeInOnScroll()
- slideUpOnScroll()
- parallaxEffect()
- heroEntrance()
- productGridAnimation()
- scaleOnHover()

---

### ⚡ [PERFORMANCE.md](./PERFORMANCE.md)

**Optimizaciones y métricas de rendimiento**

**Contenido**:

- ✅ Core Web Vitals (LCP, FID, CLS)
- ✅ Build optimization
- ✅ Code splitting estratégico
- ✅ Tree shaking
- ✅ Minificación (Terser)
- ✅ Optimización de imágenes (AVIF)
- ✅ Lazy loading strategies
- ✅ Caching y CDN
- ✅ Bundle analysis
- ✅ Lighthouse scores

**Para quién**: Performance engineers, optimizadores

**Tiempo de lectura**: ~25 minutos

**Métricas objetivo**:

- Performance: 98/100
- LCP: < 1.8s
- FID: < 50ms
- CLS: < 0.05
- Bundle JS: ~145KB (42KB gzipped)

---

### 🏛️ [ARCHITECTURE.md](./ARCHITECTURE.md)

**Arquitectura técnica completa del proyecto**

**Contenido**:

- ✅ Visión general de arquitectura
- ✅ Stack tecnológico detallado
- ✅ Arquitectura de capas
- ✅ Flujos de datos (diagramas)
- ✅ Patrones de diseño implementados
- ✅ Sistema de build explicado
- ✅ Decisiones técnicas justificadas
- ✅ Comparaciones tecnológicas

**Para quién**: Arquitectos de software, tech leads, revisores

**Tiempo de lectura**: ~35 minutos

**Capas documentadas**:

1. View Layer (Componentes)
2. Business Logic Layer (Hooks)
3. Data Layer (i18n, productos)
4. Utilities Layer (Helpers)

---

### 🌍 [i18n.md](./i18n.md)

**Sistema de internacionalización**

**Contenido**:

- ✅ Estructura del sistema i18n
- ✅ Proceso de traducción (paso a paso)
- ✅ Reglas obligatorias
- ✅ Agregar nuevos idiomas
- ✅ Modificar traducciones
- ✅ Uso en componentes
- ✅ Cambio dinámico de idioma
- ✅ Persistencia de preferencia

**Para quién**: Traductores, content managers, desarrolladores

**Tiempo de lectura**: ~15 minutos

**Idiomas actuales**:

- 🇪🇸 Español (base)
- 🇺🇸 English
- 🇫🇷 Français
- 🇵🇹 Português

---

### 📖 [QUICK-REFERENCE.md](./QUICK-REFERENCE.md)

**Guía rápida de referencia**

**Contenido**:

- ✅ Quick start commands
- ✅ Ubicaciones clave de archivos
- ✅ Code snippets útiles
- ✅ Clases Tailwind comunes
- ✅ Scripts npm explicados
- ✅ Troubleshooting rápido
- ✅ Recursos externos
- ✅ Tips y tricks

**Para quién**: Todos, consulta rápida

**Tiempo de lectura**: ~10 minutos (referencia)

---

## 🗺️ Mapa de Navegación

### Por Rol

#### 👨‍💻 Desarrollador Frontend

**Lectura recomendada**:

1. [README.md](../README.md) - Overview general
2. [COMPONENTS.md](./COMPONENTS.md) - Componentes
3. [HOOKS.md](./HOOKS.md) - Lógica y utilidades
4. [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) - Referencia rápida

#### 🏗️ Arquitecto / Tech Lead

**Lectura recomendada**:

1. [README.md](../README.md) - Overview general
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura completa
3. [PERFORMANCE.md](./PERFORMANCE.md) - Optimizaciones
4. [DEPLOYMENT.md](./DEPLOYMENT.md) - Infraestructura

#### 🚀 DevOps / SysAdmin

**Lectura recomendada**:

1. [README.md](../README.md) - Overview general
2. [DEPLOYMENT.md](./DEPLOYMENT.md) - Despliegue completo
3. [PERFORMANCE.md](./PERFORMANCE.md) - Caching y CDN

#### 🌍 Traductor / Content Manager

**Lectura recomendada**:

1. [README.md](../README.md) - Overview general
2. [i18n.md](./i18n.md) - Sistema de traducciones

#### ⚡ Performance Engineer

**Lectura recomendada**:

1. [README.md](../README.md) - Overview general
2. [PERFORMANCE.md](./PERFORMANCE.md) - Optimizaciones
3. [ARCHITECTURE.md](./ARCHITECTURE.md) - Build system

---

## 🔍 Búsqueda por Tema

### Animaciones

- [COMPONENTS.md](./COMPONENTS.md) - Componentes animados
- [HOOKS.md](./HOOKS.md) - useGSAP y animations.ts
- [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) - Snippets de animaciones

### Internacionalización

- [i18n.md](./i18n.md) - Sistema completo
- [COMPONENTS.md](./COMPONENTS.md) - LanguageSelector
- [HOOKS.md](./HOOKS.md) - useI18n hook
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Flujo de datos i18n

### Performance

- [PERFORMANCE.md](./PERFORMANCE.md) - Guía completa
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Build optimization
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Caching y compresión

### Deployment

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía completa
- [README.md](../README.md) - Quick deploy
- [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) - Comandos rápidos

### Desarrollo

- [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) - Referencia rápida
- [COMPONENTS.md](./COMPONENTS.md) - Crear componentes
- [HOOKS.md](./HOOKS.md) - Crear hooks

---

## 📊 Estadísticas de Documentación

```
Total de documentos:    8
Páginas totales:        ~150
Líneas de código:       ~2,500
Ejemplos de código:     100+
Diagramas:              10+
Tiempo total lectura:   ~3 horas
```

---

## 🎯 Rutas de Aprendizaje

### 🟢 Beginner (Nuevo en el proyecto)

**Duración estimada**: 1-2 horas

```
1. README.md (15 min)
   ↓
2. QUICK-REFERENCE.md (20 min)
   ↓
3. Práctica: pnpm dev y explorar (30 min)
   ↓
4. COMPONENTS.md - Primeras 3 secciones (30 min)
```

### 🟡 Intermediate (Desarrollador activo)

**Duración estimada**: 3-4 horas

```
1. README.md (completo)
   ↓
2. ARCHITECTURE.md
   ↓
3. COMPONENTS.md (completo)
   ↓
4. HOOKS.md
   ↓
5. i18n.md
   ↓
6. Práctica: Crear nuevo componente
```

### 🔴 Advanced (Tech lead / Arquitecto)

**Duración estimada**: 5-6 horas

```
Leer TODOS los documentos en orden:
1. README.md
2. ARCHITECTURE.md
3. COMPONENTS.md
4. HOOKS.md
5. PERFORMANCE.md
6. DEPLOYMENT.md
7. i18n.md
8. QUICK-REFERENCE.md

+ Revisar código fuente completo
+ Practicar deployment
```

---

## 🆘 Soporte

### Encontré un error en la documentación

1. Abrir issue en GitHub
2. Especificar documento y sección
3. Proponer corrección

### Necesito aclarar algo

1. Consultar [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) primero
2. Buscar en documento específico
3. Si no hay respuesta, abrir discussion en GitHub

### Quiero contribuir

1. Leer [README.md](../README.md) - Sección "Contribuir"
2. Revisar documentos relevantes
3. Seguir convenciones establecidas
4. Crear PR con cambios

---

## 📝 Mantener la Documentación

### Al agregar feature

- [ ] Actualizar [COMPONENTS.md](./COMPONENTS.md) si hay nuevo componente
- [ ] Actualizar [HOOKS.md](./HOOKS.md) si hay nuevo hook
- [ ] Actualizar [ARCHITECTURE.md](./ARCHITECTURE.md) si afecta arquitectura
- [ ] Actualizar [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) con snippets

### Al cambiar deployment

- [ ] Actualizar [DEPLOYMENT.md](./DEPLOYMENT.md)
- [ ] Actualizar server.js comments
- [ ] Actualizar [README.md](../README.md) si es necesario

### Al optimizar performance

- [ ] Actualizar [PERFORMANCE.md](./PERFORMANCE.md)
- [ ] Actualizar métricas
- [ ] Documentar cambios en bundle size

### Al agregar idioma

- [ ] Actualizar [i18n.md](./i18n.md)
- [ ] Documentar proceso seguido
- [ ] Actualizar lista de idiomas en [README.md](../README.md)

---

## 🎓 Recursos Complementarios

### Documentación Externa

- **Astro Docs**: https://docs.astro.build
- **Preact Guide**: https://preactjs.com/guide/v10/getting-started
- **Tailwind Docs**: https://tailwindcss.com/docs
- **GSAP Docs**: https://greensock.com/docs
- **Express Guide**: https://expressjs.com/en/guide/routing.html

### Tutoriales Recomendados

- Astro Crash Course: https://www.youtube.com/watch?v=e-hTm5VmofI
- GSAP ScrollTrigger: https://www.youtube.com/watch?v=X7IBa7vZjmo
- Tailwind CSS Tutorial: https://www.youtube.com/watch?v=UBOj6rqRUME

### Comunidades

- Astro Discord: https://astro.build/chat
- GSAP Forums: https://greensock.com/forums
- GitHub Discussions: (este repositorio)

---

## 📅 Historial de Actualizaciones

### Octubre 2025

- ✅ Documentación inicial completa
- ✅ 8 documentos técnicos creados
- ✅ 100+ ejemplos de código
- ✅ Diagramas de arquitectura
- ✅ Guías paso a paso

---

## 🏆 Checklist de Dominio del Proyecto

Usa esto para medir tu comprensión del proyecto:

### Básico

- [ ] Puedo ejecutar el proyecto localmente
- [ ] Entiendo la estructura de carpetas
- [ ] Sé usar los scripts npm principales
- [ ] Puedo modificar estilos Tailwind

### Intermedio

- [ ] Entiendo el sistema de componentes
- [ ] Puedo crear un nuevo componente
- [ ] Sé usar el sistema i18n
- [ ] Entiendo el flujo de animaciones GSAP

### Avanzado

- [ ] Entiendo la arquitectura completa
- [ ] Puedo optimizar performance
- [ ] Sé hacer deployment en Lucushost
- [ ] Puedo modificar el build system

### Experto

- [ ] Puedo explicar cada decisión técnica
- [ ] Sé optimizar Core Web Vitals
- [ ] Puedo refactorizar cualquier parte
- [ ] Puedo entrenar a otros desarrolladores

---

**Última actualización**: Octubre 2025

**Mantenida por**: Jon Imanol Ruiz Hermoso

**Versión**: 1.0.0
