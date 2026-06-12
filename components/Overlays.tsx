"use client";

import { useEffect, useMemo } from "react";
import type { Team } from "@/lib/types";
import { CELEBRATION_EMOJIS, CELEBRATION_PHRASES } from "@/data/games";
import { bigCelebration, smallBurst } from "@/lib/confetti";
import { vibrate } from "@/lib/utils";

// ------------------------------------------------------------
// 🎉 Festejo grande al superar un desafío (con botón CONTINUAR)
// ------------------------------------------------------------
export function CelebrationOverlay({ onContinue }: { onContinue: () => void }) {
  const phrase = useMemo(
    () => CELEBRATION_PHRASES[Math.floor(Math.random() * CELEBRATION_PHRASES.length)],
    []
  );
  const emoji = useMemo(
    () => CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
    []
  );

  useEffect(() => {
    bigCelebration();
    vibrate([60, 50, 60, 50, 120]);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 px-8 backdrop-blur-sm">
      <div className="animate-bounceIn text-center">
        <div className="text-8xl drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">{emoji}</div>
        <h2 className="mt-4 bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-5xl font-bold text-transparent">
          {phrase}
        </h2>
        <p className="mt-2 text-slate-400">¡Desafío superado! 🙌</p>

        <button
          onClick={onContinue}
          className="mt-8 animate-glow rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 px-10 py-4 text-xl font-bold text-slate-900 shadow-xl shadow-emerald-500/30 transition active:scale-95"
        >
          CONTINUAR ➡️
        </button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// 🚩 Bienvenida del equipo (aparece al validar el código inicial)
// ------------------------------------------------------------
export function TeamIntroOverlay({ team, onDone }: { team: Team; onDone: () => void }) {
  useEffect(() => {
    bigCelebration();
    vibrate([60, 50, 120]);
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 px-8">
      <div className="animate-bounceIn text-center">
        <div className="text-8xl">{team.emoji}</div>
        <h2
          className={`mt-3 bg-gradient-to-r ${team.gradient} bg-clip-text text-5xl font-bold text-transparent`}
        >
          ¡EQUIPO {team.name}!
        </h2>
        <p className="mt-3 text-lg text-slate-300">¡Que empiece la aventura! 🗺️</p>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// ✅ Toast breve al acertar un código de pista
// ------------------------------------------------------------
export function CodeOkToast({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    smallBurst();
    vibrate([50, 40, 90]);
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-8">
      <div className="animate-bounceIn rounded-3xl border border-emerald-400/40 bg-slate-900/95 px-8 py-6 text-center shadow-2xl shadow-emerald-500/20">
        <div className="text-6xl">🔓</div>
        <p className="mt-2 text-xl font-bold text-emerald-400">¡Código correcto!</p>
        <p className="text-sm text-slate-400">Desbloqueando el siguiente desafío…</p>
      </div>
    </div>
  );
}
