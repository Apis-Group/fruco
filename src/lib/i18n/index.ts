import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { pt } from "./pt";
import type { Language, Translations } from "./types";

export const translations: Record<Language, Translations> = {
  es,
  en,
  fr,
  pt,
};

export const defaultLanguage: Language = "es";

export const getTranslations = (language: Language): Translations => {
  return translations[language] || translations[defaultLanguage];
};

export * from "./types";
