"use client";

import { useState } from "react";
import { vibrate } from "@/lib/utils";

const FLOATERS = [
  { emoji: "🗺️", className: "left-[8%] top-[12%] text-4xl", delay: "0s" },
  { emoji: "💎", className: "right-[10%] top-[18%] text-3xl", delay: "0.6s" },
  { emoji: "🧭", className: "left-[14%] bottom-[22%] text-3xl", delay: "1.1s" },
  { emoji: "⚜️", className: "right-[14%] bottom-[14%] text-4xl", delay: "0.3s" },
  { emoji: "🔑", className: "left-[42%] top-[6%] text-2xl", delay: "1.6s" },
];

type Props = {
  onSubmit: (code: string) => boolean; // devuelve true si el código era válido
};

export default function WelcomeScreen({ onSubmit }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const validate = () => {
    if (!code.trim()) return;
    const ok = onSubmit(code);
    if (!ok) {
      setError(true);
      vibrate([60, 40, 60]);
      setTimeout(() => setError(false), 1400);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-10">
      {/* Emojis flotando de fondo */}
      {FLOATERS.map((f) => (
        <span
          key={f.emoji}
          aria-hidden
          className={`pointer-events-none absolute animate-floaty opacity-40 ${f.className}`}
          style={{ animationDelay: f.delay }}
        >
          {f.emoji}
        </span>
      ))}

      <div className="w-full max-w-md animate-bounceIn text-center">
        <div className="mb-4 inline-block animate-wiggle text-7xl drop-shadow-[0_0_25px_rgba(251,191,36,0.45)]">
          🏴‍☠️
        </div>

        <h1 className="text-balance bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-4xl font-bold leading-tight text-transparent drop-shadow-sm">
          ¡Bienvenido al juego de la Búsqueda del Tesoro!
        </h1>

        <p className="mx-auto mt-3 max-w-xs text-sm text-slate-400">
          Cuando estés listo para arrancar solo colocá tu código para comenzar el juego
        </p>

        <div className={`mt-8 ${error ? "animate-shake" : ""}`}>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && validate()}
            placeholder="CÓDIGO DEL EQUIPO"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            className={`w-full rounded-2xl border-2 bg-slate-900/70 px-5 py-4 text-center text-xl font-bold uppercase tracking-[0.25em] text-amber-300 placeholder:text-base placeholder:font-medium placeholder:tracking-normal placeholder:text-slate-600 focus:outline-none ${
              error
                ? "border-rose-500/80 shadow-lg shadow-rose-500/20"
                : "border-amber-400/40 shadow-lg shadow-amber-500/10 focus:border-amber-400"
            }`}
          />

          {error && (
            <p className="mt-2 animate-pop text-sm font-semibold text-rose-400">
              Ese código no es válido 😅 ¡Probá de nuevo!
            </p>
          )}
        </div>

        <button
          onClick={validate}
          disabled={!code.trim()}
          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4 text-lg font-bold text-slate-900 shadow-xl shadow-amber-500/30 transition active:scale-[0.97] disabled:opacity-40 disabled:shadow-none"
        >
          VALIDAR CÓDIGO ✅
        </button>

        <p className="mt-10 text-xs text-slate-600">Club de Conquistadores ⛺ Búsqueda del Tesoro</p>
      </div>
    </main>
  );
}
