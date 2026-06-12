# 🗺️ Búsqueda del Tesoro — Club de Conquistadores

App de búsqueda del tesoro para dos equipos, pensada para celulares. **100% estática** (sin base de datos): todo el progreso se guarda en el `localStorage` de cada celular, y se puede **instalar como app** desde Chrome ("Agregar a pantalla principal").

---

## 🚀 Cómo subirla a GitHub y abrirla en v0.app

1. Creá un repositorio nuevo en GitHub (ej: `busqueda-tesoro-conquis`).
2. Subí **el contenido de esta carpeta directamente en la raíz del repo** (que `package.json` quede en la raíz, no adentro de una subcarpeta).
   - Desde la web de GitHub: *Add file → Upload files* y arrastrá todo.
   - O por consola:
     ```bash
     cd busqueda-tesoro-conquis
     git init
     git add .
     git commit -m "Búsqueda del tesoro Conquis 🗺️"
     git branch -M main
     git remote add origin https://github.com/TU_USUARIO/busqueda-tesoro-conquis.git
     git push -u origin main
     ```
3. En **v0.app**: importá el repo de GitHub. Desde ahí podés pedirle modificaciones y hacer el **deploy a Vercel** con un click.

## 💻 Correrla en tu compu (opcional)

```bash
npm install
npm run dev   # http://localhost:3000
```

---

## ✏️ TODO LO EDITABLE ESTÁ EN UN SOLO ARCHIVO: `data/games.ts`

Ahí cambiás códigos, preguntas y pistas. Todo lo marcado con **✏️** es para editar antes del juego.

### Códigos actuales (¡cambialos!)

| Qué | Código |
|---|---|
| Acceso equipo Águilas 🦅 | `AGUILAS` |
| Acceso equipo Leones 🦁 | `LEONES` |
| Código de líder (⚙️ resetear un celular) | `CONQUIS2026` |
| Reto foto Águilas (lo da Andy) | `MOISES` |
| Reto foto Leones (lo da Andy) | `EGIPTO` |
| Códigos escondidos Águilas | `JORDAN, SINAI, EDEN, BETEL, CANAAN, MORIAH, GALAAD` y tesoro: `GLORIA` |
| Códigos escondidos Leones | `NILO, JERICO, SILO, HEBRON, CARMELO, BETANIA, GOSEN` y tesoro: `VICTORIA` |

> Los códigos no distinguen mayúsculas, tildes ni espacios.

### ⚠️ Las pistas son de EJEMPLO

Las pistas de ubicación (`clue.text`) son placeholders. Cuando tengas las ubicaciones reales de los papeles, reemplazá el texto y elegí tus códigos. El **último paso** de cada equipo no tiene desafío nuevo después: su pista lleva al **tesoro físico**, y el código que está con el tesoro dispara la pantalla de victoria con el tiempo total del equipo.

### Tipos de desafío disponibles

```ts
// 🧠 Múltiple opción ("correct" es el índice, arranca en 0)
{ type: "multiple-choice", emoji: "🌍", question: "…", options: ["A", "B", "C"], correct: 2 }

// ✍️ Respuesta escrita exacta (acepta cualquiera de la lista)
{ type: "text-answer", emoji: "🐱", question: "…", answers: ["pikachu"] }

// 🧩 Frase desordenada (se mezcla sola)
{ type: "word-order", emoji: "🧩", title: "…", phrase: "Frase correcta acá" }

// 📋 Ordenar lista (ponela en el ORDEN CORRECTO, se mezcla sola)
{ type: "order-list", emoji: "🌅", title: "…", items: ["Primero", "Segundo", "Tercero"] }

// 🔍 Encontrar todos entre señuelos
{ type: "find-all", emoji: "🔍", title: "…", targets: ["correcto1"], decoys: ["señuelo1"] }

// 📸 Reto fotográfico (el líder entrega el código al aprobar)
{ type: "photo-challenge", emoji: "📸", title: "…", instructions: "…", code: "CODIGO" }
```

Para usar **imágenes** (ej: especialidades) en vez de emojis: guardá el archivo en `public/` (ej: `public/especialidades/nudos.png`) y agregá `image: "/especialidades/nudos.png"` al desafío.

### Configuración (`CONFIG` arriba de todo)

- `PENALTY_SECONDS`: segundos de bloqueo al responder mal (30).
- `MAX_CODE_ATTEMPTS`: intentos de código de pista antes de bloquear (5, anti fuerza bruta).
- `ADMIN_CODE`: código de líder para resetear un celular desde el ⚙️.

---

## 📱 Instalación en el celular (el día del juego)

1. Abrí la URL del deploy en **Chrome**.
2. Tocá el banner "Instalar app" o *menú ⋮ → Agregar a pantalla principal*.
3. ¡Listo! Se abre a pantalla completa como una app.

## ✅ Checklist del día del juego

- [ ] Reemplazaste **todas** las pistas ✏️ por las reales en `data/games.ts`.
- [ ] Cambiaste los códigos de acceso, de pistas y el de líder.
- [ ] Imprimiste/escondiste los papeles con los códigos en los lugares correctos.
- [ ] Andy sabe los códigos de los retos fotográficos.
- [ ] El tesoro físico tiene su código (`GLORIA` / `VICTORIA` o los tuyos).
- [ ] Probaste el recorrido completo con un celular de prueba y lo reseteaste con el ⚙️ + código de líder.

¡Que gane el mejor equipo! 🏆⛺
