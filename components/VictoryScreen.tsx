"use client";

import { useEffect, useState } from "react";
import type { Team } from "@/lib/types";
import { victoryRain } from "@/lib/confetti";
import { formatElapsed, vibrate } from "@/lib/utils";
import AdminMenu from "./AdminMenu";

type Props = {
  team: Team;
  startedAt: number;
  finishedAt: number;
  onReset: () => void;
};

export default function VictoryScreen({ team, startedAt, finishedAt, onReset }: Props) {
  const [elapsed] = useState(() => formatElapsed(finishedAt - startedAt));

  useEffect(() => {
    vibrate([80, 60, 80, 60, 200]);
    const stop = victoryRain();
    return stop;
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-10">
      <div className="absolute right-3 top-3">
        <AdminMenu onReset={onReset} />
      </div>

      <div className="w-full max-w-md animate-bounceIn text-center">
        <div className="text-8xl drop-shadow-[0_0_35px_rgba(251,191,36,0.6)]">🏆</div>

        <h1 className="mt-4 bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-5xl font-bold text-transparent">
          ¡ENCONTRARON EL TESORO!
        </h1>

        <div
          className={`mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${team.gradient} px-5 py-2 shadow-lg`}
        >
          <span className="text-2xl">{team.emoji}</span>
          <span className="text-lg font-bold text-white drop-shadow">EQUIPO {team.name}</span>
        </div>

        <div className="mt-7 rounded-3xl border border-amber-400/30 bg-slate-900/80 p-6 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            ⏱️ Tiempo total
          </p>
          <p className="mt-1 text-4xl font-bold tabular-nums text-amber-300">{elapsed}</p>
          <p className="mt-3 text-sm text-slate-400">
            ¡Compárenlo con el otro equipo a ver quién fue más rápido! 😎
          </p>
        </div>

        <p className="mt-8 text-lg font-medium text-slate-300">
          ¡Felicitaciones, Conquistadores! 🎉
        </p>
        <p className="mt-1 text-sm text-slate-500">
          “Buscad a Jehová y su poder; buscad siempre su rostro.” — Salmos 105:4
        </p>
      </div>
    </main>
  );
}
