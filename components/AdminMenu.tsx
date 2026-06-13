"use client";

import { useState } from "react";
import { CONFIG } from "@/data/games";
import { normalizeCode, vibrate } from "@/lib/utils";

type Props = {
  onReset: () => void;
  onSolveCurrent: () => void;
};

/**
 * Menú de líder ⚙️: con el código de líder se puede
 *  - resetear el progreso de este celular (arrancar de cero), o
 *  - resolver automáticamente el paso actual (para pruebas o si algo falla).
 */
export default function AdminMenu({ onReset, onSolveCurrent }: Props) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const close = () => {
    setOpen(false);
    setCode("");
    setError(false);
  };

  const run = (action: () => void) => {
    if (normalizeCode(code) === normalizeCode(CONFIG.ADMIN_CODE)) {
      close();
      action();
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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-6 py-10 backdrop-blur-sm">
          <div className="my-auto w-full max-w-sm animate-pop rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-100">⚙️ Zona de líderes</h2>
            <p className="mt-1 text-sm text-slate-400">
              Ingresá el código de líder y elegí una acción.
            </p>

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Código de líder"
              type="password"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              className={`mt-4 w-full rounded-xl border-2 bg-slate-950 px-4 py-3 text-center font-bold uppercase tracking-widest text-slate-100 focus:outline-none ${
                error ? "animate-shake border-rose-500" : "border-slate-700 focus:border-amber-400"
              }`}
            />
            {error && <p className="mt-2 text-center text-xs font-semibold text-rose-400">Código incorrecto 🙅</p>}

            <div className="mt-5 flex flex-col gap-3">
              <button
                onClick={() => run(onSolveCurrent)}
                className="w-full rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/30 active:scale-95"
              >
                Resolver la actual ✅
              </button>
              <button
                onClick={() => run(onReset)}
                className="w-full rounded-xl bg-rose-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-rose-600/30 active:scale-95"
              >
                Restablecer desde el inicio 🔄
              </button>
              <button
                onClick={close}
                className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 active:scale-95"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
