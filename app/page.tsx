"use client";

import { useCallback, useEffect, useState } from "react";
import type { Progress, Team } from "@/lib/types";
import { TEAMS, CONFIG } from "@/data/games";
import { loadProgress, saveProgress, clearProgress } from "@/lib/storage";
import { normalizeCode } from "@/lib/utils";

import WelcomeScreen from "@/components/WelcomeScreen";
import GameHeader from "@/components/GameHeader";
import ChallengeScreen from "@/components/ChallengeScreen";
import ClueScreen from "@/components/ClueScreen";
import PenaltyScreen from "@/components/PenaltyScreen";
import VictoryScreen from "@/components/VictoryScreen";
import InstallPrompt from "@/components/InstallPrompt";
import { CelebrationOverlay, TeamIntroOverlay, CodeOkToast } from "@/components/Overlays";

type Overlay = null | "celebrate" | "team-intro" | "code-ok";

export default function Page() {
  // Evita errores de hidratación: recién leemos localStorage al montar.
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [overlay, setOverlay] = useState<Overlay>(null);
  // Nonce para remontar el desafío después de una penalización
  // (así se limpia la selección anterior).
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    setProgress(loadProgress());
    setMounted(true);
  }, []);

  const team: Team | null = progress
    ? (TEAMS.find((t) => t.id === progress.teamId) ?? null)
    : null;

  const update = useCallback((p: Progress) => {
    setProgress(p);
    saveProgress(p);
  }, []);

  // ── Bienvenida: validar código del equipo ──────────────────
  const handleTeamCode = (code: string): boolean => {
    const found = TEAMS.find((t) => normalizeCode(t.accessCode) === normalizeCode(code));
    if (!found) return false;
    update({
      teamId: found.id,
      stepIndex: 0,
      phase: "challenge",
      startedAt: Date.now(),
      penaltyUntil: 0,
      finishedAt: null,
    });
    setOverlay("team-intro");
    return true;
  };

  // ── Desafío superado → festejo grande ─────────────────────
  const handleChallengeCorrect = () => setOverlay("celebrate");

  // ── Desafío fallado → penalización de 30s ─────────────────
  const handleChallengeWrong = () => {
    if (!progress) return;
    update({ ...progress, penaltyUntil: Date.now() + CONFIG.PENALTY_SECONDS * 1000 });
  };

  // ── Botón CONTINUAR del festejo → pasar a la pista ────────
  const handleCelebrationContinue = () => {
    setOverlay(null);
    if (!progress || !team) return;
    const step = team.steps[progress.stepIndex];
    if (step?.clue) {
      update({ ...progress, phase: "clue" });
    } else {
      // Paso sin pista: avanza directo (o termina si era el último).
      advanceAfterClue();
    }
  };

  // ── Código de pista correcto ──────────────────────────────
  const handleClueCode = () => setOverlay("code-ok");

  const advanceAfterClue = useCallback(() => {
    setProgress((prev) => {
      if (!prev) return prev;
      const t = TEAMS.find((x) => x.id === prev.teamId);
      if (!t) return prev;
      const isLast = prev.stepIndex >= t.steps.length - 1;
      const next: Progress = isLast
        ? { ...prev, finishedAt: Date.now() }
        : { ...prev, stepIndex: prev.stepIndex + 1, phase: "challenge" };
      saveProgress(next);
      return next;
    });
    setNonce((n) => n + 1);
  }, []);

  const handleCodeOkDone = () => {
    setOverlay(null);
    advanceAfterClue();
  };

  // ── Fin de la penalización ────────────────────────────────
  const handlePenaltyDone = () => {
    if (!progress) return;
    update({ ...progress, penaltyUntil: 0 });
    setNonce((n) => n + 1);
  };

  // ── Reset de líder ────────────────────────────────────────
  const handleReset = () => {
    clearProgress();
    setProgress(null);
    setOverlay(null);
    setNonce((n) => n + 1);
  };

  // ── Resolver el paso actual (líder) ───────────────────────
  // Salta la pantalla visible: si es un desafío pasa a la pista
  // (o avanza si no tiene), y si es una pista avanza al siguiente paso.
  const handleSolveCurrent = () => {
    setOverlay(null);
    if (!progress || !team) return;
    if (progress.phase === "challenge") {
      const step = team.steps[progress.stepIndex];
      if (step?.clue) {
        update({ ...progress, phase: "clue", penaltyUntil: 0 });
        setNonce((n) => n + 1);
      } else {
        advanceAfterClue();
      }
    } else {
      advanceAfterClue();
    }
  };

  // ──────────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <span className="animate-floaty text-5xl">🗺️</span>
      </main>
    );
  }

  // Sin progreso → pantalla de bienvenida
  if (!progress || !team) {
    return (
      <>
        <WelcomeScreen onSubmit={handleTeamCode} />
        <InstallPrompt />
        {/* El intro del equipo puede dispararse justo al validar */}
        {overlay === "team-intro" && progress && team && (
          <TeamIntroOverlay team={team} onDone={() => setOverlay(null)} />
        )}
      </>
    );
  }

  // 🏆 Juego terminado
  if (progress.finishedAt) {
    return (
      <VictoryScreen
        team={team}
        startedAt={progress.startedAt}
        finishedAt={progress.finishedAt}
        onReset={handleReset}
      />
    );
  }

  const step = team.steps[progress.stepIndex];
  const penalized = progress.penaltyUntil > Date.now();

  return (
    <>
      <GameHeader team={team} stepIndex={progress.stepIndex} onReset={handleReset} onSolveCurrent={handleSolveCurrent} />

      <main className="mx-auto min-h-screen max-w-md">
        {progress.phase === "challenge" ? (
          <ChallengeScreen
            key={`ch-${progress.stepIndex}-${nonce}`}
            challenge={step.challenge}
            onCorrect={handleChallengeCorrect}
            onWrong={handleChallengeWrong}
          />
        ) : step.clue ? (
          <ClueScreen
            key={`clue-${progress.stepIndex}-${nonce}`}
            clue={step.clue}
            clueNumber={progress.stepIndex + 1}
            isLast={progress.stepIndex === team.steps.length - 1}
            onCorrect={handleClueCode}
            onTooManyAttempts={handleChallengeWrong}
          />
        ) : null}
      </main>

      <InstallPrompt />

      {/* Overlays */}
      {penalized && <PenaltyScreen until={progress.penaltyUntil} onDone={handlePenaltyDone} />}
      {overlay === "team-intro" && <TeamIntroOverlay team={team} onDone={() => setOverlay(null)} />}
      {overlay === "celebrate" && <CelebrationOverlay onContinue={handleCelebrationContinue} />}
      {overlay === "code-ok" && <CodeOkToast onDone={handleCodeOkDone} />}
    </>
  );
}
