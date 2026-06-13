import type { Team, Challenge } from "@/lib/types";

// ════════════════════════════════════════════════════════════
// 🗺️ ACÁ SE ARMA TODO EL JUEGO
//
// Este es el ÚNICO archivo que necesitás tocar para:
//   • cambiar los códigos de los equipos
//   • editar/agregar/sacar preguntas y retos
//   • escribir las pistas reales y sus códigos escondidos
//
// Todo lo marcado con ✏️ es para que lo edites antes del juego.
// ════════════════════════════════════════════════════════════

// ------------------------------------------------------------
// ⚙️ CONFIGURACIÓN GENERAL
// ------------------------------------------------------------
export const CONFIG = {
  /** Segundos de bloqueo cuando responden mal un desafío. */
  PENALTY_SECONDS: 30,
  /** Intentos de código (pistas / reto foto) antes de aplicar la penalización. */
  MAX_CODE_ATTEMPTS: 5,
  /** ✏️ Código de líder: tocando el ⚙️ de arriba a la derecha + este código se puede resetear un celular. */
  ADMIN_CODE: "CONQUIS2026",
};

// Frases que aparecen al azar cuando responden bien. ¡Agregá las que quieras!
export const CELEBRATION_PHRASES = [
  "¡EXCELENTE!",
  "¡LO LOGRARON!",
  "¡SON UNOS GENIOS!",
  "¡INCREÍBLES!",
  "¡QUÉ CRACKS!",
  "¡IMPARABLES!",
  "¡BRILLANTE!",
  "¡A TODO VAPOR!",
];

export const CELEBRATION_EMOJIS = ["🎉", "🔥", "🤩", "🚀", "⭐", "💪", "🏆", "⚡"];

// ------------------------------------------------------------
// 🧩 DESAFÍOS COMPARTIDOS (los usan los dos equipos)
// ------------------------------------------------------------

/** Los 12 discípulos escondidos entre 50 nombres bíblicos. */
const DESAFIO_DISCIPULOS: Challenge = {
  type: "find-all",
  emoji: "🔍",
  title: "Encontrá a los 12 discípulos de Jesús",
  subtitle: "Tocá los 12 nombres correctos y después validá. ¡Ojo, hay nombres muy parecidos! 👀",
  targets: [
    "Pedro",
    "Andrés",
    "Jacobo (hijo de Zebedeo)",
    "Juan",
    "Felipe",
    "Bartolomé",
    "Tomás",
    "Mateo",
    "Jacobo (hijo de Alfeo)",
    "Tadeo",
    "Simón el Zelote",
    "Judas Iscariote",
  ],
  decoys: [
    "Pablo",
    "Marcos",
    "Lucas",
    "Matías",
    "Juan el Bautista",
    "Bernabé",
    "Esteban",
    "Timoteo",
    "Tito",
    "Silas",
    "Lázaro",
    "Nicodemo",
    "Zaqueo",
    "José de Arimatea",
    "Moisés",
    "Aarón",
    "Josué",
    "Caleb",
    "David",
    "Salomón",
    "Elías",
    "Eliseo",
    "Daniel",
    "Jonás",
    "Isaías",
    "Jeremías",
    "Ezequiel",
    "Noé",
    "Abraham",
    "Isaac",
    "Jacob",
    "José",
    "Samuel",
    "Saúl",
    "Gedeón",
    "Sansón",
    "Nehemías",
    "Esdras",
  ],
};

/** Pregunta textual del gato de Andy. */
const DESAFIO_GATO_ANDY: Challenge = {
  type: "text-answer",
  emoji: "🐱",
  question: "¿Cómo se llama el gato de Andy?",
  // ✏️ Se aceptan estas respuestas (sin importar mayúsculas ni tildes).
  answers: ["pikachu"],
  placeholder: "Escribí el nombre…",
};

/** Reto fotográfico de las plagas. El código se lo da Andy en persona. */
function desafioPlagas(code: string): Challenge {
  return {
    type: "photo-challenge",
    emoji: "📸",
    title: "Reto fotográfico: las plagas de Egipto",
    instructions:
      "Con el celular del equipo, saquen fotos de cosas que representen AL MENOS 5 plagas de Egipto. ¡Sean creativos! 🐸💧🦗\n\nCuando tengan las fotos, vayan a mostrárselas a Andy. Si el reto está bien hecho, ella les va a dar el código secreto para continuar.",
    code, // ✏️ el código que Andy les dice cuando aprueban el reto
  };
}

