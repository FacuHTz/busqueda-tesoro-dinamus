"use client";

import { useMemo, useState } from "react";
import type { FindAllData } from "@/lib/types";
import { shuffle, vibrate } from "@/lib/utils";

type Props = {
  data: FindAllData;
  onCorrect: () => void;
  onWrong: () => void;
};

/**
 * Encontralos a todos 🔍: hay que seleccionar exactamente los
 * `targets` entre todos los nombres mezclados. Si está mal,
 * NO se dice cuáles fallaron: solo que la selección es incorrecta.
 */
export default function FindAll({ data, onCorrect, onWrong }: Props) {
  const all = useMemo(() => shuffle([...data.targets, ...data.decoys]), [data]);
  const targetSet = useMemo(() => new Set(data.targets), [data]);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);

  const toggle = (name: string) => {
    if (flash) return;
    vibrate(15);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else if (next.size < data.targets.length) next.add(name);
      return next;
    });
  };

  const respond = () => {
    if (selected.size !== data.targets.length || flash) return;
    const ok = [...selected].every((n) => targetSet.has(n));
    if (ok) {
      setFlash("ok");
      vibrate([50, 40, 90]);
      setTimeout(onCorrect, 700);
    } else {
      setFlash("bad");
      vibrate([80, 50, 80]);
      setTimeout(() => {
        setSelected(new Set());
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

      {/* Contador */}
      <div className="sticky top-[88px] z-10 mt-4 flex justify-center">
        <span
          className={`rounded-full border px-4 py-1.5 text-sm font-bold shadow-lg backdrop-blur ${
            selected.size === data.targets.length
              ? "border-amber-400 bg-amber-400/15 text-amber-300"
              : "border-slate-700 bg-slate-900/90 text-slate-300"
          }`}
        >
          Seleccionados: {selected.size}/{data.targets.length}
        </span>
      </div>

      <div
        className={`mt-4 flex flex-wrap justify-center gap-2 rounded-2xl border-2 p-3 ${
          flash === "ok"
            ? "border-emerald-400 bg-emerald-500/10"
            : flash === "bad"
              ? "animate-shake border-rose-500 bg-rose-500/10"
              : "border-transparent"
        }`}
      >
        {all.map((name) => {
          const isSel = selected.has(name);
          return (
            <button
              key={name}
              onClick={() => toggle(name)}
              disabled={!!flash}
              className={`rounded-xl border-2 px-3 py-2 text-sm font-semibold transition active:scale-90 ${
                isSel
                  ? "border-amber-400 bg-amber-400/15 text-amber-200 shadow shadow-amber-500/20"
                  : "border-slate-700 bg-slate-900/60 text-slate-300"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {flash === "bad" && (
        <p className="mt-3 animate-pop text-center text-sm font-bold text-rose-400">
          ¡Hay alguno mal! No te decimos cuál 😏
        </p>
      )}

      <button
        onClick={respond}
        disabled={selected.size !== data.targets.length || !!flash}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4 text-lg font-bold text-slate-900 shadow-xl shadow-amber-500/30 transition active:scale-[0.97] disabled:opacity-40 disabled:shadow-none"
      >
        VALIDAR LOS {data.targets.length} ✅
      </button>
    </div>
  );
}
