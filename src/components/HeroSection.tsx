import { gsap } from "gsap";
import { useEffect, useRef, useState } from "preact/hooks";

interface HeroSectionProps {
  topSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
}

const HeroSection = ({
  topSrc = "/top_icon.avif",
  videoSrc = "/hero-video.mp4",
  posterSrc = "/hero-poster.png",
}: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const stickyLogoRef = useRef<HTMLDivElement>(null);
  const [showStickyLogo, setShowStickyLogo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            onComplete: () => {
              window.dispatchEvent(new CustomEvent("heroAnimationComplete"));
            },
          },
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const productsSection = document.getElementById("productos");
      if (productsSection) {
        const rect = productsSection.getBoundingClientRect();
        // Mostrar el logo cuando la sección de productos haya pasado completamente
        setShowStickyLogo(rect.bottom < 0);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleLogoClick = (e: Event) => {
    e.preventDefault();
    window.location.href = window.location.pathname;
  };

  return (
    <>
      <div
        ref={stickyLogoRef}
        className={`fixed top-0 left-4 z-50 w-full bg-black transition-opacity duration-300 md:w-auto xl:left-30 ${
          showStickyLogo
            ? "pointer-events-auto"
            : "pointer-events-none opacity-0"
        }`}
      >
        <a onClick={handleLogoClick} className="block">
          <img
            src={topSrc}
            alt="Fruco"
            className="w-20 transition-transform duration-300 hover:scale-110 md:w-24 lg:w-28"
            width={400}
            height={334}
          />
        </a>
      </div>

      <section
        ref={containerRef}
        className="relative flex items-center justify-center overflow-hidden"
        id="inicio"
      >
        <div className="relative w-full">
          <video
            ref={videoRef}
            className="h-140 w-full object-cover"
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            style={{
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
