import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import {
  defaultLanguage,
  getTranslations,
  type Language,
  type Translations,
} from "@/lib/i18n";

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | null>(null);

interface I18nProviderProps {
  children: ComponentChildren;
  initialLanguage?: Language;
}

export function I18nProvider({
  children,
  initialLanguage = defaultLanguage,
}: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const t = getTranslations(language);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const value: I18nContextType = {
    language,
    setLanguage: handleSetLanguage,
    t,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export function useTranslations(): Translations {
  const { t } = useI18n();
  return t;
}
