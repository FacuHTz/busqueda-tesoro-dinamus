"use client";

import { useMemo, useState } from "react";
import type { WordOrderData } from "@/lib/types";
import { shuffleDifferent, vibrate } from "@/lib/utils";

type Props = {
  data: WordOrderData;
  onCorrect: () => void;
  onWrong: () => void;
};

/**
 * Frase desordenada 🧩: las palabras aparecen mezcladas y hay
 * que tocarlas en orden para armar la frase correcta.
 * Se trabaja con ÍNDICES para soportar palabras repetidas ("de", "y"…).
 */
export default function WordOrder({ data, onCorrect, onWrong }: Props) {
  const words = useMemo(() => data.phrase.trim().split(/\s+/), [data.phrase]);

  // Orden mezclado de índices [0..n)
  const [pool] = useState<number[]>(() => shuffleDifferent(words.map((_, i) => i)));
  const [picked, setPicked] = useState<number[]>([]); // índices elegidos, en orden
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);

  const pick = (idx: number) => {
    if (flash || picked.includes(idx)) return;
    vibrate(20);
    setPicked((p) => [...p, idx]);
  };

  const unpick = (idx: number) => {
    if (flash) return;
    setPicked((p) => p.filter((i) => i !== idx));
  };

  const respond = () => {
    if (picked.length !== words.length || flash) return;
    const built = picked.map((i) => words[i]).join(" ");
    if (built === words.join(" ")) {
      setFlash("ok");
      vibrate([50, 40, 90]);
      setTimeout(onCorrect, 700);
    } else {
      setFlash("bad");
      vibrate([80, 50, 80]);
      setTimeout(() => {
        setPicked([]);
        setFlash(null);
        onWrong();
      }, 900);
    }
  };

  return (
    <div className="animate-fadeUp">
      {data.emoji && <div className="mb-3 text-center text-6xl">{data.emoji}</div>}
      <h2 className="text-balance text-center text-xl font-bold leading-snug text-slate-100">
        {data.title}
      </h2>
      {data.subtitle && <p className="mt-1 text-center text-sm text-slate-500">{data.subtitle}</p>}

      {/* Frase armada hasta ahora */}
      <div
        className={`mt-6 min-h-[88px] rounded-2xl border-2 border-dashed p-3 ${
          flash === "ok"
            ? "border-emerald-400 bg-emerald-500/10"
            : flash === "bad"
              ? "animate-shake border-rose-500 bg-rose-500/10"
              : "border-slate-700 bg-slate-900/50"
        }`}
      >
        {picked.length === 0 ? (
          <p className="py-4 text-center text-sm text-slate-600">Tocá las palabras de abajo 👇</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {picked.map((idx) => (
              <button
                key={idx}
                onClick={() => unpick(idx)}
                className="rounded-xl bg-amber-400 px-3 py-2 text-sm font-bold text-slate-900 shadow active:scale-90"
              >
                {words[idx]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Palabras disponibles */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {pool.map((idx) => {
          const used = picked.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => pick(idx)}
              disabled={used || !!flash}
              className={`rounded-xl border-2 px-3 py-2 text-sm font-bold transition active:scale-90 ${
                used
                  ? "border-slate-800 bg-slate-900/40 text-slate-700"
                  : "border-slate-600 bg-slate-800 text-slate-100 shadow"
              }`}
            >
              {words[idx]}
            </button>
          );
        })}
      </div>

      <button
        onClick={respond}
        disabled={picked.length !== words.length || !!flash}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4 text-lg font-bold text-slate-900 shadow-xl shadow-amber-500/30 transition active:scale-[0.97] disabled:opacity-40 disabled:shadow-none"
      >
        VALIDAR FRASE ✅
      </button>
    </div>
  );
}
