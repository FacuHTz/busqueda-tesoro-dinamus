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
          text: "Me cortan en el bosque y me apilan con cuidado, cuando llega el frío soy el más buscado.",
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
          text: "Tengo jugadores pero ninguno suda, girás una manija y el partido no se muda.",
          code: "SINAI",
        },
      },
      {
        id: "a3",
        challenge: DESAFIO_DISCIPULOS,
        clue: {
          // ✏️ EDITAR
          text: "Soy blanca, grande y práctica, llevo gente o mercadería, francesa de nacimiento pero acá me la banco todo el día.",
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
          text: "Soy chica y discreta, pero cargo un peso grande, sostengo el fresquito del verano para que nadie se mande.",
          code: "BETEL",
        },
      },
      {
        id: "a5",
        challenge: DESAFIO_GATO_ANDY,
        clue: {
          text: "Soy fuerte, soy derecha, y aunque no me muevo nada, sostengo el techo entero sin pedir ninguna palmada.",
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
          text: "Buscá a Facu o a Nico y mostrales las fotos del reto para recibir el código.",
          code: "MORIAH",
        },
      },
      {
        id: "a7",
        challenge: desafioPlagas("MOISES"), // ✏️ código que Andy le da al equipo Águilas
        clue: {
          text: "Soy un cartel que anuncia... ¿un canal? ¿una era? Algo nuevo, algo de tiempo..",
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
        clue: { text: "Me trepo por el tejido que divide los patios, no soy una pared pero igual pongo a todos en espacios.", code: "JERICÓ" },
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
        clue: { text: "Me mirás cuando te aburrís, estoy sobre tu cabeza, no digo nada pero cubro todo con firmeza.", code: "SION" },
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
        clue: { text: "Buscá a Facu o a Nico y mostrales las fotos del reto para recibir el código.", code: "CARMELO" },
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
        clue: { text: "Buscá a Facu o a Nico y mostrales las fotos del reto para recibir el código.", code: "HEBRON" },
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
        clue: { text: "Hago frío todo el día y zumbo sin parar, abrime si tenés hambre, que algo te voy a dar.", code: "ARARAT" },
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
        clue: { text: "Todos se sientan en mí pero nadie me lo agradece, cada sábado me llenan y al rato me vacían por toda la semana :(", code: "JERUSALEN" },
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
        clue: { text: "Me colgaron entre dos puntos y me dejaron balancear, si te sentás y te empujás, te olvidás de todo el azar.", code: "SIQUEM" },
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
        clue: { text: "Soy un cuartito reservado, donde van cables, herramientas y cosas, no es glamorosa mi función pero soy de las valiosas.", code: "GALILEA" },

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
        clue: { text: "Soy enorme y de ladrillo, no tengo revoque ni pintura, si me mirás de cerca ves mi verdadera textura.", code: "HERMON" },
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
        clue: { text: "Ya estamos cerca de la final! para este momento tendrás que recordar de quien habló en su tema gonza anoche", code: "SAMUEL" },
      },
      {
        id: "a8",
        challenge: DESAFIO_SERMON,
        clue: {
          // ✏️ EDITAR: ¡la pista FINAL! Lleva directo al tesoro.
          text: "🏆 ¡ÚLTIMA PISTA! La llave del tesoro los espera en un objeto redondo, que pica, crea disputas y nos alegra las noches de after",
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
          text: "Parado y orgulloso, bien alto y sin mover, sostengo una bandera que ondea con el viento al anochecer.",
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
          text: "No soy un adorno cualquiera, me pusieron con razón: este lugar tiene historia, y yo soy su declaración.",
          code: "JERICO",
        },
      },
      {
        id: "l3",
        challenge: DESAFIO_DISCIPULOS,
        clue: {
          text: "Tengo seis cuerdas y espero que me toques con ganas, soy madera y música... y una compañera de las buenas.",
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
          text: "Somos tres y medio, damos sombra, y al fondo nos quedamos, con el viento hacemos música aunque no lo proclamamos.",
          code: "HEBRON",
        },
      },
      {
        id: "l5",
        challenge: DESAFIO_GATO_ANDY,
        clue: {
          text: "Soy un cuarto chico con puerta y cerrojo, solo para ellos... al menos eso dice el rótulo.",
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
          text: "Buscá a Facu o a Nico y mostrales las fotos del reto para recibir el código.",
          code: "BETANIA",
        },
      },
      {
        id: "l7",
        challenge: desafioPlagas("EGIPTO"), // ✏️ código que Andy le da al equipo Leones
        clue: {
          text: "Doy vueltas y vueltas, los chicos se ríen conmigo, soy la alegría del patio y de cada Sábado.",
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
        clue: { text: "Guardo agua fresquita pero no estoy en las alturas, sin una bomba de por medio no te llega a las cañerías.", code: "SION" },
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
        clue: { text: "Estoy clavada en madera y espero que me usen bien, soy la herramienta del leñador... ¿quién me encontrará también?", code: "NAZARET" },
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
        clue: { text: "Buscá a Facu o a Nico y mostrales las fotos del reto para recibir el código.", code: "BELEN" },
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
        clue: { text: "Buscá a Facu o a Nico y mostrales las fotos del reto para recibir el código.", code: "JUDEA" },
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
        clue: { text: "Soy un armario empotrado, guardián de latas y frascos, si tenés hambre a medianoche, en mí encontrás los abastos.", code: "EGIPTO" },
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
        clue: { text: "Soy el segundo corazón de Nico, lo llevo a todos lados y hasta a veces me pico.", code: "JORDAN" },
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
        clue: { text: "Soy un yuyo gigantón que al mate le da sabor, me encontrás en el predio y soy de lo mejor.", code: "SINAI" },
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
        clue: { text: "Tengo paños verdes pero no soy un jardín, con un taco y unas bolas se juega hasta el fin.", code: "TABOR" },
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
        clue: { text: "Te lo voy a contar porque ya soy difícil de buscar, en el aula de arriba al medio me vas a encontrar.", code: "JERUSALEN" },
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
        clue: { text: "Ya estamos cerca de la final! para este momento tendrás que recordar de quien habló en su tema gonza anoche", code: "SAMUEL" },
      },
      {
        id: "l8",
        challenge: DESAFIO_SERMON,
        clue: {
          // ✏️ EDITAR: ¡la pista FINAL! Lleva directo al tesoro.
          text: "🏆 ¡ÚLTIMA PISTA!  La llave del tesoro los espera en un objeto redondo, que pica, crea disputas y nos alegra las noches de after",
          code: "VICTORIA", // ✏️ código pegado al tesoro del equipo Leones
        },
      },
    ],
  },
];
