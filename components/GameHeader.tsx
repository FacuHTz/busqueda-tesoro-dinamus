"use client";

import type { Team } from "@/lib/types";
import AdminMenu from "./AdminMenu";

type Props = {
  team: Team;
  stepIndex: number; // 0-based
  onReset: () => void;
};

export default function GameHeader({ team, stepIndex, onReset }: Props) {
  const total = team.steps.length;
  const current = Math.min(stepIndex + 1, total);
  const pct = Math.round((stepIndex / total) * 100);

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/80 px-4 pb-3 pt-4 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div
          className={`flex items-center gap-2 rounded-full bg-gradient-to-r ${team.gradient} px-3 py-1.5 shadow-lg`}
        >
          <span className="text-lg">{team.emoji}</span>
          <span className="text-sm font-bold tracking-wide text-white drop-shadow">{team.name}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold text-slate-400">
            Prueba {current}/{total}
          </span>
          <AdminMenu onReset={onReset} />
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mx-auto mt-2 h-2 max-w-md overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${team.gradient} transition-all duration-700 ease-out`}
          style={{ width: `${Math.max(pct, 4)}%` }}
        />
      </div>
    </header>
  );
}
