"use client";

import { useState } from "react";
import { CONFIG } from "@/data/games";
import { normalizeCode, vibrate } from "@/lib/utils";

type Props = {
  onReset: () => void;
};

/**
 * Menú de líder ⚙️: con el código de admin se puede resetear
 * el progreso de este celular (por si hay que arrancar de cero).
 */
export default function AdminMenu({ onReset }: Props) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const close = () => {
    setOpen(false);
    setCode("");
    setError(false);
  };

  const tryReset = () => {
    if (normalizeCode(code) === normalizeCode(CONFIG.ADMIN_CODE)) {
      close();
      onReset();
    } else {
      setError(true);
      vibrate(80);
      setTimeout(() => setError(false), 1200);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Menú de líder"
        className="rounded-xl p-2 text-lg text-slate-500 transition active:scale-90"
      >
        ⚙️
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
          <div className="w-full max-w-sm animate-pop rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-100">⚙️ Zona de líderes</h2>
            <p className="mt-1 text-sm text-slate-400">
              Ingresá el código de líder para <b>resetear este celular</b> (borra todo el progreso).
            </p>

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && tryReset()}
              placeholder="Código de líder"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              className={`mt-4 w-full rounded-xl border-2 bg-slate-950 px-4 py-3 text-center font-bold uppercase tracking-widest text-slate-100 focus:outline-none ${
                error ? "animate-shake border-rose-500" : "border-slate-700 focus:border-amber-400"
              }`}
            />
            {error && <p className="mt-2 text-center text-xs font-semibold text-rose-400">Código incorrecto 🙅</p>}

            <div className="mt-5 flex gap-3">
              <button
                onClick={close}
                className="flex-1 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 active:scale-95"
              >
                Cancelar
              </button>
              <button
                onClick={tryReset}
                className="flex-1 rounded-xl bg-rose-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-rose-600/30 active:scale-95"
              >
                Resetear 🔄
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
