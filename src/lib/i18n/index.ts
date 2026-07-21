import ar from "./ar.json";
import en from "./en.json";
import type { Locale } from "@/lib/types";

export type TranslationKey = string;

const translations = { ar, en };

export function t(locale: Locale, key: string): string {
  const keys = key.split(".");
  let result: unknown = translations[locale];

  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof result === "string" ? result : key;
}
