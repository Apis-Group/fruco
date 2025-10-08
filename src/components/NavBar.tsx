import { useRef, useState } from "preact/hooks";
import { useTranslations } from "@/hooks/useI18n";

export default function NavBar() {
  const [, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const navRef = useRef<HTMLFieldSetElement>(null);
  const t = useTranslations();

  const navItems = [
    { label: t.navigation.home, target: "inicio" },
    { label: t.navigation.products, target: "productos" },
    { label: t.navigation.history, target: "historia" },
    { label: t.navigation.visionMission, target: "vision-mision" },
    { label: t.navigation.contact, target: "contacto" },
  ];

  const handleMouseEnter = (index: number, event: MouseEvent) => {
    const button = event.currentTarget as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    const navRect = navRef.current?.getBoundingClientRect();

    if (navRect) {
      setHoveredIndex(index);
      setHoverStyle({
        left: rect.left - navRect.left,
        width: rect.width,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
      <fieldset
        ref={navRef}
        className="relative flex bg-white/10 backdrop-blur-md rounded-full border border-white/20"
        onMouseLeave={handleMouseLeave}
      >
        {/* Elemento de hover deslizante */}
        <div
          className="absolute top-0 bottom-0 bg-white/20 rounded-full transition-all duration-300 ease-out pointer-events-none"
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
            className="relative z-10 px-4 py-3 text-white/70 text-nowrap hover:text-white transition-colors duration-300 text-sm font-medium cursor-pointer"
          >
            {item.label}
          </button>
        ))}{" "}
      </fieldset>
    </nav>
  );
}
