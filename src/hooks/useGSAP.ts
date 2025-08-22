import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
   fadeInOnScroll,
   slideUpOnScroll,
   parallaxEffect,
   heroEntrance,
   productGridAnimation,
   productHoverEffect,
   cleanupScrollTriggers,
   refreshScrollTrigger,
} from '../utils/animations';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hook principal para manejar animaciones GSAP
export const useGSAP = () => {
   const animationsRef = useRef<gsap.core.Tween[]>([]);
   const cleanupFunctionsRef = useRef<(() => void)[]>([]);

   // Función para agregar animación al registro
   const addAnimation = useCallback((animation: gsap.core.Tween) => {
      animationsRef.current.push(animation);
      return animation;
   }, []);

   // Función para agregar función de cleanup
   const addCleanup = useCallback((cleanupFn: () => void) => {
      cleanupFunctionsRef.current.push(cleanupFn);
   }, []);

   // Limpiar todas las animaciones al desmontar
   useEffect(() => {
      const animations = animationsRef.current;
      const cleanupFunctions = cleanupFunctionsRef.current;

      return () => {
         // Limpiar animaciones GSAP
         animations.forEach(animation => {
            if (animation && animation.kill) {
               animation.kill();
            }
         });

         // Ejecutar funciones de cleanup
         cleanupFunctions.forEach(cleanup => cleanup());

         // Limpiar ScrollTriggers
         cleanupScrollTriggers();
      };
   }, []);

   return {
      addAnimation,
      addCleanup,
      refreshScrollTrigger,
   };
};

// Hook específico para animaciones de fade in
export const useFadeIn = (
   elementRef: React.RefObject<HTMLElement | null>,
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
   const { addAnimation } = useGSAP();

   useEffect(() => {
      if (elementRef.current) {
         const animation = fadeInOnScroll(elementRef.current, options as ScrollTrigger.Vars);
         addAnimation(animation);
      }
   }, [elementRef, addAnimation, options]);
};

// Hook específico para animaciones de slide up
export const useSlideUp = (elementRef: React.RefObject<HTMLElement | null>, delay: number = 0) => {
   const { addAnimation } = useGSAP();

   useEffect(() => {
      if (elementRef.current) {
         const animation = slideUpOnScroll(elementRef.current, delay);
         addAnimation(animation);
      }
   }, [elementRef, addAnimation, delay]);
};

// Hook específico para efectos parallax
export const useParallax = (
   elementRef: React.RefObject<HTMLElement | null>,
   speed: number = 0.5
) => {
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
   logoRef: React.RefObject<HTMLElement | null>,
   titleRef: React.RefObject<HTMLElement | null>,
   subtitleRef: React.RefObject<HTMLElement | null>
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
export const useProductGrid = (containerRef: React.RefObject<HTMLElement | null>) => {
   const { addAnimation } = useGSAP();

   useEffect(() => {
      if (containerRef.current) {
         const animation = productGridAnimation(containerRef.current);
         addAnimation(animation);
      }
   }, [containerRef, addAnimation]);
};

// Hook para efectos hover en productos
export const useProductHover = (elementRef: React.RefObject<HTMLElement | null>) => {
   const { addCleanup } = useGSAP();

   useEffect(() => {
      if (elementRef.current) {
         const cleanup = productHoverEffect(elementRef.current);
         if (cleanup) {
            addCleanup(cleanup);
         }
      }
   }, [elementRef, addCleanup]);
};

// Hook para animaciones personalizadas
export const useCustomAnimation = (
   elementRef: React.RefObject<HTMLElement | null>,
   animationFn: (element: HTMLElement) => gsap.core.Tween | gsap.core.Timeline
) => {
   const { addAnimation } = useGSAP();

   useEffect(() => {
      if (elementRef.current) {
         const animation = animationFn(elementRef.current);
         addAnimation(animation as gsap.core.Tween);
      }
   }, [elementRef, animationFn, addAnimation]);
};

// Hook para manejar scroll suave
export const useSmoothScroll = () => {
   const scrollTo = useCallback((target: string | HTMLElement, offset: number = 0) => {
      gsap.to(window, {
         duration: 1,
         scrollTo: {
            y: target,
            offsetY: offset,
         },
         ease: 'power2.inOut',
      });
   }, []);

   return { scrollTo };
};

// Hook para animaciones de texto
export const useTextAnimation = (
   elementRef: React.RefObject<HTMLElement | null>,
   animationType: 'fadeIn' | 'slideUp' | 'typewriter' = 'fadeIn'
) => {
   const { addAnimation } = useGSAP();

   useEffect(() => {
      if (elementRef.current) {
         let animation: gsap.core.Tween;

         switch (animationType) {
            case 'fadeIn':
               animation = fadeInOnScroll(elementRef.current);
               break;
            case 'slideUp':
               animation = slideUpOnScroll(elementRef.current);
               break;
            default:
               animation = fadeInOnScroll(elementRef.current);
         }

         addAnimation(animation);
      }
   }, [elementRef, animationType, addAnimation]);
};

// Hook para refresh de ScrollTrigger cuando cambia el contenido
export const useScrollTriggerRefresh = (dependencies: React.DependencyList) => {
   useEffect(() => {
      const timer = setTimeout(() => {
         refreshScrollTrigger();
      }, 100);

      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, dependencies);
};
