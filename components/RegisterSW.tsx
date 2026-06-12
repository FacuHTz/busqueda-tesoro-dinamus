"use client";

import { useEffect } from "react";

/** Registra el service worker para que la app funcione como PWA instalable. */
export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Si falla no pasa nada: la app sigue andando como web normal.
      });
    }
  }, []);

  return null;
}
