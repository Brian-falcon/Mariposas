import { Activity } from "@/types";

export const categorizacionActivities: Activity[] = [
  {
    id: "cat-1",
    title: "¿Qué no pertenece? - Frutas",
    description: "Encuentra el que es diferente",
    category: "categorizacion",
    difficulty: "easy",
    type: "odd-one-out",
    data: {
      rounds: [
        { items: ["🍎", "🍌", "🍊", "🚗"], correctIndex: 3 },
        { items: ["🐶", "🍎", "🐱", "🐰"], correctIndex: 1 },
        { items: ["🚗", "🚌", "✈️", "🍕"], correctIndex: 3 },
        { items: ["🌸", "🌻", "📕", "🌷"], correctIndex: 2 },
        { items: ["🥕", "🥦", "🍅", "✈️"], correctIndex: 3 },
      ],
    },
  },
  {
    id: "cat-2",
    title: "¿Qué no pertenece? - Animales",
    description: "Encuentra el intruso",
    category: "categorizacion",
    difficulty: "easy",
    type: "odd-one-out",
    data: {
      rounds: [
        { items: ["🐶", "🐱", "🐰", "🚗"], correctIndex: 3 },
        { items: ["🐟", "✏️", "🦈", "🐬"], correctIndex: 1 },
        { items: ["🦋", "🐝", "🐞", "🐶"], correctIndex: 3 },
        { items: ["🦁", "🐯", "🐻", "🌸"], correctIndex: 3 },
      ],
    },
  },
  {
    id: "cat-3",
    title: "Agrupar - Frutas y verduras",
    description: "Separa frutas de verduras",
    category: "categorizacion",
    difficulty: "easy",
    type: "association-game",
    data: {
      rounds: [
        {
          groups: [
            { items: ["🍎", "🍇", "🍓"], name: "frutas" },
            { items: ["🥕", "🥬", "🌽"], name: "verduras" },
          ],
        },
      ],
    },
  },
  {
    id: "cat-4",
    title: "Agrupar - Transporte y animales",
    description: "¿Qué va con qué?",
    category: "categorizacion",
    difficulty: "easy",
    type: "association-game",
    data: {
      rounds: [
        {
          groups: [
            { items: ["🚗", "🚌", "✈️"], name: "transporte" },
            { items: ["🐶", "🐱", "🐦"], name: "animales" },
          ],
        },
      ],
    },
  },
  {
    id: "cat-5",
    title: "¿Qué no pertenece? - Por color",
    description: "Encuentra el de color diferente",
    category: "categorizacion",
    difficulty: "medium",
    type: "odd-one-out",
    data: {
      rounds: [
        { items: ["🍎", "🌸", "🔥", "🍊"], correctIndex: 1 },
        { items: ["🌳", "🦋", "🍀", "🌸"], correctIndex: 1 },
      ],
    },
  },
];
