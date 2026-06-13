"use client";

import { useState, useRef } from "react";

const BYPASS_CODE = "conquis2026";

type Props = {
  onBypass: () => void;
};

/**
 * Boton discreto para saltear cualquier desafio o pista.
 * Solo funciona si se ingresa el codigo correcto.
 * Aparece en la esquina inferior derecha de cada pantalla.
 */
export default function BypassButton({ onBypass }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setOpen(true);
    setInput("");
    setError(false);
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const handleClose = () => {
    setOpen(false);
    setInput("");
    setError(false);
  };

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === BYPASS_CODE) {
      setOpen(false);
      onBypass();
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 1200);
    }
  };

  return (
    <>
      {/* Boton chiquito fijo en la esquina */}
      <button
        onClick={handleOpen}
        aria-label="Resolver desafio"
        className="fixed bottom-6 right-4 z-40 rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 shadow-md backdrop-blur-sm transition hover:border-slate-500 hover:text-slate-300 active:scale-95"
      >
        resolver
      </button>

      {/* Modal de clave */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-xs rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-1 text-center text-sm font-bold uppercase tracking-wider text-slate-300">
              Clave de resolución
            </p>
            <p className="mb-4 text-center text-xs text-slate-500">
              Solo para líderes y pruebas
            </p>

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              type="password"
              placeholder="••••••••••••"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className={`w-full rounded-xl border-2 bg-slate-800 px-4 py-3 text-center text-base font-semibold text-white placeholder:text-slate-600 focus:outline-none transition ${
                error
                  ? "border-rose-500/80 animate-shake"
                  : "border-slate-700 focus:border-slate-500"
              }`}
            />
            {error && (
              <p className="mt-2 text-center text-xs font-semibold text-rose-400">
                Clave incorrecta
              </p>
            )}

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 rounded-xl border border-slate-700 py-2.5 text-sm font-semibold text-slate-400 transition active:scale-95"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!input.trim()}
                className="flex-1 rounded-xl bg-slate-700 py-2.5 text-sm font-bold text-white transition active:scale-95 disabled:opacity-40"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
