import React, { useRef, useEffect } from 'react';
import { useHeroEntrance } from '@/hooks/useGSAP';
import { gsap } from 'gsap';

interface HeroSectionProps {
   logoSrc?: string;
   title?: string;
   subtitle?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
   logoSrc = '/logo_fruco.avif',
   title = '',
   subtitle = 'Tradición y sabor desde 1959',
}) => {
   const logoRef = useRef<HTMLImageElement>(null);
   const titleRef = useRef<HTMLHeadingElement>(null);
   const subtitleRef = useRef<HTMLParagraphElement>(null);
   const containerRef = useRef<HTMLElement>(null);
   const scrollIndicatorRef = useRef<HTMLDivElement>(null);

   // Usar el hook de animación de entrada del hero
   useHeroEntrance(logoRef, titleRef, subtitleRef);

   // Animación del scroll indicator
   useEffect(() => {
      if (scrollIndicatorRef.current) {
         gsap.fromTo(
            scrollIndicatorRef.current,
            {
               y: -6,
               opacity: 0,
            },
            {
               y: 24,
               opacity: 1,
               duration: 1.5,
               ease: 'power2.inOut',
               repeat: -1,
               yoyo: true,
               repeatDelay: 0,
            }
         );
      }
   }, []);

   // Efecto de parallax sutil en el contenedor
   useEffect(() => {
      if (containerRef.current) {
         const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;

            if (logoRef.current) {
               logoRef.current.style.transform = `translate(${xPos * 0.5}px, ${yPos * 0.5}px)`;
            }
         };

         window.addEventListener('mousemove', handleMouseMove);

         return () => {
            window.removeEventListener('mousemove', handleMouseMove);
         };
      }
   }, []);

   return (
      <section
         ref={containerRef}
         className="section-container relative overflow-hidden"
         id="inicio"
      >
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradiente base */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-fruco-black/20" />
            {/* Luces de fondo verde y roja con movimiento imperceptible */}
            <div
               className="absolute top-1/4 left-1/4 w-96 h-96 bg-fruco-green/10 rounded-full blur-3xl"
               style={{ animation: 'slowFloat 300s ease-in-out infinite' }}
            />
            <div
               className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fruco-red/10 rounded-full blur-3xl"
               style={{ animation: 'floatRed 350s ease-in-out infinite 60s' }}
            />
            <div
               className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-fruco-green/5 to-fruco-red/5 rounded-full blur-2xl"
               style={{ animation: 'glow 200s ease-in-out infinite' }}
            />
            {/* Efectos adicionales de luz con movimiento imperceptible */}
            <div
               className="absolute top-10 right-1/3 w-32 h-32 bg-fruco-green/8 rounded-full blur-xl"
               style={{ animation: 'drift 250s ease-in-out infinite 30s' }}
            />
            <div
               className="absolute bottom-20 left-1/3 w-48 h-48 bg-fruco-red/8 rounded-full blur-xl"
               style={{ animation: 'floatGreen 280s ease-in-out infinite 90s' }}
            />
            {/* Luces adicionales que recorren toda la pantalla */}
            <div
               className="absolute top-0 left-0 w-64 h-64 bg-fruco-green/6 rounded-full blur-3xl"
               style={{ animation: 'slowFloat 400s ease-in-out infinite 120s' }}
            />
            <div
               className="absolute bottom-0 right-0 w-80 h-80 bg-fruco-red/6 rounded-full blur-3xl"
               style={{ animation: 'floatRed 380s ease-in-out infinite 150s' }}
            />
         </div>

         {/* Contenido principal */}
         <div className="text-center z-10 relative">
            {/* Logo con animación de entrada */}
            <div className="mb-12">
               <img
                  ref={logoRef}
                  src={logoSrc}
                  alt="Fruco Logo"
                  className="mx-auto max-w-xs md:max-w-sm lg:max-w-md transition-transform duration-300 ease-out"
                  style={{ willChange: 'transform' }}
               />
            </div>

            {/* Título principal */}
            <h1
               ref={titleRef}
               className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white tracking-tight"
               style={{ willChange: 'transform, opacity' }}
            >
               {title}
            </h1>

            {/* Subtítulo */}
            <p
               ref={subtitleRef}
               className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
               style={{ willChange: 'transform, opacity' }}
            >
               {subtitle}
            </p>
         </div>

         {/* Indicador de scroll elegante - posicionado fuera del contenido principal */}
         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 z-20">
            <span className="text-white/60 text-xs font-light tracking-widest uppercase">
               Desliza
            </span>
            <div className="w-[4px] h-8 bg-gradient-to-b from-white/60 to-transparent relative overflow-hidden">
               <div
                  ref={scrollIndicatorRef}
                  className="absolute top-0 left-0 w-full h-2 bg-white"
               />
            </div>
         </div>
      </section>
   );
};

export default HeroSection;
