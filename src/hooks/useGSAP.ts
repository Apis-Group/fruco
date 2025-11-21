import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef } from "preact/hooks";

import {
  cleanupScrollTriggers,
  fadeInOnScroll,
  parallaxEffect,
  productGridAnimation,
  refreshScrollTrigger,
  slideUpOnScroll,
} from "@/utils/animations";

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  const addAnimation = useCallback((animation: gsap.core.Tween) => {
    animationsRef.current.push(animation);
    return animation;
  }, []);

  useEffect(() => {
    const animations = animationsRef.current;

    return () => {
      animations.forEach((animation) => {
        if (animation?.kill) {
          animation.kill();
        }
      });

      cleanupScrollTriggers();
    };
  }, []);

  return {
    addAnimation,
    refreshScrollTrigger,
  };
};

export const useFadeIn = (
  elementRef: { current: HTMLElement | null },
  options?: {
    duration?: number;
    delay?: number;
    ease?: string;
    opacity?: number;
    y?: number;
    immediate?: boolean;
    scrollTrigger?: {
      trigger?: string | Element;
      start?: string;
      end?: string;
      scrub?: boolean | number;
      markers?: boolean;
    };
  },
) => {
  useEffect(() => {
    if (elementRef.current) {
      if (options?.immediate) {
        const animation = gsap.fromTo(
          elementRef.current,
          {
            opacity: 0,
            y: options.y || 30,
          },
          {
            opacity: options.opacity || 1,
            y: 0,
            duration: options.duration || 1,
            ease: options.ease || "power2.out",
            delay: options.delay || 0,
          },
        );
        return () => {
          if (animation?.kill) {
            animation.kill();
          }
        };
      }

      const animation = fadeInOnScroll(
        elementRef.current,
        options as ScrollTrigger.Vars,
      );
      return () => {
        if (animation?.kill) {
          animation.kill();
        }
      };
    }
  }, [elementRef, options]);
};

export const useSlideUp = (
  elementRef: { current: HTMLElement | null },
  delay: number = 0,
) => {
  const { addAnimation } = useGSAP();

  useEffect(() => {
    if (elementRef.current) {
      const animation = slideUpOnScroll(elementRef.current, delay);
      addAnimation(animation);
    }
  }, [elementRef, addAnimation, delay]);
};

export const useParallax = (
  elementRef: { current: HTMLElement | null },
  speed: number = 0.5,
) => {
  const { addAnimation } = useGSAP();

  useEffect(() => {
    if (elementRef.current) {
      const animation = parallaxEffect(elementRef.current, speed);
      addAnimation(animation);
    }
  }, [elementRef, addAnimation, speed]);
};

export const useProductGrid = (
  containerRef: {
    current: HTMLElement | null;
  },
  immediate: boolean = false,
) => {
  const { addAnimation } = useGSAP();

  useEffect(() => {
    if (containerRef.current) {
      const animation = productGridAnimation(containerRef.current, immediate);
      addAnimation(animation);
    }
  }, [containerRef, addAnimation, immediate]);
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const smoothScroll = (target: string) => {
      const element = document.querySelector(target);
      if (element) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: element, offsetY: 80 },
          ease: "power2.inOut",
        });
      }
    };

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("href");
        if (target) smoothScroll(target);
      });
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", () => {});
      });
    };
  }, []);
};
