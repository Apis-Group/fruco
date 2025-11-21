import { gsap } from "gsap";
import { useEffect, useRef } from "preact/hooks";
import { useI18n } from "@/hooks/useI18n";

interface HeroProps {
  logoSrc?: string;
}

const Hero = ({
  logoSrc = "/logo_fruco.svg",
}: HeroProps) => {
  const { t } = useI18n();
  const logoRef = useRef<HTMLImageElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  // Dividir el subtítulo en caracteres para animación
  const subtitleChars = t.hero.subtitle.split("");

  useEffect(() => {
    // Animación del logo
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.3,
      });
    }

    // Animación de caracteres del subtítulo
    if (subtitleRef.current) {
      const chars = subtitleRef.current.querySelectorAll(".char");
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power2.out",
        delay: 0.8,
      });
    }
  }, []);

  return (
    <section
      className="bg-fruco-black relative flex items-center justify-center overflow-hidden pt-10 md:pt-30 pb-10"
      id="inicio"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className={"mb-4"}>
          <img
            ref={logoRef}
            src={logoSrc}
            alt="Fruco Logo"
            className="mx-auto w-42 transition-transform duration-300 ease-out md:w-42 lg:w-42"
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

        <h1
          ref={subtitleRef}
          className="-mt-4 font-bold text-2xl leading-relaxed text-gray-300 lg:text-3xl flex wrap-normal"
          style={{
            fontFamily: "'Caveat', cursive",
            willChange: "transform, opacity",
            wordSpacing: "normal",
            letterSpacing: "normal",
          }}
        >
          {subtitleChars.map((char, index) => (
            <span
              key={index}
              className="char p-0.5"
              style={{
                opacity: 0,
                display: char === " " ? "inline" : "inline-block",
                transform: "translateY(0)",
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

export default Hero;
