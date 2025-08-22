import React, { useRef, useEffect } from 'react';
import { useHeroEntrance } from '../hooks/useGSAP';
import logoFruco from '../assets/logo_fruco.avif';

interface HeroSectionProps {
  logoSrc?: string;
  title?: string;
  subtitle?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  logoSrc = logoFruco,
  title = "Fruco",
  subtitle = "Sabores auténticos que despiertan tus sentidos"
}) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Usar el hook de animación de entrada del hero
  useHeroEntrance(logoRef, titleRef, subtitleRef);

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
      id="hero"
    >
      {/* Efecto de gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-fruco-black/20 pointer-events-none" />
      
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
        <span className="text-white/60 text-xs font-light tracking-widest uppercase">Desliza</span>
        <div className="w-[2px] h-8 bg-gradient-to-b from-white/60 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-white animate-pulse" style={{ animation: 'scrollIndicator 2s ease-in-out infinite' }} />
        </div>
      </div>
      
      {/* Elementos decorativos sutiles */}
      <div className="absolute top-20 right-20 w-1 h-16 bg-gradient-to-b from-fruco-green/20 to-transparent" />
      <div className="absolute bottom-32 left-20 w-16 h-1 bg-gradient-to-r from-fruco-red/20 to-transparent" />
      <div className="absolute top-1/2 right-10 w-px h-8 bg-white/10" />
    </section>
  );
};

export default HeroSection;