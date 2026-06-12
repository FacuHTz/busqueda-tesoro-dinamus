"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/**
 * Banner para instalar la app en la pantalla principal.
 * Aparece solo cuando Chrome dispara el evento `beforeinstallprompt`.
 */
export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setDeferred(null);

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!deferred || hidden) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 animate-fadeUp">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-amber-400/30 bg-slate-900/95 p-3 shadow-2xl shadow-black/50 backdrop-blur">
        <span className="text-3xl">📲</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-100">¡Instalá la app!</p>
          <p className="text-xs text-slate-400">Agregala a tu pantalla principal para jugar mejor.</p>
        </div>
        <button
          onClick={() => setHidden(true)}
          className="rounded-xl px-2 py-2 text-xs font-semibold text-slate-400 active:scale-95"
        >
          Ahora no
        </button>
        <button
          onClick={async () => {
            await deferred.prompt();
            setDeferred(null);
          }}
          className="rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-3 py-2 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/30 active:scale-95"
        >
          Instalar
        </button>
      </div>
    </div>
  );
}
