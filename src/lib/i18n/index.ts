import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import type { Language, Translations } from "./types";

export const translations: Record<Language, Translations> = {
  es,
  en,
  fr,
};

export const defaultLanguage: Language = "es";

export const getTranslations = (language: Language): Translations => {
  return translations[language] || translations[defaultLanguage];
};

export * from "./types";
