import { gsap } from "gsap";
import { useEffect, useRef, useState } from "preact/hooks";
import { useTranslations } from "@/hooks/useI18n";

interface NavBarProps {
  topSrc?: string;
}

export default function NavBar({ topSrc = "/top_icon.avif" }: NavBarProps) {
  const [hoverStyle, setHoverStyle] = useState({});
  const navRef = useRef<HTMLFieldSetElement>(null);
  const stickyLogoRef = useRef<HTMLDivElement>(null);
  const [showStickyLogo, setShowStickyLogo] = useState(false);
  const t = useTranslations();

  const navItems = [
    { label: t.navigation.home, target: "inicio" },
    { label: t.navigation.products, target: "productos" },
    { label: t.navigation.history, target: "historia" },
    { label: t.navigation.visionMission, target: "vision-mision" },
    { label: t.navigation.contact, target: "contacto" },
  ];

  const handleMouseEnter = (_index: number, event: MouseEvent) => {
    const button = event.currentTarget as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    const navRect = navRef.current?.getBoundingClientRect();

    if (navRect) {
      setHoverStyle({
        left: rect.left - navRect.left,
        width: rect.width,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  };

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
        className={`fixed top-0 left-4 xl:left-30 z-50 w-full md:w-auto bg-black transition-opacity duration-300 ${
          showStickyLogo
            ? "pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <a onClick={handleLogoClick} className="block">
          <img
            src={topSrc}
            alt="Fruco"
            className="w-20 md:w-24 lg:w-28 hover:scale-110 transition-transform duration-300"
            width={400}
            height={334}
          />
        </a>
      </div>

      <nav className="fixed top-8 left-1/2 z-50 hidden -translate-x-1/2 transform md:block">
        <fieldset
          ref={navRef}
          className="relative flex rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="pointer-events-none absolute top-0 bottom-0 rounded-full bg-white/20 transition-all duration-300 ease-out"
            style={hoverStyle}
          />
          {navItems.map((item, index) => (
            <button
              type="button"
              key={item.target}
              onClick={() =>
                document
                  .getElementById(item.target)
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              className="relative z-10 cursor-pointer px-4 py-3 text-sm font-medium text-nowrap text-white/70 transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </fieldset>
      </nav>
    </>
  );
}
