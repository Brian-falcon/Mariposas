import { Activity } from "@/types";

export const memoriaActivities: Activity[] = [
  {
    id: "mem-1",
    title: "Memorizar imágenes - Frutas",
    description: "Mira las imágenes y recuérdalas",
    category: "memoria",
    difficulty: "easy",
    type: "memorize-images",
    data: {
      images: ["🍎", "🍌", "🍊", "🍇"],
      displayTime: 3000,
    },
  },
  {
    id: "mem-2",
    title: "Memorizar imágenes - Animales",
    description: "Observa los animales que aparecen",
    category: "memoria",
    difficulty: "easy",
    type: "memorize-images",
    data: {
      images: ["🐶", "🐱", "🐰", "🐻", "🦊"],
      displayTime: 4000,
    },
  },
  {
    id: "mem-3",
    title: "Encontrar pares - Frutas",
    description: "Encuentra las parejas iguales",
    category: "memoria",
    difficulty: "easy",
    type: "memory-pairs",
    data: {
      pairs: ["🍎", "🍌", "🍊", "🍇"],
      gridSize: 4,
    },
  },
  {
    id: "mem-4",
    title: "Encontrar pares - Emojis",
    description: "Busca las parejas que coinciden",
    category: "memoria",
    difficulty: "medium",
    type: "memory-pairs",
    data: {
      pairs: ["⭐", "❤️", "🌈", "🌟", "💛", "☀️"],
      gridSize: 6,
    },
  },
  {
    id: "mem-5",
    title: "Encontrar pares - Animales",
    description: "Encuentra los animales iguales",
    category: "memoria",
    difficulty: "medium",
    type: "memory-pairs",
    data: {
      pairs: ["🐶", "🐱", "🐰", "🐻", "🦊", "🐼"],
      gridSize: 6,
    },
  },
  {
    id: "mem-6",
    title: "Recordar secuencia - Colores",
    description: "Recuerda el orden de los colores",
    category: "memoria",
    difficulty: "easy",
    type: "remember-sequence",
    data: {
      sequence: ["rojo", "azul", "verde"],
      colors: ["#E86B6B", "#4A90D9", "#5CB85C"],
    },
  },
  {
    id: "mem-7",
    title: "Recordar secuencia - Formas",
    description: "Memoriza el orden de las formas",
    category: "memoria",
    difficulty: "medium",
    type: "remember-sequence",
    data: {
      sequence: ["círculo", "cuadrado", "triángulo", "estrella"],
      shapes: ["●", "■", "▲", "★"],
    },
  },
];
