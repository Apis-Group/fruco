import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Configuraciones de animación predefinidas
export const animationConfig = {
   fadeIn: {
      duration: 1,
      ease: 'power2.out',
      opacity: 0,
      y: 30,
   },
   slideUp: {
      duration: 0.8,
      ease: 'power3.out',
      opacity: 0,
      y: 50,
   },
   parallax: {
      duration: 1,
      ease: 'none',
      yPercent: -50,
   },
   scaleOnHover: {
      duration: 0.3,
      ease: 'power2.out',
      scale: 1.05,
   },
   heroEntrance: {
      duration: 1.2,
      ease: 'power3.out',
      opacity: 0,
      scale: 0.8,
      y: 100,
   },
};

// Función para animación de fade in con ScrollTrigger
export const fadeInOnScroll = (element: string | Element, options?: ScrollTrigger.Vars) => {
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
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
            once: true,
            ...options,
         },
      }
   );
};

// Función para animación de slide up con ScrollTrigger
export const slideUpOnScroll = (element: string | Element, delay: number = 0) => {
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
         delay,
         scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
         },
      }
   );
};

// Función para efecto parallax
export const parallaxEffect = (element: string | Element, speed: number = 0.5) => {
   return gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
         trigger: element,
         start: 'top bottom',
         end: 'bottom top',
         scrub: true,
      },
   });
};

// Función para animación de entrada del hero
export const heroEntrance = (elements: {
   logo: string | Element;
   title: string | Element;
   subtitle: string | Element;
}) => {
   const tl = gsap.timeline();

   // Logo aparece primero
   tl.fromTo(
      elements.logo,
      {
         opacity: 0,
         scale: 0.5,
         y: 50,
      },
      {
         opacity: 1,
         scale: 1,
         y: 0,
         duration: 1.2,
         ease: 'power3.out',
      }
   )
      // Título aparece después
      .fromTo(
         elements.title,
         {
            opacity: 0,
            y: 30,
         },
         {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
         },
         '-=0.6'
      )
      // Subtítulo aparece al final
      .fromTo(
         elements.subtitle,
         {
            opacity: 0,
            y: 20,
         },
         {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
         },
         '-=0.4'
      );

   return tl;
};

// Función para animación de productos en grid
export const productGridAnimation = (container: string | Element) => {
   let products;

   if (typeof container === 'string') {
      products = gsap.utils.toArray(`${container} .product-item`);
   } else {
      products = gsap.utils.toArray(container.querySelectorAll('.product-item'));
   }

   return gsap.fromTo(
      products,
      {
         opacity: 0,
         y: 50,
         scale: 0.9,
      },
      {
         opacity: 1,
         y: 0,
         scale: 1,
         duration: 0.6,
         ease: 'power2.out',
         stagger: 0.1,
         scrollTrigger: {
            trigger: container,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
         },
      }
   );
};

// Función para hover effects en productos
export const productHoverEffect = (element: string | Element) => {
   const el = typeof element === 'string' ? document.querySelector(element) : element;

   if (!el) return;

   const handleMouseEnter = () => {
      gsap.to(el, {
         scale: 1.05,
         duration: 0.3,
         ease: 'power2.out',
      });
   };

   const handleMouseLeave = () => {
      gsap.to(el, {
         scale: 1,
         duration: 0.3,
         ease: 'power2.out',
      });
   };

   el.addEventListener('mouseenter', handleMouseEnter);
   el.addEventListener('mouseleave', handleMouseLeave);

   // Retornar función de cleanup
   return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
   };
};

// Función para animación de texto con efecto typewriter
export const typewriterEffect = (element: string | Element, text: string, speed: number = 0.05) => {
   const el = typeof element === 'string' ? document.querySelector(element) : element;
   if (!el) return;

   const tl = gsap.timeline();

   // Limpiar el contenido
   el.textContent = '';

   // Animar cada carácter
   for (let i = 0; i <= text.length; i++) {
      tl.to(el, {
         duration: speed,
         ease: 'none',
         onComplete: () => {
            el.textContent = text.slice(0, i);
         },
      });
   }

   return tl;
};

// Función para limpiar todas las animaciones ScrollTrigger
export const cleanupScrollTriggers = () => {
   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Función para refrescar ScrollTrigger (útil después de cambios en el DOM)
export const refreshScrollTrigger = () => {
   ScrollTrigger.refresh();
};
