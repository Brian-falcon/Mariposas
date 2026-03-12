import { Activity } from "@/types";

export const emocionesActivities: Activity[] = [
  {
    id: "emo-1",
    title: "¿Cómo se siente? - Emociones básicas",
    description: "Identifica la emoción en cada cara",
    category: "emociones",
    difficulty: "easy",
    type: "identify-emotion",
    data: {
      rounds: [
        { emoji: "😊", options: ["feliz", "triste", "enojado"], correct: "feliz" },
        { emoji: "😢", options: ["feliz", "triste", "sorprendido"], correct: "triste" },
        { emoji: "😠", options: ["triste", "enojado", "feliz"], correct: "enojado" },
        { emoji: "😮", options: ["sorprendido", "triste", "enojado"], correct: "sorprendido" },
        { emoji: "🥰", options: ["enamorado", "triste", "enojado"], correct: "enamorado" },
        { emoji: "😴", options: ["feliz", "sueño", "enojado"], correct: "sueño" },
      ],
    },
  },
  {
    id: "emo-2",
    title: "Parejas de emociones",
    description: "Encuentra las parejas de emociones iguales",
    category: "emociones",
    difficulty: "easy",
    type: "memory-pairs",
    data: {
      pairs: ["😊", "😢", "😠", "😮"],
      gridSize: 4,
    },
  },
  {
    id: "emo-3",
    title: "Emociones positivas y negativas",
    description: "Agrupa las emociones positivas y negativas",
    category: "emociones",
    difficulty: "easy",
    type: "association-game",
    data: {
      rounds: [
        {
          groups: [
            { items: ["😊", "🥰", "😂"], name: "positivas" },
            { items: ["😢", "😠", "😨"], name: "negativas" },
          ],
        },
        {
          groups: [
            { items: ["😄", "😌", "🤗"], name: "positivas" },
            { items: ["😟", "😕", "😫"], name: "negativas" },
          ],
        },
      ],
    },
  },
  {
    id: "emo-4",
    title: "¿Cómo se siente? - Más emociones",
    description: "Identifica la emoción correcta",
    category: "emociones",
    difficulty: "medium",
    type: "identify-emotion",
    data: {
      rounds: [
        { emoji: "😂", options: ["riendo", "llorando", "enojado"], correct: "riendo" },
        { emoji: "🤔", options: ["pensando", "feliz", "triste"], correct: "pensando" },
        { emoji: "😌", options: ["tranquilo", "enojado", "sorprendido"], correct: "tranquilo" },
        { emoji: "😟", options: ["preocupado", "feliz", "riendo"], correct: "preocupado" },
        { emoji: "😴", options: ["dormido", "despierto", "enojado"], correct: "dormido" },
        { emoji: "🤗", options: ["abrazo", "triste", "enojado"], correct: "abrazo" },
      ],
    },
  },
  {
    id: "emo-5",
    title: "Memoria - Emociones",
    description: "Recuerda el orden de las emociones",
    category: "emociones",
    difficulty: "easy",
    type: "remember-sequence",
    data: {
      sequence: ["feliz", "triste", "feliz"],
      shapes: ["😊", "😢", "😊"],
    },
  },
];
