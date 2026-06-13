"use client";

import { useState } from "react";
import type { Clue } from "@/lib/types";
import { CONFIG } from "@/data/games";
import { normalizeCode, vibrate } from "@/lib/utils";

type Props = {
  clue: Clue;
  clueNumber: number; // 1-based
  isLast: boolean; // si es la pista final que lleva al tesoro
  onCorrect: () => void;
  onTooManyAttempts: () => void; // 5 intentos fallidos → penalización
};

/**
 * Pantalla de pista 🗺️: muestra la pista de ubicación y pide
 * el código escrito en el papel escondido.
 */
export default function ClueScreen({ clue, clueNumber, isLast, onCorrect, onTooManyAttempts }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const validate = () => {
    if (!code.trim()) return;
    if (normalizeCode(code) === normalizeCode(clue.code)) {
      onCorrect();
      return;
    }
    const next = attempts + 1;
    setAttempts(next);
    setCode("");
    setError(true);
    vibrate([60, 40, 60]);
    setTimeout(() => setError(false), 1300);
    if (next >= CONFIG.MAX_CODE_ATTEMPTS) {
      setAttempts(0);
      onTooManyAttempts();
    }
  };

  const remaining = CONFIG.MAX_CODE_ATTEMPTS - attempts;

  return (
    <div className="animate-fadeUp px-5 pb-28 pt-6">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <span className="inline-block animate-floaty text-6xl">{isLast ? "🏴‍☠️" : "🗺️"}</span>
          <h2 className="mt-2 text-2xl font-bold text-amber-300">
            {isLast ? "¡PISTA FINAL: EL TESORO!" : `PISTA #${clueNumber}`}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {isLast
              ? "Encuentren el tesoro y escriban el código que está con él 💰"
              : "Vayan al lugar, encuentren el papel escondido y escriban su código 🕵️"}
          </p>
        </div>

        {/* Pergamino con la pista */}
        <div className="mt-6 rounded-3xl border-2 border-amber-500/30 bg-gradient-to-b from-amber-950/60 to-slate-900/80 p-6 shadow-xl shadow-amber-900/20">
          <p className="text-center text-lg font-medium leading-relaxed text-amber-100">
            “{clue.text}”
          </p>
        </div>

        <div className={`mt-7 ${error ? "animate-shake" : ""}`}>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && validate()}
            placeholder="CÓDIGO ESCONDIDO"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            className={`w-full rounded-2xl border-2 bg-slate-900/70 px-5 py-4 text-center text-xl font-bold uppercase tracking-[0.2em] text-amber-300 placeholder:text-base placeholder:font-medium placeholder:tracking-normal placeholder:text-slate-600 focus:outline-none ${
              error
                ? "border-rose-500/80 shadow-lg shadow-rose-500/20"
                : "border-slate-700 focus:border-amber-400"
            }`}
          />
          {error && (
            <p className="mt-2 animate-pop text-center text-sm font-semibold text-rose-400">
              Ese código no es 😬{" "}
              {remaining > 0 && remaining < CONFIG.MAX_CODE_ATTEMPTS && (
                <span className="text-slate-500">({remaining} intentos antes del bloqueo)</span>
              )}
            </p>
          )}
        </div>

        <button
          onClick={validate}
          disabled={!code.trim()}
          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4 text-lg font-bold text-slate-900 shadow-xl shadow-amber-500/30 transition active:scale-[0.97] disabled:opacity-40 disabled:shadow-none"
        >
          {isLast ? "¡ABRIR EL TESORO! 💰" : "DESBLOQUEAR 🔓"}
        </button>
      </div>
    </div>
  );
}
