import { useState } from "preact/hooks";
import { useI18n } from "@/hooks/useI18n";
import type { Language } from "@/lib/i18n";

const languages: { code: Language; name: string; flagSrc: string }[] = [
  { code: "es", name: "Español", flagSrc: "/flags/es.svg" },
  { code: "en", name: "English", flagSrc: "/flags/us.svg" },
  { code: "fr", name: "Français", flagSrc: "/flags/fr.svg" },
  { code: "pt", name: "Português", flagSrc: "/flags/pt.svg" },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  return (
    <div className="fixed top-10 right-6 z-50">
      <div className="relative">
        {/* Botón principal */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex min-w-[100px] cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white/90 backdrop-blur-md transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/30 focus:outline-none"
        >
          <img
            src={currentLanguage.flagSrc}
            alt={currentLanguage.name}
            className="h-3 w-4 rounded-sm object-cover"
          />
          <span>{currentLanguage.name}</span>
          <svg
            className={`h-4 w-4 text-white/70 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-1 min-w-[100px] overflow-hidden rounded-lg border border-white/20 bg-white/10 backdrop-blur-md">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-white/20 ${
                  lang.code === language
                    ? "bg-white/10 text-white"
                    : "text-white/90"
                }`}
              >
                <img
                  src={lang.flagSrc}
                  alt={lang.name}
                  className="h-3 w-4 rounded-sm object-cover"
                />
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Overlay para cerrar el dropdown */}
      {isOpen && (
        <div className="fixed inset-0 -z-10" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
