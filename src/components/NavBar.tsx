import { useRef, useState } from "preact/hooks";
import { useTranslations } from "@/hooks/useI18n";

export default function NavBar() {
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

  return (
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
  );
}
