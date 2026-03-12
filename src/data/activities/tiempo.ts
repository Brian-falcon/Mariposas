import { Activity } from "@/types";

export const tiempoActivities: Activity[] = [
  {
    id: "tiem-1",
    title: "Días de la semana",
    description: "Ordena los días de la semana",
    category: "tiempo",
    difficulty: "easy",
    type: "order-objects",
    data: {
      prompt: "Ordena los días de la semana (usa las flechas)",
      rounds: [
        {
          items: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
          correctOrder: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
        },
      ],
    },
  },
  {
    id: "tiem-2",
    title: "Secuencia del día - Mañana",
    description: "Ordena lo que hacemos por la mañana",
    category: "tiempo",
    difficulty: "easy",
    type: "order-objects",
    data: {
      prompt: "Ordena lo que hacemos por la mañana (usa las flechas)",
      rounds: [
        {
          items: ["🌅 Despertar", "🪥 Lavarse", "🍳 Desayunar", "🎒 Ir a la escuela"],
          correctOrder: ["🌅 Despertar", "🪥 Lavarse", "🍳 Desayunar", "🎒 Ir a la escuela"],
        },
      ],
    },
  },
  {
    id: "tiem-3",
    title: "Secuencia - Lavarse las manos",
    description: "Ordena los pasos para lavarse las manos",
    category: "tiempo",
    difficulty: "easy",
    type: "order-objects",
    data: {
      prompt: "Ordena los pasos para lavarse las manos (usa las flechas)",
      rounds: [
        {
          items: ["💧 Abrir agua", "🧼 Poner jabón", "✋ Frotar manos", "🧻 Secar"],
          correctOrder: ["💧 Abrir agua", "🧼 Poner jabón", "✋ Frotar manos", "🧻 Secar"],
        },
      ],
    },
  },
  {
    id: "tiem-4",
    title: "Día y noche",
    description: "Agrupa lo que va con el día y con la noche",
    category: "tiempo",
    difficulty: "easy",
    type: "association-game",
    data: {
      rounds: [
        {
          groups: [
            { items: ["☀️", "🐓", "🌸", "🌻"], name: "día" },
            { items: ["🌙", "🦉", "⭐", "💤"], name: "noche" },
          ],
        },
      ],
    },
  },
  {
    id: "tiem-5",
    title: "Ayer, hoy y mañana",
    description: "¿Qué día es cada uno?",
    category: "tiempo",
    difficulty: "medium",
    type: "choose-option",
    data: {
      rounds: [
        { question: "¿Qué hiciste ayer?", emoji: "📅", options: ["ayer", "hoy", "mañana"], correct: "ayer" },
        { question: "¿Qué día estamos ahora?", emoji: "📆", options: ["ayer", "hoy", "mañana"], correct: "hoy" },
        { question: "¿Qué pasará después?", emoji: "🔮", options: ["ayer", "hoy", "mañana"], correct: "mañana" },
      ],
    },
  },
  {
    id: "tiem-6",
    title: "Estaciones del año",
    description: "Agrupa según la estación",
    category: "tiempo",
    difficulty: "easy",
    type: "association-game",
    data: {
      rounds: [
        {
          groups: [
            { items: ["☀️", "🏖️", "🌻", "🍉"], name: "verano" },
            { items: ["🍂", "🍎", "🧥", "🌧️"], name: "otoño" },
          ],
        },
        {
          groups: [
            { items: ["❄️", "🧤", "☃️", "🔥"], name: "invierno" },
            { items: ["🌸", "🐣", "🌷", "🌱"], name: "primavera" },
          ],
        },
      ],
    },
  },
];
