// ============================================================
// 🛠️ UTILIDADES
// ============================================================

/** Normaliza texto: saca tildes, mayúsculas y espacios extra. */
export function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/** Normaliza un código: sin tildes, sin espacios, todo en mayúscula. */
export function normalizeCode(s: string): string {
  return normalize(s).replace(/\s+/g, "").toUpperCase();
}

/** Mezcla un array (Fisher-Yates). */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Mezcla asegurándose de que NO quede en el orden original. */
export function shuffleDifferent<T>(arr: T[]): T[] {
  if (arr.length < 2) return [...arr];
  let out = shuffle(arr);
  let guard = 0;
  while (out.every((v, i) => v === arr[i]) && guard < 10) {
    out = shuffle(arr);
    guard++;
  }
  return out;
}

/** Vibración del celular (si el dispositivo lo soporta). */
export function vibrate(pattern: number | number[]): void {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    // sin drama si no se puede
  }
}

/** Formatea milisegundos como "1h 23m 45s" o "23m 45s". */
export function formatElapsed(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
}