/** Pregunta sobre el sermón del día. */
const DESAFIO_SERMON: Challenge = {
  type: "multiple-choice",
  emoji: "📖",
  question: "¿De qué personaje trató el sermón de hoy?",
  options: ["La reina Ester", "La sierva de Naamán", "La viuda de Sarepta", "María Magdalena"],
  correct: 1, // ✏️ índice de la respuesta correcta (arranca en 0)
};

// La Ley del Conquistador, en el orden correcto.
const LEY_CONQUISTADOR = [
  "Observar la devoción matutina",
  "Cumplir fielmente la parte que me corresponde",
  "Cuidar mi cuerpo",
  "Tener una mirada franca",
  "Ser cortés y obediente",
  "Andar con reverencia en la casa de Dios",
  "Conservar una canción en el corazón",
  "Trabajar para Dios",
];

// Los días de la creación, en el orden correcto.
const DIAS_CREACION = [
  "La luz",
  "El firmamento (el cielo)",
  "Tierra, mares y plantas",
  "Sol, luna y estrellas",
  "Peces y aves",
  "Animales terrestres y el ser humano",
  "El reposo: Dios creó el sábado",
];

// ════════════════════════════════════════════════════════════
// 🦅🦁 LOS DOS EQUIPOS
//
// Cada equipo tiene:
//   accessCode → el código que escriben en la bienvenida
//   steps      → la secuencia de pasos del juego
//
// Cada paso (step) tiene:
//   challenge → el desafío a superar
//   clue      → la pista de DÓNDE está escondido el papel con
//               el código que desbloquea el siguiente desafío.
//               En el ÚLTIMO paso, la pista lleva al TESORO y
//               su código es el que está pegado al cofre.
//
// ✏️ TODAS las pistas de acá abajo son de EJEMPLO: cambialas
//    por las ubicaciones reales y elegí tus propios códigos.
// ════════════════════════════════════════════════════════════

