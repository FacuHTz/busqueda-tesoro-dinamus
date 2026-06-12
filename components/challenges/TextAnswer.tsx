"use client";

import { useState } from "react";
import type { TextAnswerData } from "@/lib/types";
import { normalize, vibrate } from "@/lib/utils";

type Props = {
  data: TextAnswerData;
  onCorrect: () => void;
  onWrong: () => void;
};

export default function TextAnswer({ data, onCorrect, onWrong }: Props) {
  const [value, setValue] = useState("");
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);

  const respond = () => {
    if (!value.trim() || flash) return;
    const ok = data.answers.some((a) => normalize(a) === normalize(value));
    if (ok) {
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
      <p className="mt-2 text-center text-sm text-slate-500">
        Escribí la respuesta exacta ✍️ (no importan mayúsculas ni tildes)
      </p>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && respond()}
        placeholder={data.placeholder ?? "Tu respuesta…"}
        autoCorrect="off"
        spellCheck={false}
        disabled={!!flash}
        className={`mt-6 w-full rounded-2xl border-2 bg-slate-900/70 px-5 py-4 text-center text-xl font-bold text-slate-100 placeholder:text-base placeholder:font-medium placeholder:text-slate-600 focus:outline-none ${
          flash === "bad"
            ? "animate-shake border-rose-500/80"
            : flash === "ok"
              ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
              : "border-slate-700 focus:border-amber-400"
        }`}
      />

      <button
        onClick={respond}
        disabled={!value.trim() || !!flash}
        className="mt-5 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4 text-lg font-bold text-slate-900 shadow-xl shadow-amber-500/30 transition active:scale-[0.97] disabled:opacity-40 disabled:shadow-none"
      >
        RESPONDER ✅
      </button>
    </div>
  );
}
