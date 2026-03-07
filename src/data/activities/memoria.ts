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
  // Más memorizar imágenes
  {
    id: "mem-8",
    title: "Memorizar imágenes - Flores",
    description: "Mira las flores y recuérdalas",
    category: "memoria",
    difficulty: "easy",
    type: "memorize-images",
    data: {
      images: ["🌸", "🌻", "🌷", "🌹"],
      displayTime: 3000,
    },
  },
  {
    id: "mem-9",
    title: "Memorizar imágenes - Transporte",
    description: "Observa los medios de transporte",
    category: "memoria",
    difficulty: "medium",
    type: "memorize-images",
    data: {
      images: ["🚗", "🚲", "✈️", "🚢", "🚂"],
      displayTime: 4000,
    },
  },
  // Más encontrar pares
  {
    id: "mem-10",
    title: "Encontrar pares - Flores",
    description: "Busca las parejas de flores",
    category: "memoria",
    difficulty: "easy",
    type: "memory-pairs",
    data: {
      pairs: ["🌸", "🌻", "🌷", "🌹"],
      gridSize: 4,
    },
  },
  {
    id: "mem-11",
    title: "Encontrar pares - Transporte",
    description: "Encuentra los pares iguales",
    category: "memoria",
    difficulty: "medium",
    type: "memory-pairs",
    data: {
      pairs: ["🚗", "✈️", "🚢", "🚲", "🚂", "🛴"],
      gridSize: 6,
    },
  },
  // Más recordar secuencia
  {
    id: "mem-12",
    title: "Recordar secuencia - Frutas",
    description: "Memoriza el orden de las frutas",
    category: "memoria",
    difficulty: "easy",
    type: "remember-sequence",
    data: {
      sequence: ["manzana", "banana", "naranja"],
      shapes: ["🍎", "🍌", "🍊"],
    },
  },
];
