import { gsap } from "gsap";
import { useEffect, useRef } from "preact/hooks";

interface HeroSectionProps {
  logoSrc?: string;
  title?: string;
  subtitle?: string;
}

const HeroSection = ({
  logoSrc = "/logo_fruco.avif",
  subtitle = "Tradición y sabor desde 1959",
}: HeroSectionProps) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Usar el hook de animación de entrada del hero
  useEffect(() => {
    // Delay para permitir que la imagen se renderice primero
    const timer = setTimeout(() => {
      if (logoRef.current && subtitleRef.current) {
        // Animar logo, título y subtítulo con fade-in
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, transform: "translate3d(0, 20px, 0)" },
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
            duration: 0.8,
            ease: "power2.out",
            delay: 0.1,
          },
        );
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, transform: "translate3d(0, 20px, 0)" },
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
            duration: 0.6,
            ease: "power2.out",
            delay: 0.6,
          },
        );
      }
    }, 100); // Pequeño delay para permitir el renderizado del logo

    return () => clearTimeout(timer);
  }, []);

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
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          repeatDelay: 0,
        },
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

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="section-container relative overflow-hidden"
      id="inicio"
    >
      {/* Contenido principal */}
      <div className="text-center z-10 relative">
        {/* Logo */}
        <div className="mb-12">
          <img
            ref={logoRef}
            src={logoSrc}
            alt="Fruco Logo"
            className="mx-auto max-w-xs md:max-w-sm lg:max-w-md transition-transform duration-300 ease-out"
            style={{
              willChange: "transform, opacity",
              opacity: 0,
              transform: "translateY(20px) translateZ(0)",
            }}
            width={600}
            height={334}
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
          />
        </div>

        {/* Subtítulo */}
        <h1
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light font-body"
          style={{
            willChange: "transform, opacity",
            opacity: 0,
            transform: "translateY(20px) translateZ(0)",
          }}
        >
          {subtitle}
        </h1>
      </div>

      {/* Indicador de scroll */}
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
