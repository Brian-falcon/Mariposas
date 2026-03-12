import { Activity } from "@/types";

export const relajacionActivities: Activity[] = [
  {
    id: "rel-1",
    title: "Respiración - Inspira y expira",
    description: "Sigue la animación para respirar calmado",
    category: "relajacion",
    difficulty: "easy",
    type: "breathing-exercise",
    data: {
      duration: 60000,
      cycles: 6,
    },
  },
  {
    id: "rel-2",
    title: "Respiración corta - 3 respiros",
    description: "Tres respiros profundos para calmarnos",
    category: "relajacion",
    difficulty: "easy",
    type: "breathing-exercise",
    data: {
      duration: 30000,
      cycles: 3,
    },
  },
  {
    id: "rel-3",
    title: "Pausa para colorear",
    description: "Colorea para relajarte",
    category: "relajacion",
    difficulty: "easy",
    type: "coloring",
    data: {
      regions: ["🌙", "⭐", "🌸", "🦋", "🌈", "☁️"],
      colors: ["#9B59B6", "#4A90D9", "#E86B6B", "#5CB85C", "#F5A623", "#E8E8E8"],
    },
  },
  {
    id: "rel-4",
    title: "Mandala de calma",
    description: "Colorea el mandala con calma",
    category: "relajacion",
    difficulty: "easy",
    type: "mandala-coloring",
    data: {
      image: "/mandalas/mandala-1.png",
      gridSize: 6,
      colors: ["#9B59B6", "#4A90D9", "#5CB85C", "#F5A623", "#E86B6B", "#E8E8E8"],
    },
  },
  {
    id: "rel-5",
    title: "Respiración - 5 minutos",
    description: "Sesión de respiración guiada",
    category: "relajacion",
    difficulty: "easy",
    type: "breathing-exercise",
    data: {
      duration: 120000,
      cycles: 12,
    },
  },
];
