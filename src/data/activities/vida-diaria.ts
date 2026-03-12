import { Activity } from "@/types";

export const vidaDiariaActivities: Activity[] = [
  {
    id: "vida-1",
    title: "Secuencia - Vestirse",
    description: "Ordena los pasos para vestirse",
    category: "vida-diaria",
    difficulty: "easy",
    type: "order-objects",
    data: {
      prompt: "Ordena los pasos para vestirse (usa las flechas)",
      rounds: [
        {
          items: ["👕 Ponerse ropa", "🪞 Mirarse", "🧦 Ponerse medias", "👖 Ponerse pantalón"],
          correctOrder: ["👕 Ponerse ropa", "👖 Ponerse pantalón", "🧦 Ponerse medias", "🪞 Mirarse"],
        },
      ],
    },
  },
  {
    id: "vida-2",
    title: "Secuencia - Preparar desayuno",
    description: "Ordena los pasos del desayuno",
    category: "vida-diaria",
    difficulty: "easy",
    type: "order-objects",
    data: {
      prompt: "Ordena los pasos del desayuno (usa las flechas)",
      rounds: [
        {
          items: ["🍞 Tomar pan", "🍳 Preparar", "🍽️ Servir", "😋 Comer"],
          correctOrder: ["🍞 Tomar pan", "🍳 Preparar", "🍽️ Servir", "😋 Comer"],
        },
      ],
    },
  },
  {
    id: "vida-3",
    title: "Historia - El día del niño",
    description: "Ordena la historia en viñetas",
    category: "vida-diaria",
    difficulty: "easy",
    type: "story-sequence",
    data: {
      panels: ["😴 Se despierta", "🪥 Se lava", "🍳 Desayuna", "🎒 Va al colegio"],
    },
  },
  {
    id: "vida-4",
    title: "Historia - La mariposa",
    description: "Ordena la historia de la mariposa",
    category: "vida-diaria",
    difficulty: "easy",
    type: "story-sequence",
    data: {
      panels: ["🥚 Huevo", "🐛 Oruga", "🦋 Capullo", "🦋 Mariposa"],
    },
  },
  {
    id: "vida-5",
    title: "¿Qué uso para...?",
    description: "Relaciona objeto con su uso",
    category: "vida-diaria",
    difficulty: "easy",
    type: "association-game",
    data: {
      rounds: [
        {
          groups: [
            { items: ["✏️", "📕", "📐"], name: "escribir y estudiar" },
            { items: ["🍳", "🥄", "🍽️"], name: "cocinar" },
          ],
        },
        {
          groups: [
            { items: ["🚿", "🪥", "🧴"], name: "bañarse" },
            { items: ["🛋️", "📺", "💡"], name: "estar en casa" },
          ],
        },
      ],
    },
  },
  {
    id: "vida-6",
    title: "Causa y efecto - ¿Qué pasó?",
    description: "Elige lo que pasaría después",
    category: "vida-diaria",
    difficulty: "medium",
    type: "choose-option",
    data: {
      rounds: [
        { question: "Si tocas el fuego...", emoji: "🔥👋", options: ["te quemas", "te refrescas"], correct: "te quemas" },
        { question: "Si llueve y sales sin paraguas...", emoji: "🌧️", options: ["te mojas", "te secas"], correct: "te mojas" },
        { question: "Si tienes hambre y comes...", emoji: "🍽️", options: ["te llenas", "tienes más hambre"], correct: "te llenas" },
      ],
    },
  },
];
