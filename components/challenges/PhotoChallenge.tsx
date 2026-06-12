"use client";

import { useState } from "react";
import type { PhotoChallengeData } from "@/lib/types";
import { CONFIG } from "@/data/games";
import { normalizeCode, vibrate } from "@/lib/utils";

type Props = {
  data: PhotoChallengeData;
  onCorrect: () => void;
  onTooManyAttempts: () => void;
};

/**
 * Reto fotográfico 📸: cumplen el reto fuera de la app
 * (sacan fotos con el celu) y el líder les da el código
 * cuando aprueba las fotos.
 */
export default function PhotoChallenge({ data, onCorrect, onTooManyAttempts }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const validate = () => {
    if (!code.trim()) return;
    if (normalizeCode(code) === normalizeCode(data.code)) {
      vibrate([50, 40, 90]);
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

  return (
    <div className="animate-fadeUp">
      <div className="mb-3 text-center text-6xl">{data.emoji ?? "📸"}</div>
      <h2 className="text-balance text-center text-xl font-bold leading-snug text-slate-100">
        {data.title}
      </h2>

      <div className="mt-5 rounded-3xl border-2 border-sky-500/30 bg-gradient-to-b from-sky-950/50 to-slate-900/80 p-5 shadow-xl">
        <p className="whitespace-pre-line text-base leading-relaxed text-sky-100">{data.instructions}</p>
      </div>

      <p className="mt-5 text-center text-sm text-slate-500">
        Cuando el líder apruebe el reto, les va a dar un código. Escribilo acá 👇
      </p>

      <div className={`mt-3 ${error ? "animate-shake" : ""}`}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && validate()}
          placeholder="CÓDIGO DEL LÍDER"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          className={`w-full rounded-2xl border-2 bg-slate-900/70 px-5 py-4 text-center text-xl font-bold uppercase tracking-[0.2em] text-sky-300 placeholder:text-base placeholder:font-medium placeholder:tracking-normal placeholder:text-slate-600 focus:outline-none ${
            error ? "border-rose-500/80" : "border-slate-700 focus:border-sky-400"
          }`}
        />
        {error && (
          <p className="mt-2 animate-pop text-center text-sm font-semibold text-rose-400">
            Ese código no es 😬
          </p>
        )}
      </div>

      <button
        onClick={validate}
        disabled={!code.trim()}
        className="mt-5 w-full rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-500 px-6 py-4 text-lg font-bold text-slate-900 shadow-xl shadow-sky-500/30 transition active:scale-[0.97] disabled:opacity-40 disabled:shadow-none"
      >
        VALIDAR RETO ✅
      </button>
    </div>
  );
}
