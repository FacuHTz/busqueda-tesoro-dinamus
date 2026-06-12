// ============================================================
// 🧩 TIPOS DEL JUEGO
// Acá están definidas las "formas" que pueden tener los
// desafíos. Si querés agregar preguntas nuevas en
// data/games.ts, usá estos tipos como referencia.
// ============================================================

/** Pregunta de múltiple opción. `correct` es el ÍNDICE (arranca en 0) de la opción correcta. */
export type MultipleChoiceData = {
  type: "multiple-choice";
  question: string;
  emoji?: string; // emoji grande arriba de la pregunta (opcional)
  image?: string; // ruta a una imagen en /public, ej: "/especialidades/nudos.png" (opcional)
  options: string[];
  correct: number;
};

/** Respuesta escrita textual. Se compara sin mayúsculas, tildes ni espacios extra. */
export type TextAnswerData = {
  type: "text-answer";
  question: string;
  emoji?: string;
  image?: string;
  answers: string[]; // se acepta cualquiera de estas respuestas
  placeholder?: string;
};

/** Frase desordenada: tocan las palabras para armarla en orden. */
export type WordOrderData = {
  type: "word-order";
  title: string;
  subtitle?: string;
  emoji?: string;
  phrase: string; // la frase CORRECTA, las palabras se mezclan solas
};

/** Ordenar una lista: los ítems van acá en el ORDEN CORRECTO, se mezclan solos. */
export type OrderListData = {
  type: "order-list";
  title: string;
  subtitle?: string;
  emoji?: string;
  items: string[];
};

/** Encontrar todos: seleccionar los `targets` entre un mar de `decoys`. */
export type FindAllData = {
  type: "find-all";
  title: string;
  subtitle?: string;
  emoji?: string;
  targets: string[]; // los correctos
  decoys: string[]; // los señuelos
};

/** Reto fotográfico: cumplen el reto fuera de la app y el líder les da el código. */
export type PhotoChallengeData = {
  type: "photo-challenge";
  title: string;
  emoji?: string;
  instructions: string;
  code: string; // el código que entrega el líder cuando aprueban el reto
};

export type Challenge =
  | MultipleChoiceData
  | TextAnswerData
  | WordOrderData
  | OrderListData
  | FindAllData
  | PhotoChallengeData;

/** Pista de ubicación + código escondido en el papel. */
export type Clue = {
  text: string;
  code: string;
};

/** Un paso del juego = un desafío + (opcional) la pista hacia el próximo código. */
export type Step = {
  id: string;
  challenge: Challenge;
  /** Si es el último paso y tiene pista, el código de esa pista es el del TESORO. */
  clue?: Clue;
};

export type Team = {
  id: string;
  name: string;
  emoji: string;
  accessCode: string; // el código que escriben en la pantalla de bienvenida
  gradient: string; // clases tailwind para el color del equipo
  steps: Step[];
};

export type Phase = "challenge" | "clue";

/** Lo que se guarda en el localStorage del celular. */
export type Progress = {
  teamId: string;
  stepIndex: number;
  phase: Phase;
  startedAt: number;
  penaltyUntil: number; // timestamp hasta el que están bloqueados (0 = sin penalización)
  finishedAt: number | null;
};
