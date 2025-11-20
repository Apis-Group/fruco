import { gsap } from "gsap";
import { useEffect, useRef, useState } from "preact/hooks";
import { useTranslations } from "@/hooks/useI18n";

interface HeroSectionProps {
  logoSrc?: string;
  topSrc?: string;
  title?: string;
}

const HeroSection = ({
  logoSrc = "/logo_fruco.svg",
  topSrc = "/top_icon.avif",
}: HeroSectionProps) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const stickyLogoRef = useRef<HTMLDivElement>(null);
  const [subtitleChars, setSubtitleChars] = useState<string[]>([]);
  const [showStickyLogo, setShowStickyLogo] = useState(false);
  const t = useTranslations();
  const subtitle = t.hero.subtitle;

  // Dividir el subtítulo en caracteres al montar
  useEffect(() => {
    setSubtitleChars(subtitle.split(""));
  }, [subtitle]);

  // Usar el hook de animación de entrada del hero
  useEffect(() => {
    // Delay para permitir que la imagen se renderice primero
    const timer = setTimeout(() => {
      if (logoRef.current && subtitleRef.current) {
        // Animar logo
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, transform: "translate3d(0, 20px, 0)" },
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
            duration: 0.5,
            ease: "power2.out",
            delay: 0.05,
          },
        );

        // Animar cada letra del subtítulo con efecto de escritura a mano
        const chars = subtitleRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            scale: 0.5,
            rotateZ: -10,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            y: 0,
            duration: 0.12,
            ease: "back.out(2)",
            stagger: 0.02, // Efecto de escritura letra por letra más rápido
            delay: 0.6,
            onComplete: () => {
              // Disparar evento personalizado cuando termine la animación del hero
              window.dispatchEvent(new CustomEvent("heroAnimationComplete"));
            },
          },
        );
      }
    }, 50); // Delay reducido para renderizado del logo

    return () => clearTimeout(timer);
  }, [subtitleChars]);

  // Detectar cuando el logo principal sale del viewport
  useEffect(() => {
    const handleScroll = () => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        // El logo sticky aparece solo cuando el logo principal está completamente fuera de la vista (arriba)
        // y desaparece cuando el logo principal vuelve a ser visible
        setShowStickyLogo(rect.bottom < 0);
      }
    };

    // Ejecutar una vez al inicio para establecer el estado inicial
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animar el logo sticky cuando aparece y desaparece
  useEffect(() => {
    if (stickyLogoRef.current) {
      if (showStickyLogo) {
        gsap.to(stickyLogoRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(stickyLogoRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [showStickyLogo]);

  return (
    <>
      {/* Logo sticky en la esquina superior izquierda */}
      <div
        ref={stickyLogoRef}
        className={`fixed top-0 left-4 z-50 w-full md:w-auto bg-black transition-opacity duration-300 ${
          showStickyLogo
            ? "pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <a href="#inicio" className="block">
          <img
            src={topSrc}
            alt="Fruco"
            className="w-20 md:w-24 lg:w-28 hover:scale-110 transition-transform duration-300"
            width={400}
            height={334}
          />
        </a>
      </div>

      <section
        ref={containerRef}
        className="relative overflow-hidden flex items-center justify-center pt-30 pb-10"
        id="inicio"
      >
        {/* Contenido principal */}
        <div className="text-center z-10 relative max-w-4xl mx-auto px-4">
          {/* Logo */}
          <div className="mb-6">
            <img
              ref={logoRef}
              src={logoSrc}
              alt="Fruco Logo"
              className="mx-auto w-48 md:w-64 lg:w-72 transition-transform duration-300 ease-out"
              style={{
                willChange: "transform, opacity",
                opacity: 0,
                transform: "translateY(20px) translateZ(0)",
              }}
              width={400}
              height={334}
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
            />
          </div>

          {/* Subtítulo */}
          <h1
            ref={subtitleRef}
            className="text-2xl md:text-3xl lg:text-4xl text-gray-300 leading-relaxed font-light"
            style={{
              fontFamily: "'Caveat', cursive",
              willChange: "transform, opacity",
            }}
          >
            {subtitleChars.map((char, index) => (
              <span
                key={index}
                className="char inline-block"
                style={{
                  opacity: 0,
                  display: char === " " ? "inline" : "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
