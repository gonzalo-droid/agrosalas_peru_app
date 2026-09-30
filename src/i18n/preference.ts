import { isLocale, type Locale } from "./config";

const PREFERENCE_KEY = "agrosalas_locale";
const HINT_KEY = "agrosalas_locale_hint";

// localStorage puede lanzar (modo privado, cookies bloqueadas): nunca romper la UI.

export function readPreference(): Locale | null {
  try {
    const value = localStorage.getItem(PREFERENCE_KEY);
    return value && isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

export function savePreference(locale: Locale): void {
  try {
    localStorage.setItem(PREFERENCE_KEY, locale);
  } catch {
    /* almacenamiento no disponible */
  }
}

/** Si no se puede leer, se considera descartado para no mostrar el aviso. */
export function isHintDismissed(): boolean {
  try {
    return localStorage.getItem(HINT_KEY) === "dismissed";
  } catch {
    return true;
  }
}

export function dismissHint(): void {
  try {
    localStorage.setItem(HINT_KEY, "dismissed");
  } catch {
    /* almacenamiento no disponible */
  }
}
