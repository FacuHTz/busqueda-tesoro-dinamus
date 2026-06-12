"use client";

import { useState } from "react";
import type { OrderListData } from "@/lib/types";
import { shuffleDifferent, vibrate } from "@/lib/utils";

type Props = {
  data: OrderListData;
  onCorrect: () => void;
  onWrong: () => void;
};

/**
 * Ordenar lista 📋: tocás los ítems disponibles y se van
 * acomodando en los casilleros numerados. Tocás un casillero
 * para sacar el ítem y volverlo a la lista.
 */
export default function OrderList({ data, onCorrect, onWrong }: Props) {
  const [pool] = useState<number[]>(() => shuffleDifferent(data.items.map((_, i) => i)));
  const [slots, setSlots] = useState<(number | null)[]>(() => data.items.map(() => null));
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);

  const placed = slots.filter((s) => s !== null) as number[];
  const full = placed.length === data.items.length;

  const place = (idx: number) => {
    if (flash || placed.includes(idx)) return;
    vibrate(20);
    setSlots((prev) => {
      const firstEmpty = prev.indexOf(null);
      if (firstEmpty === -1) return prev;
      const next = [...prev];
      next[firstEmpty] = idx;
      return next;
    });
  };

  const remove = (slotIdx: number) => {
    if (flash) return;
    setSlots((prev) => {
      const next = [...prev];
      next[slotIdx] = null;
      return next;
    });
  };

  const respond = () => {
    if (!full || flash) return;
    const ok = slots.every((itemIdx, slotIdx) => itemIdx === slotIdx);
    if (ok) {
      setFlash("ok");
      vibrate([50, 40, 90]);
      setTimeout(onCorrect, 700);
    } else {
      setFlash("bad");
      vibrate([80, 50, 80]);
      setTimeout(() => {
        setSlots(data.items.map(() => null));
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

      {/* Casilleros numerados */}
      <div
        className={`mt-6 space-y-2 rounded-2xl border-2 p-3 ${
          flash === "ok"
            ? "border-emerald-400 bg-emerald-500/10"
            : flash === "bad"
              ? "animate-shake border-rose-500 bg-rose-500/10"
              : "border-slate-800 bg-slate-900/40"
        }`}
      >
        {slots.map((itemIdx, slotIdx) => (
          <button
            key={slotIdx}
            onClick={() => itemIdx !== null && remove(slotIdx)}
            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition active:scale-[0.98] ${
              itemIdx !== null
                ? "border-amber-400/60 bg-amber-400/10 text-amber-100"
                : "border-dashed border-slate-700 bg-slate-950/40 text-slate-700"
            }`}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-300">
              {slotIdx + 1}
            </span>
            {itemIdx !== null ? data.items[itemIdx] : "Tocá un ítem para ponerlo acá"}
          </button>
        ))}
      </div>

      {/* Ítems disponibles */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {pool.map((idx) => {
          const used = placed.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => place(idx)}
              disabled={used || !!flash}
              className={`rounded-xl border-2 px-3 py-2 text-sm font-bold transition active:scale-90 ${
                used
                  ? "border-slate-800 bg-slate-900/40 text-slate-700"
                  : "border-slate-600 bg-slate-800 text-slate-100 shadow"
              }`}
            >
              {data.items[idx]}
            </button>
          );
        })}
      </div>

      <button
        onClick={respond}
        disabled={!full || !!flash}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4 text-lg font-bold text-slate-900 shadow-xl shadow-amber-500/30 transition active:scale-[0.97] disabled:opacity-40 disabled:shadow-none"
      >
        VALIDAR ORDEN ✅
      </button>
    </div>
  );
}
