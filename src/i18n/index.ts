import { isLocale, type Locale, defaultLocale } from "./config";
import { es } from "./es";
import { en } from "./en";

const dictionaries = { es, en } as const;

export type Dictionary = typeof es;
export type { Dictionary as Dict };

export function getDictionary(lang: string): Dictionary {
  if (isLocale(lang)) return dictionaries[lang] as Dictionary;
  return dictionaries[defaultLocale];
}

export function getLocale(lang: string): Locale {
  return isLocale(lang) ? lang : defaultLocale;
}

export { locales, defaultLocale, localeNames, isLocale } from "./config";
export type { Locale } from "./config";
