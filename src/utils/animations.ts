import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
};

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
        once: true,
        ...options,
      },
    },
  );
};

export const slideUpOnScroll = (
  element: string | Element,
  delay: number = 0,
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
      delay,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      },
    },
  );
};

export const parallaxEffect = (
  element: string | Element,
  speed: number = 0.5,
) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

export const heroEntrance = (elements: {
  logo: string | Element;
  title: string | Element;
  subtitle: string | Element;
}) => {
  const tl = gsap.timeline();

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
      ease: "power3.out",
    },
  )
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
        ease: "power2.out",
      },
      "-=0.6",
    )
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
        ease: "power2.out",
      },
      "-=0.4",
    );

  return tl;
};

export const productGridAnimation = (
  container: string | Element,
  immediate: boolean = false,
) => {
  let products: Element[];

  if (typeof container === "string") {
    products = gsap.utils.toArray(`${container} .product-item`);
  } else {
    products = gsap.utils.toArray(container.querySelectorAll(".product-item"));
  }

  const config = {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.15,
  };

  if (immediate) {
    return gsap.fromTo(
      products,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        ...config,
        delay: 0.5,
      },
    );
  }

  return gsap.fromTo(
    products,
    {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    {
      ...config,
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        toggleActions: "play none none none",
        once: true,
      },
    },
  );
};

export const cleanupScrollTriggers = () => {
  for (const trigger of ScrollTrigger.getAll()) {
    trigger.kill();
  }
};

export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};
