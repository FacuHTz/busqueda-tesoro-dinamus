"use client";

import { useEffect, useState } from "react";
import { CONFIG } from "@/data/games";

type Props = {
  until: number; // timestamp en ms hasta el que dura el bloqueo
  onDone: () => void;
};

const SAD_PHRASES = [
  "Esa no era… 😢",
  "¡Uy, casi! Respirá hondo…",
  "A pensar mejor la próxima 🤔",
  "El tesoro va a tener que esperar…",
];

/**
 * Pantalla de penalización: bloquea el juego con una cuenta
 * regresiva "triste" hasta poder volver a intentar.
 */
export default function PenaltyScreen({ until, onDone }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.ceil((until - Date.now()) / 1000))
  );
  const [phrase] = useState(() => SAD_PHRASES[Math.floor(Math.random() * SAD_PHRASES.length)]);

  useEffect(() => {
    const tick = () => {
      const left = Math.max(0, Math.ceil((until - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left <= 0) onDone();
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [until, onDone]);

  const total = CONFIG.PENALTY_SECONDS;
  const ratio = Math.min(1, Math.max(0, secondsLeft / total));

  // Anillo SVG de cuenta regresiva
  const R = 70;
  const C = 2 * Math.PI * R;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 px-8 backdrop-blur">
      <div className="animate-pop text-center">
        <div className="relative mx-auto h-44 w-44">
          <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
            <circle cx="80" cy="80" r={R} fill="none" stroke="#1e293b" strokeWidth="10" />
            <circle
              cx="80"
              cy="80"
              r={R}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - ratio)}
              className="transition-all duration-300 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="animate-sadPulse text-4xl">😢</span>
            <span className="mt-1 text-4xl font-bold tabular-nums text-rose-400">{secondsLeft}</span>
          </div>
        </div>

        <h2 className="mt-6 text-2xl font-bold text-rose-400">¡Respuesta incorrecta!</h2>
        <p className="mt-1 text-slate-400">{phrase}</p>
        <p className="mt-4 text-sm text-slate-500">
          Esperá la cuenta regresiva para volver a intentar ⏳
        </p>
      </div>
    </div>
  );
}
