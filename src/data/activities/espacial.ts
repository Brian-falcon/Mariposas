import { Activity } from "@/types";

export const espacialActivities: Activity[] = [
  {
    id: "esp-1",
    title: "¿Dónde está? - Arriba y abajo",
    description: "¿Está arriba o abajo?",
    category: "espacial",
    difficulty: "easy",
    type: "choose-option",
    data: {
      rounds: [
        { question: "El sol está...", emoji: "☀️⬆️🌳", options: ["arriba", "abajo"], correct: "arriba" },
        { question: "Las raíces están...", emoji: "🌳⬇️🌱", options: ["arriba", "abajo"], correct: "abajo" },
        { question: "El avión vuela...", emoji: "✈️☁️", options: ["arriba", "abajo"], correct: "arriba" },
        { question: "El pez está...", emoji: "🐟🌊", options: ["arriba", "abajo"], correct: "abajo" },
      ],
    },
  },
  {
    id: "esp-2",
    title: "Dentro y fuera",
    description: "¿Está dentro o fuera?",
    category: "espacial",
    difficulty: "easy",
    type: "choose-option",
    data: {
      rounds: [
        { question: "El juguete está... de la caja", emoji: "📦🎲", options: ["dentro", "fuera"], correct: "dentro" },
        { question: "El pájaro está... de la jaula", emoji: "🐦🪺", options: ["dentro", "fuera"], correct: "fuera" },
        { question: "El lápiz está... del estuche", emoji: "✏️👜", options: ["dentro", "fuera"], correct: "dentro" },
        { question: "El perro está... de la casa", emoji: "🐕🏠", options: ["dentro", "fuera"], correct: "fuera" },
      ],
    },
  },
  {
    id: "esp-3",
    title: "Ordenar por tamaño - Pequeño a grande",
    description: "Ordena de pequeño a grande",
    category: "espacial",
    difficulty: "easy",
    type: "order-objects",
    data: {
      prompt: "Ordena de pequeño a grande (usa las flechas)",
      rounds: [
        {
          items: ["🐘", "🐶", "🐜"],
          correctOrder: ["🐜", "🐶", "🐘"],
        },
        {
          items: ["🌳", "🌱", "🪴"],
          correctOrder: ["🌱", "🪴", "🌳"],
        },
      ],
    },
  },
  {
    id: "esp-4",
    title: "Izquierda y derecha",
    description: "¿Cuál está a la izquierda? ¿Cuál a la derecha?",
    category: "espacial",
    difficulty: "medium",
    type: "choose-option",
    data: {
      rounds: [
        { question: "La manzana está a la...", emoji: "🍎 | 🍊", options: ["izquierda", "derecha"], correct: "izquierda" },
        { question: "La naranja está a la...", emoji: "🍎 | 🍊", options: ["izquierda", "derecha"], correct: "derecha" },
      ],
    },
  },
  {
    id: "esp-5",
    title: "Grande y pequeño",
    description: "Agrupa lo grande y lo pequeño",
    category: "espacial",
    difficulty: "easy",
    type: "association-game",
    data: {
      rounds: [
        {
          groups: [
            { items: ["🐘", "🏠", "🌳"], name: "grande" },
            { items: ["🐜", "🔑", "🌸"], name: "pequeño" },
          ],
        },
      ],
    },
  },
];
