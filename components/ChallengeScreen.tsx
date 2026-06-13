"use client";

import type { Challenge } from "@/lib/types";
import MultipleChoice from "./challenges/MultipleChoice";
import TextAnswer from "./challenges/TextAnswer";
import WordOrder from "./challenges/WordOrder";
import OrderList from "./challenges/OrderList";
import FindAll from "./challenges/FindAll";
import PhotoChallenge from "./challenges/PhotoChallenge";

type Props = {
  challenge: Challenge;
  onCorrect: () => void;
  onWrong: () => void;
};

const BADGES: Record<Challenge["type"], string> = {
  "multiple-choice": "🧠 Pregunta",
  "text-answer": "✍️ Respuesta exacta",
  "word-order": "🧩 Frase desordenada",
  "order-list": "📋 Ordená",
  "find-all": "🔍 Encontralos a todos",
  "photo-challenge": "📸 Reto fotográfico",
};

/** Pantalla de desafío: elige el mini-juego según el tipo. */
export default function ChallengeScreen({ challenge, onCorrect, onWrong }: Props) {
  return (
    <div className="px-5 pb-28 pt-5">
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex justify-center">
          <span className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
            {BADGES[challenge.type]}
          </span>
        </div>

        {challenge.type === "multiple-choice" && (
          <MultipleChoice data={challenge} onCorrect={onCorrect} onWrong={onWrong} />
        )}
        {challenge.type === "text-answer" && (
          <TextAnswer data={challenge} onCorrect={onCorrect} onWrong={onWrong} />
        )}
        {challenge.type === "word-order" && (
          <WordOrder data={challenge} onCorrect={onCorrect} onWrong={onWrong} />
        )}
        {challenge.type === "order-list" && (
          <OrderList data={challenge} onCorrect={onCorrect} onWrong={onWrong} />
        )}
        {challenge.type === "find-all" && (
          <FindAll data={challenge} onCorrect={onCorrect} onWrong={onWrong} />
        )}
        {challenge.type === "photo-challenge" && (
          <PhotoChallenge data={challenge} onCorrect={onCorrect} onTooManyAttempts={onWrong} />
        )}
      </div>
    </div>
  );
}
