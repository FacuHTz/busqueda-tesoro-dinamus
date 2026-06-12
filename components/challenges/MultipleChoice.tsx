"use client";

import { useState } from "react";
import type { MultipleChoiceData } from "@/lib/types";
import { vibrate } from "@/lib/utils";

type Props = {
  data: MultipleChoiceData;
  onCorrect: () => void;
  onWrong: () => void;
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export default function MultipleChoice({ data, onCorrect, onWrong }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);

  const respond = () => {
    if (selected === null || flash) return;
    if (selected === data.correct) {
      setFlash("ok");
      vibrate([50, 40, 90]);
      setTimeout(onCorrect, 700);
    } else {
      setFlash("bad");
      vibrate([80, 50, 80]);
      setTimeout(onWrong, 900);
    }
  };

  return (
    <div className="animate-fadeUp">
      {data.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.image}
          alt=""
          className="mx-auto mb-4 max-h-52 rounded-2xl border border-slate-700 object-contain"
        />
      ) : (
        data.emoji && <div className="mb-3 text-center text-6xl">{data.emoji}</div>
      )}

      <h2 className="text-balance text-center text-xl font-bold leading-snug text-slate-100">
        {data.question}
      </h2>

      <div className="mt-6 space-y-3">
        {data.options.map((opt, i) => {
          const isSel = selected === i;
          const showOk = flash === "ok" && i === data.correct;
          const showBad = flash === "bad" && isSel;
          return (
            <button
              key={i}
              onClick={() => !flash && setSelected(i)}
              className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left text-base font-semibold transition active:scale-[0.98] ${
                showOk
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                  : showBad
                    ? "animate-shake border-rose-500 bg-rose-500/15 text-rose-200"
                    : isSel
                      ? "border-amber-400 bg-amber-400/10 text-amber-200 shadow-lg shadow-amber-500/10"
                      : "border-slate-700 bg-slate-900/60 text-slate-200"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  isSel || showOk ? "bg-amber-400 text-slate-900" : "bg-slate-800 text-slate-400"
                } ${showOk ? "!bg-emerald-400" : ""} ${showBad ? "!bg-rose-500 !text-white" : ""}`}
              >
                {showOk ? "✓" : showBad ? "✗" : LETTERS[i]}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      <button
        onClick={respond}
        disabled={selected === null || !!flash}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4 text-lg font-bold text-slate-900 shadow-xl shadow-amber-500/30 transition active:scale-[0.97] disabled:opacity-40 disabled:shadow-none"
      >
        RESPONDER ✅
      </button>
    </div>
  );
}
