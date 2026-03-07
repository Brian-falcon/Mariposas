import { Activity } from "@/types";

export const coordinacionActivities: Activity[] = [
  {
    id: "coo-1",
    title: "Arrastrar y soltar - Frutas",
    description: "Lleva cada fruta a su lugar",
    category: "coordinacion",
    difficulty: "easy",
    type: "drag-drop",
    data: {
      pairs: [
        { source: "🍎", target: "manzana" },
        { source: "🍌", target: "banana" },
        { source: "🍊", target: "naranja" },
      ],
    },
  },
  {
    id: "coo-2",
    title: "Arrastrar y soltar - Números",
    description: "Asocia el número con la cantidad",
    category: "coordinacion",
    difficulty: "medium",
    type: "drag-drop",
    data: {
      pairs: [
        { source: "3", target: "●●●" },
        { source: "5", target: "●●●●●" },
        { source: "2", target: "●●" },
      ],
    },
  },
  {
    id: "coo-3",
    title: "Ordenar objetos - Tamaño",
    description: "Ordena de menor a mayor",
    category: "coordinacion",
    difficulty: "easy",
    type: "order-objects",
    data: {
      items: ["●", "●●", "●●●", "●●●●"],
      order: "asc",
    },
  },
  {
    id: "coo-4",
    title: "Ordenar - Números",
    description: "Ordena los números correctamente",
    category: "coordinacion",
    difficulty: "medium",
    type: "order-objects",
    data: {
      items: ["5", "2", "8", "1", "4"],
      correctOrder: ["1", "2", "4", "5", "8"],
    },
  },
  {
    id: "coo-5",
    title: "Seguir secuencia - Colores",
    description: "Completa la secuencia de colores",
    category: "coordinacion",
    difficulty: "easy",
    type: "follow-sequence",
    data: {
      pattern: ["rojo", "azul", "rojo", "azul"],
      colors: ["#E86B6B", "#4A90D9"],
      nextCorrect: "rojo",
    },
  },
  {
    id: "coo-6",
    title: "Seguir secuencia - Formas",
    description: "¿Qué forma sigue?",
    category: "coordinacion",
    difficulty: "medium",
    type: "follow-sequence",
    data: {
      pattern: ["●", "■", "●", "■"],
      shapes: ["●", "■"],
      nextCorrect: "●",
    },
  },
  // Más arrastrar y soltar
  {
    id: "coo-7",
    title: "Arrastrar y soltar - Animales",
    description: "Une cada animal con su nombre",
    category: "coordinacion",
    difficulty: "easy",
    type: "drag-drop",
    data: {
      pairs: [
        { source: "🐶", target: "perro" },
        { source: "🐱", target: "gato" },
        { source: "🐰", target: "conejo" },
      ],
    },
  },
  {
    id: "coo-8",
    title: "Arrastrar y soltar - Colores",
    description: "Asocia el color con su nombre",
    category: "coordinacion",
    difficulty: "easy",
    type: "drag-drop",
    data: {
      pairs: [
        { source: "🔴", target: "rojo" },
        { source: "🔵", target: "azul" },
        { source: "🟢", target: "verde" },
      ],
    },
  },
  // Más ordenar
  {
    id: "coo-9",
    title: "Ordenar - Letras",
    description: "Ordena las letras alfabéticamente",
    category: "coordinacion",
    difficulty: "medium",
    type: "order-objects",
    data: {
      items: ["C", "A", "B", "D"],
      correctOrder: ["A", "B", "C", "D"],
    },
  },
  {
    id: "coo-10",
    title: "Ordenar - Números pequeños",
    description: "Ordena de menor a mayor",
    category: "coordinacion",
    difficulty: "easy",
    type: "order-objects",
    data: {
      items: ["3", "1", "4", "2"],
      correctOrder: ["1", "2", "3", "4"],
    },
  },
  // Más seguir secuencia
  {
    id: "coo-11",
    title: "Seguir secuencia - Emojis",
    description: "¿Qué emoji sigue?",
    category: "coordinacion",
    difficulty: "easy",
    type: "follow-sequence",
    data: {
      pattern: ["🍎", "🍌", "🍎", "🍌"],
      shapes: ["🍎", "🍌"],
      nextCorrect: "🍎",
    },
  },
];