export const TEAMS: Team[] = [
  // ──────────────────────────────────────────────
  // EQUIPO 1: ÁGUILAS 🦅
  // ──────────────────────────────────────────────
  {
    id: "aguilas",
    name: "ÁGUILAS",
    emoji: "🦅",
    accessCode: "AGUILAS", // ✏️ código de acceso del equipo 1
    gradient: "from-sky-400 to-indigo-500",
    steps: [
      {
        id: "a1",
        challenge: {
          type: "multiple-choice",
          emoji: "🌍",
          question: "¿En qué año fue oficializado a nivel mundial el Club de Conquistadores?",
          options: ["1907", "1946", "1950", "1962"],
          correct: 2,
        },
        clue: {
          // ✏️ EDITAR: pista real del equipo Águilas n.º 1
          text: "Donde las voces se juntan para alabar, debajo del asiento más cercano al instrumento musical, algo vas a encontrar… 🎹",
          code: "JORDAN", // ✏️ código escrito en el papel escondido
        },
      },
      {
        id: "a2",
        challenge: {
          type: "word-order",
          emoji: "🧩",
          title: "Armá la frase del Voto",
          subtitle: "Tocá las palabras en el orden correcto.",
          phrase: "Seré siervo de Dios y amigo de la humanidad",
        },
        clue: {
          // ✏️ EDITAR
          text: "El agua que refresca a los sedientos guarda un secreto en su parte de atrás… 🚰",
          code: "SINAI",
        },
      },
      {
        id: "a3",
        challenge: DESAFIO_DISCIPULOS,
        clue: {
          // ✏️ EDITAR
          text: "Entre las páginas donde se anotan los que llegan, hay un papel que no es de la lista… 📋",
          code: "EDEN",
        },
      },
      {
        id: "a4",
        challenge: {
          type: "multiple-choice",
          emoji: "🪢",
          question: "¿Qué especialidad de Conquistadores representa este emoji?",
          // 💡 Si querés usar una imagen real en vez del emoji, poné el archivo
          // en /public (ej: public/especialidades/nudos.png) y agregá:
          // image: "/especialidades/nudos.png",
          options: ["Nudos", "Arte de acampar", "Aves", "Natación"],
          correct: 0,
        },
        clue: {
          // ✏️ EDITAR
          text: "Donde los más chicos juegan y se ríen, mirá bien abajo del tobogán… 🛝",
          code: "BETEL",
        },
      },
      {
        id: "a5",
        challenge: DESAFIO_GATO_ANDY,
        clue: {
          // ✏️ EDITAR
          text: "El árbol más grande del patio guarda algo entre sus raíces… 🌳",
          code: "CANAAN",
        },
      },
      {
        id: "a6",
        challenge: {
          type: "order-list",
          emoji: "🌅",
          title: "Ordená los días de la creación",
          subtitle: "Del día 1 al día 7. Tocá cada uno en orden.",
          items: DIAS_CREACION,
        },
        clue: {
          // ✏️ EDITAR
          text: "Donde se guardan las sillas que descansan, una está marcada con una cinta… 🪑",
          code: "MORIAH",
        },
      },
      {
        id: "a7",
        challenge: desafioPlagas("MOISES"), // ✏️ código que Andy le da al equipo Águilas
        clue: {
          // ✏️ EDITAR
          text: "En la puerta por donde nadie entra, pero todos miran, hay algo pegado bien abajo… 🚪",
          code: "GALAAD",
        },
      },
      {
        id: "a9",
        challenge: {
          type: "word-order",
          emoji: "🎯",
          title: "Armá el Blanco del Conquistador",
          subtitle: "Tocá las palabras en orden.",
          phrase: "El mensaje del advenimiento a todo el mundo en mi generación",
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAA9" },
      },
      {
        id: "a10",
        challenge: {
          type: "order-list",
          emoji: "🏕️",
          title: "Ordená las clases progresivas",
          subtitle: "De la primera a la última.",
          items: ["Amigo", "Compañero", "Explorador", "Orientador", "Viajero", "Guía"],
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAA10" },
      },
      {
        id: "a11",
        challenge: {
          type: "find-all",
          emoji: "🍇",
          title: "Encontrá los frutos del Espíritu",
          subtitle: "Tocá los 9 frutos del Espíritu y validá. ¡Ojo con los intrusos!",
          targets: ["Amor", "Gozo", "Paz", "Paciencia", "Benignidad", "Bondad", "Fe", "Mansedumbre", "Templanza"],
          decoys: ["Ira", "Envidia", "Orgullo", "Egoísmo", "Pereza", "Mentira", "Codicia", "Rencor", "Miedo", "Venganza", "Soberbia"],
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAA11" },
      },
      {
        id: "a12",
        challenge: {
          type: "photo-challenge",
          emoji: "🪢",
          title: "Reto: ¡el nudo!",
          instructions:
            "Con una cuerda o un cordón, hagan un NUDO LLANO (o el que indique el líder) y muéstrenselo en persona.\n\nSi está bien hecho, el líder les da el código para continuar.",
          code: "NUDOOKA", // ✏️ EDITAR: código que da el líder al aprobar el reto
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAA12" },
      },
      {
        id: "a13",
        challenge: {
          type: "photo-challenge",
          emoji: "🍇",
          title: "Reto: frutos en acción",
          instructions:
            "Con el celu del equipo, saquen fotos representando AL MENOS 3 frutos del Espíritu (por ejemplo, gozo = todos riendo; paz = abrazo; paciencia = haciendo una fila).\n\nMuéstrenle las fotos al líder para recibir el código.",
          code: "FRUTOSOKA", // ✏️ EDITAR: código que da el líder al aprobar el reto
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAA13" },
      },
      {
        id: "a14",
        challenge: {
          type: "multiple-choice",
          emoji: "📜",
          question: "¿Cuántos puntos tiene la Ley del Conquistador?",
          options: ["6", "7", "8", "10"],
          correct: 2,
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAA14" },
      },
      {
        id: "a15",
        challenge: {
          type: "multiple-choice",
          emoji: "🧭",
          question: "¿Qué especialidad enseña a usar la brújula y orientarse con un mapa?",
          options: ["Orientación", "Astronomía", "Arte de acampar", "Senderismo"],
          correct: 0,
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAA15" },
      },
      {
        id: "a16",
        challenge: {
          type: "multiple-choice",
          emoji: "🏕️",
          question: "¿Cuál de estas NO es una clase progresiva del Conquistador?",
          options: ["Amigo", "Compañero", "Capitán", "Explorador"],
          correct: 2,
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAA16" },
      },
      {
        id: "a17",
        challenge: {
          type: "word-order",
          emoji: "🕯️",
          title: "Armá el Salmo 119:105",
          subtitle: "Tocá las palabras en orden.",
          phrase: "Lámpara es a mis pies tu palabra y lumbrera a mi camino",
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAA17" },
      },
      {
        id: "a18",
        challenge: {
          type: "multiple-choice",
          emoji: "⛑️",
          question: "Ante una herida que sangra, ¿qué es lo primero que hay que hacer?",
          options: ["Soplar la herida para que no arda", "Presionar la zona con un paño limpio", "Mojarla con agua bien fría", "Frotarla con tierra"],
          correct: 1,
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAA18" },
      },
      {
        id: "a8",
        challenge: DESAFIO_SERMON,
        clue: {
          // ✏️ EDITAR: ¡la pista FINAL! Lleva directo al tesoro.
          text: "🏆 ¡ÚLTIMA PISTA! El tesoro los espera donde todo comenzó esta tarde… Cuando lo encuentren, ingresen el código que está pegado al cofre.",
          code: "GLORIA", // ✏️ código pegado al tesoro del equipo Águilas
        },
      },
    ],
  },

  // ──────────────────────────────────────────────
  // EQUIPO 2: LEONES 🦁
  // ──────────────────────────────────────────────
  {
    id: "leones",
    name: "LEONES",
    emoji: "🦁",
    accessCode: "LEONES", // ✏️ código de acceso del equipo 2
    gradient: "from-amber-400 to-orange-500",
    steps: [
      {
        id: "l1",
        challenge: {
          type: "multiple-choice",
          emoji: "🎵",
          question: "¿Quién creó el himno de los Conquistadores?",
          options: ["John Hancock", "Arthur Spalding", "Lawrence Skinner", "Henry Berg"],
          correct: 3,
        },
        clue: {
          // ✏️ EDITAR: pista real del equipo Leones n.º 1
          text: "Donde se anuncia lo que viene y lo que pasó, detrás del papel más nuevo hay otro papel… 📌",
          code: "NILO",
        },
      },
      {
        id: "l2",
        challenge: {
          type: "order-list",
          emoji: "📜",
          title: "Ordená la Ley del Conquistador",
          subtitle: "Tocá cada punto en el orden correcto.",
          items: LEY_CONQUISTADOR,
        },
        clue: {
          // ✏️ EDITAR
          text: "El que cuida la entrada todos los sábados tiene algo escondido cerca de sus pies… 🚪",
          code: "JERICO",
        },
      },
      {
        id: "l3",
        challenge: DESAFIO_DISCIPULOS,
        clue: {
          // ✏️ EDITAR
          text: "Entre los libros que cantan, uno tiene un marcador que no debería estar ahí… 📕",
          code: "SILO",
        },
      },
      {
        id: "l4",
        challenge: {
          type: "multiple-choice",
          emoji: "⛑️",
          question: "¿Qué especialidad de Conquistadores representa este emoji?",
          options: ["Salud y resfríos", "Primeros auxilios", "Seguridad vial", "Rescate acuático"],
          correct: 1,
        },
        clue: {
          // ✏️ EDITAR
          text: "Bajo el cielo abierto, donde los autos descansan, busquen junto a la rueda del rincón… 🚗",
          code: "HEBRON",
        },
      },
      {
        id: "l5",
        challenge: DESAFIO_GATO_ANDY,
        clue: {
          // ✏️ EDITAR
          text: "La ventana que mira al patio guarda un secreto en su marco… 🪟",
          code: "CARMELO",
        },
      },
      {
        id: "l6",
        challenge: {
          type: "word-order",
          emoji: "🧩",
          title: "Armá la frase del Voto",
          subtitle: "Tocá las palabras en el orden correcto.",
          phrase: "Por la gracia de Dios seré puro bondadoso y leal",
        },
        clue: {
          // ✏️ EDITAR
          text: "Donde se prepara el alimento que compartimos, abajo de la mesada hay algo pegado… 🍽️",
          code: "BETANIA",
        },
      },
      {
        id: "l7",
        challenge: desafioPlagas("EGIPTO"), // ✏️ código que Andy le da al equipo Leones
        clue: {
          // ✏️ EDITAR
          text: "El banco más viejo de todos esconde algo donde apoyás los pies… 🪵",
          code: "GOSEN",
        },
      },
      {
        id: "l9",
        challenge: {
          type: "word-order",
          emoji: "🎯",
          title: "Armá el Blanco del Conquistador",
          subtitle: "Tocá las palabras en orden.",
          phrase: "El mensaje del advenimiento a todo el mundo en mi generación",
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAL9" },
      },
      {
        id: "l10",
        challenge: {
          type: "order-list",
          emoji: "🏕️",
          title: "Ordená las clases progresivas",
          subtitle: "De la primera a la última.",
          items: ["Amigo", "Compañero", "Explorador", "Orientador", "Viajero", "Guía"],
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAL10" },
      },
      {
        id: "l11",
        challenge: {
          type: "find-all",
          emoji: "🍇",
          title: "Encontrá los frutos del Espíritu",
          subtitle: "Tocá los 9 frutos del Espíritu y validá. ¡Ojo con los intrusos!",
          targets: ["Amor", "Gozo", "Paz", "Paciencia", "Benignidad", "Bondad", "Fe", "Mansedumbre", "Templanza"],
          decoys: ["Ira", "Envidia", "Orgullo", "Egoísmo", "Pereza", "Mentira", "Codicia", "Rencor", "Miedo", "Venganza", "Soberbia"],
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAL11" },
      },
      {
        id: "l12",
        challenge: {
          type: "photo-challenge",
          emoji: "🪢",
          title: "Reto: ¡el nudo!",
          instructions:
            "Con una cuerda o un cordón, hagan un NUDO LLANO (o el que indique el líder) y muéstrenselo en persona.\n\nSi está bien hecho, el líder les da el código para continuar.",
          code: "NUDOOKL", // ✏️ EDITAR: código que da el líder al aprobar el reto
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAL12" },
      },
      {
        id: "l13",
        challenge: {
          type: "photo-challenge",
          emoji: "🍇",
          title: "Reto: frutos en acción",
          instructions:
            "Con el celu del equipo, saquen fotos representando AL MENOS 3 frutos del Espíritu (por ejemplo, gozo = todos riendo; paz = abrazo; paciencia = haciendo una fila).\n\nMuéstrenle las fotos al líder para recibir el código.",
          code: "FRUTOSOKL", // ✏️ EDITAR: código que da el líder al aprobar el reto
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAL13" },
      },
      {
        id: "l14",
        challenge: {
          type: "multiple-choice",
          emoji: "📜",
          question: "¿Cuántos puntos tiene la Ley del Conquistador?",
          options: ["6", "7", "8", "10"],
          correct: 2,
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAL14" },
      },
      {
        id: "l15",
        challenge: {
          type: "multiple-choice",
          emoji: "🧭",
          question: "¿Qué especialidad enseña a usar la brújula y orientarse con un mapa?",
          options: ["Orientación", "Astronomía", "Arte de acampar", "Senderismo"],
          correct: 0,
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAL15" },
      },
      {
        id: "l16",
        challenge: {
          type: "multiple-choice",
          emoji: "🏕️",
          question: "¿Cuál de estas NO es una clase progresiva del Conquistador?",
          options: ["Amigo", "Compañero", "Capitán", "Explorador"],
          correct: 2,
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAL16" },
      },
      {
        id: "l17",
        challenge: {
          type: "word-order",
          emoji: "🕯️",
          title: "Armá el Salmo 119:105",
          subtitle: "Tocá las palabras en orden.",
          phrase: "Lámpara es a mis pies tu palabra y lumbrera a mi camino",
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAL17" },
      },
      {
        id: "l18",
        challenge: {
          type: "multiple-choice",
          emoji: "⛑️",
          question: "Ante una herida que sangra, ¿qué es lo primero que hay que hacer?",
          options: ["Soplar la herida para que no arda", "Presionar la zona con un paño limpio", "Mojarla con agua bien fría", "Frotarla con tierra"],
          correct: 1,
        },
        clue: { text: "✏️ EDITAR: pista hacia el código escondido…", code: "PISTAL18" },
      },
      {
        id: "l8",
        challenge: DESAFIO_SERMON,
        clue: {
          // ✏️ EDITAR: ¡la pista FINAL! Lleva directo al tesoro.
          text: "🏆 ¡ÚLTIMA PISTA! El tesoro los espera donde nace la sombra más grande del patio… Cuando lo encuentren, ingresen el código que está pegado al cofre.",
          code: "VICTORIA", // ✏️ código pegado al tesoro del equipo Leones
        },
      },
    ],
  },
];
