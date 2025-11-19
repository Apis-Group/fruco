import { gsap } from "gsap";
import { useEffect, useRef, useState } from "preact/hooks";
import { useTranslations } from "@/hooks/useI18n";

interface HeroSectionProps {
  logoSrc?: string;
  title?: string;
}

const HeroSection = ({ logoSrc = "/logo_fruco.avif" }: HeroSectionProps) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [subtitleChars, setSubtitleChars] = useState<string[]>([]);
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
            duration: 0.8,
            ease: "power2.out",
            delay: 0.1,
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
            duration: 0.15,
            ease: "back.out(2)",
            stagger: 0.03, // Efecto de escritura letra por letra
            delay: 0.9,
          },
        );
      }
    }, 100); // Pequeño delay para permitir el renderizado del logo

    return () => clearTimeout(timer);
  }, [subtitleChars]);


  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden flex items-center justify-center pt-30 pb-10"
      id="inicio"
    >
      {/* Contenido principal */}
      <div className="text-center z-10 relative max-w-4xl mx-auto px-4">
        {/* Logo */}
        <div className="mb-8">
          <img
            ref={logoRef}
            src={logoSrc}
            alt="Fruco Logo"
            className="mx-auto w-60 md:w-[320px] lg:w-[380px] transition-transform duration-300 ease-out"
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
            sizes="(max-width: 768px) 240px, (max-width: 1024px) 320px, 380px"
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
  );
};

export default HeroSection;
