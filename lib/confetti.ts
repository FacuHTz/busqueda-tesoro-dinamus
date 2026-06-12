// ============================================================
// 🎉 CONFETTI
// Carga canvas-confetti de forma lazy para que nunca rompa
// en el render del servidor.
// ============================================================

type ConfettiFn = (opts?: Record<string, unknown>) => void;

let cached: ConfettiFn | null = null;

async function getConfetti(): Promise<ConfettiFn> {
  if (!cached) {
    const mod = await import("canvas-confetti");
    cached = mod.default as unknown as ConfettiFn;
  }
  return cached;
}

/** Explosión chica (códigos correctos, toques rápidos). */
export function smallBurst(): void {
  getConfetti().then((confetti) => {
    confetti({ particleCount: 70, spread: 75, origin: { y: 0.7 }, zIndex: 9999 });
  });
}

/** Festejo grande: varias explosiones encadenadas. */
export function bigCelebration(): void {
  getConfetti().then((confetti) => {
    const base = { zIndex: 9999 };
    confetti({ ...base, particleCount: 130, spread: 100, origin: { y: 0.6 } });
    setTimeout(
      () => confetti({ ...base, particleCount: 90, angle: 60, spread: 70, origin: { x: 0, y: 0.7 } }),
      200
    );
    setTimeout(
      () => confetti({ ...base, particleCount: 90, angle: 120, spread: 70, origin: { x: 1, y: 0.7 } }),
      380
    );
    setTimeout(
      () => confetti({ ...base, particleCount: 110, spread: 130, origin: { y: 0.4 }, scalar: 1.2 }),
      650
    );
  });
}

/** Lluvia continua para la pantalla de victoria. Devuelve una función para frenarla. */
export function victoryRain(): () => void {
  let stopped = false;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  getConfetti().then((confetti) => {
    if (stopped) return;
    bigCelebration();
    intervalId = setInterval(() => {
      confetti({
        zIndex: 9999,
        particleCount: 45,
        spread: 90,
        startVelocity: 35,
        origin: { x: Math.random(), y: Math.random() * 0.3 },
      });
    }, 900);
  });

  return () => {
    stopped = true;
    if (intervalId) clearInterval(intervalId);
  };
}
