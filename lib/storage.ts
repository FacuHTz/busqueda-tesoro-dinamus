import type { Progress } from "./types";

// ============================================================
// 💾 PROGRESO EN LOCALSTORAGE
// Todo el avance del equipo vive en el celular. Si cierran
// el navegador o se queda sin batería, al volver a entrar
// retoman exactamente donde estaban.
// ============================================================

const KEY = "conquis-tesoro-v1";

export function loadProgress(): Progress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Progress;
    if (!parsed || typeof parsed.teamId !== "string") return null;
    return {
      teamId: parsed.teamId,
      stepIndex: typeof parsed.stepIndex === "number" ? parsed.stepIndex : 0,
      phase: parsed.phase === "clue" ? "clue" : "challenge",
      startedAt: typeof parsed.startedAt === "number" ? parsed.startedAt : Date.now(),
      penaltyUntil: typeof parsed.penaltyUntil === "number" ? parsed.penaltyUntil : 0,
      finishedAt: typeof parsed.finishedAt === "number" ? parsed.finishedAt : null,
    };
  } catch {
    return null;
  }
}

export function saveProgress(p: Progress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // localStorage lleno o bloqueado: el juego sigue en memoria igual
  }
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // nada
  }
}
