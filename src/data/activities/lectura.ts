import { Activity } from "@/types";

export const lecturaActivities: Activity[] = [
  {
    id: "lec-1",
    title: "Reconocer letras",
    description: "Encuentra cada letra",
    category: "lectura",
    difficulty: "easy",
    type: "recognize-letters",
    data: {
      rounds: [
        { targetLetter: "A", options: ["A", "B", "C", "D"] },
        { targetLetter: "M", options: ["P", "M", "N", "L"] },
        { targetLetter: "S", options: ["S", "Z", "C", "F"] },
        { targetLetter: "P", options: ["P", "R", "B", "D"] },
        { targetLetter: "L", options: ["I", "L", "T", "J"] },
      ],
    },
  },
  {
    id: "lec-2",
    title: "Completar palabras",
    description: "Completa cada palabra",
    category: "lectura",
    difficulty: "easy",
    type: "complete-word",
    data: {
      rounds: [
        { word: "MESA", missingLetterIndex: 1, hint: "ME_A", options: ["S", "Z", "C", "X"] },
        { word: "SOL", missingLetterIndex: 2, hint: "SO_", options: ["L", "R", "N", "M"] },
        { word: "LUNA", missingLetterIndex: 0, hint: "_UNA", options: ["L", "M", "N", "P"] },
        { word: "GATO", missingLetterIndex: 0, hint: "_ATO", options: ["G", "P", "R", "C"] },
      ],
    },
  },
  {
    id: "lec-3",
    title: "Unir palabra con imagen",
    description: "Elige la imagen correcta para cada palabra",
    category: "lectura",
    difficulty: "easy",
    type: "match-word-image",
    data: {
      rounds: [
        {
          word: "GATO",
          options: [
            { image: "🐱", correct: true },
            { image: "🐶", correct: false },
            { image: "🐰", correct: false },
          ],
        },
        {
          word: "CASA",
          options: [
            { image: "🏠", correct: true },
            { image: "🚗", correct: false },
            { image: "🌳", correct: false },
          ],
        },
        {
          word: "PERRO",
          options: [
            { image: "🐶", correct: true },
            { image: "🐱", correct: false },
            { image: "🐰", correct: false },
          ],
        },
        {
          word: "MANZANA",
          options: [
            { image: "🍎", correct: true },
            { image: "🍌", correct: false },
            { image: "🍊", correct: false },
          ],
        },
        {
          word: "LÁPIZ",
          options: [
            { image: "✏️", correct: true },
            { image: "📕", correct: false },
            { image: "✂️", correct: false },
          ],
        },
      ],
    },
  },
];
