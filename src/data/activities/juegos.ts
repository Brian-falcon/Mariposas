import { Activity } from "@/types";

export const juegosActivities: Activity[] = [
  {
    id: "jue-1",
    title: "Puzzle simple - Mariposa",
    description: "Arma el puzzle arrastrando las piezas",
    category: "juegos",
    difficulty: "easy",
    type: "simple-puzzle",
    data: {
      pieces: 4,
      image: "🦋",
    },
  },
  {
    id: "jue-2",
    title: "Puzzle - Flor",
    description: "Completa el puzzle de la flor",
    category: "juegos",
    difficulty: "medium",
    type: "simple-puzzle",
    data: {
      pieces: 6,
      image: "🌸",
    },
  },
  {
    id: "jue-3",
    title: "Asociación - Familia",
    description: "Agrupa lo que va junto",
    category: "juegos",
    difficulty: "easy",
    type: "association-game",
    data: {
      groups: [
        { items: ["👨", "👩", "👶"], name: "familia" },
        { items: ["🐶", "🐱", "🐰"], name: "animales" },
      ],
    },
  },
  {
    id: "jue-4",
    title: "Asociación - Comida",
    description: "Relaciona los alimentos",
    category: "juegos",
    difficulty: "medium",
    type: "association-game",
    data: {
      groups: [
        { items: ["🍎", "🍊", "🍌"], name: "frutas" },
        { items: ["🥕", "🥦", "🍅"], name: "vegetales" },
      ],
    },
  },
  {
    id: "jue-5",
    title: "Memoria visual - Emojis",
    description: "Encuentra todas las parejas",
    category: "juegos",
    difficulty: "easy",
    type: "memory-pairs",
    data: {
      pairs: ["❤️", "⭐", "🌈", "☀️"],
      gridSize: 4,
    },
  },
  {
    id: "jue-6",
    title: "Memoria visual - Más parejas",
    description: "Juego de memoria con más cartas",
    category: "juegos",
    difficulty: "hard",
    type: "memory-pairs",
    data: {
      pairs: ["🦋", "🌸", "🌻", "🐝", "🌿", "☀️"],
      gridSize: 6,
    },
  },
];
