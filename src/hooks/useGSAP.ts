import { useEffect, useRef, useCallback } from 'preact/hooks';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
   fadeInOnScroll,
   slideUpOnScroll,
   parallaxEffect,
   heroEntrance,
   productGridAnimation,
   cleanupScrollTriggers,
   refreshScrollTrigger,
} from '../utils/animations';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hook principal para manejar animaciones GSAP - optimizado
export const useGSAP = () => {
   const animationsRef = useRef<gsap.core.Tween[]>([]);

   // Función para agregar animación al registro
   const addAnimation = useCallback((animation: gsap.core.Tween) => {
      animationsRef.current.push(animation);
      return animation;
   }, []);

   // Limpiar todas las animaciones al desmontar - optimizado
   useEffect(() => {
      const animations = animationsRef.current;

      return () => {
         // Limpiar animaciones GSAP
         animations.forEach(animation => {
            if (animation && animation.kill) {
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

// Hook específico para animaciones de fade in - optimizado
export const useFadeIn = (
   elementRef: { current: HTMLElement | null },
   options?: {
      duration?: number;
      delay?: number;
      ease?: string;
      opacity?: number;
      y?: number;
      scrollTrigger?: {
         trigger?: string | Element;
         start?: string;
         end?: string;
         scrub?: boolean | number;
         markers?: boolean;
      };
   }
) => {
   useEffect(() => {
      if (elementRef.current) {
         const animation = fadeInOnScroll(elementRef.current, options as ScrollTrigger.Vars);
         return () => {
            if (animation && animation.kill) {
               animation.kill();
            }
         };
      }
   }, [elementRef, options]);
};

// Hook específico para animaciones de slide up
export const useSlideUp = (elementRef: { current: HTMLElement | null }, delay: number = 0) => {
   const { addAnimation } = useGSAP();

   useEffect(() => {
      if (elementRef.current) {
         const animation = slideUpOnScroll(elementRef.current, delay);
         addAnimation(animation);
      }
   }, [elementRef, addAnimation, delay]);
};

// Hook específico para efectos parallax
export const useParallax = (elementRef: { current: HTMLElement | null }, speed: number = 0.5) => {
   const { addAnimation } = useGSAP();

   useEffect(() => {
      if (elementRef.current) {
         const animation = parallaxEffect(elementRef.current, speed);
         addAnimation(animation);
      }
   }, [elementRef, addAnimation, speed]);
};

// Hook para animación de entrada del hero
export const useHeroEntrance = (
   logoRef: { current: HTMLElement | null },
   titleRef: { current: HTMLElement | null },
   subtitleRef: { current: HTMLElement | null }
) => {
   const { addAnimation } = useGSAP();

   useEffect(() => {
      if (logoRef.current && titleRef.current && subtitleRef.current) {
         const timeline = heroEntrance({
            logo: logoRef.current,
            title: titleRef.current,
            subtitle: subtitleRef.current,
         });
         addAnimation(timeline as unknown as gsap.core.Tween);
      }
   }, [logoRef, titleRef, subtitleRef, addAnimation]);
};

// Hook para animación de grid de productos
export const useProductGrid = (containerRef: { current: HTMLElement | null }) => {
   const { addAnimation } = useGSAP();

   useEffect(() => {
      if (containerRef.current) {
         const animation = productGridAnimation(containerRef.current);
         addAnimation(animation);
      }
   }, [containerRef, addAnimation]);
};

// Hook eliminado: useProductHover - ahora se usa CSS para mejor rendimiento

// Hook para animaciones con scroll suave
export const useSmoothScroll = () => {
   useEffect(() => {
      // Configurar scroll suave
      const smoothScroll = (target: string) => {
         const element = document.querySelector(target);
         if (element) {
            gsap.to(window, {
               duration: 1,
               scrollTo: { y: element, offsetY: 80 },
               ease: 'power2.inOut',
            });
         }
      };

      // Agregar event listeners para navegación
      const navLinks = document.querySelectorAll('a[href^="#"]');
      navLinks.forEach(link => {
         link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            if (target) smoothScroll(target);
         });
      });

      return () => {
         navLinks.forEach(link => {
            link.removeEventListener('click', () => {});
         });
      };
   }, []);
};
