import { Activity } from "@/types";

export const lecturaActivities: Activity[] = [
  {
    id: "lec-1",
    title: "Reconocer letras - A",
    description: "Encuentra la letra A",
    category: "lectura",
    difficulty: "easy",
    type: "recognize-letters",
    data: {
      targetLetter: "A",
      options: ["A", "B", "C", "D"],
    },
  },
  {
    id: "lec-2",
    title: "Reconocer letras - M",
    description: "Selecciona la letra M",
    category: "lectura",
    difficulty: "easy",
    type: "recognize-letters",
    data: {
      targetLetter: "M",
      options: ["P", "M", "N", "L"],
    },
  },
  {
    id: "lec-3",
    title: "Reconocer letras - S",
    description: "¿Dónde está la S?",
    category: "lectura",
    difficulty: "easy",
    type: "recognize-letters",
    data: {
      targetLetter: "S",
      options: ["S", "Z", "C", "F"],
    },
  },
  {
    id: "lec-4",
    title: "Completar palabras - MESA",
    description: "Completa la palabra",
    category: "lectura",
    difficulty: "easy",
    type: "complete-word",
    data: {
      word: "MESA",
      missingLetterIndex: 1,
      hint: "ME_A",
      options: ["S", "Z", "C", "X"],
    },
  },
  {
    id: "lec-5",
    title: "Completar palabras - SOL",
    description: "¿Qué letra falta?",
    category: "lectura",
    difficulty: "easy",
    type: "complete-word",
    data: {
      word: "SOL",
      missingLetterIndex: 2,
      hint: "SO_",
      options: ["L", "R", "N", "M"],
    },
  },
  {
    id: "lec-6",
    title: "Unir palabra con imagen - GATO",
    description: "Relaciona la palabra con la imagen",
    category: "lectura",
    difficulty: "easy",
    type: "match-word-image",
    data: {
      word: "GATO",
      options: [
        { image: "🐱", correct: true },
        { image: "🐶", correct: false },
        { image: "🐰", correct: false },
      ],
    },
  },
  {
    id: "lec-7",
    title: "Unir palabra con imagen - CASA",
    description: "Elige la imagen correcta",
    category: "lectura",
    difficulty: "easy",
    type: "match-word-image",
    data: {
      word: "CASA",
      options: [
        { image: "🏠", correct: true },
        { image: "🚗", correct: false },
        { image: "🌳", correct: false },
      ],
    },
  },
  {
    id: "lec-8",
    title: "Unir palabra con imagen - LÁPIZ",
    description: "Selecciona la imagen que corresponde",
    category: "lectura",
    difficulty: "medium",
    type: "match-word-image",
    data: {
      word: "LÁPIZ",
      options: [
        { image: "✏️", correct: true },
        { image: "📕", correct: false },
        { image: "✂️", correct: false },
      ],
    },
  },
  // Más reconocer letras
  {
    id: "lec-9",
    title: "Reconocer letras - P",
    description: "Encuentra la letra P",
    category: "lectura",
    difficulty: "easy",
    type: "recognize-letters",
    data: {
      targetLetter: "P",
      options: ["P", "R", "B", "D"],
    },
  },
  {
    id: "lec-10",
    title: "Reconocer letras - L",
    description: "Selecciona la letra L",
    category: "lectura",
    difficulty: "easy",
    type: "recognize-letters",
    data: {
      targetLetter: "L",
      options: ["I", "L", "T", "J"],
    },
  },
  // Más completar palabras
  {
    id: "lec-11",
    title: "Completar palabras - LUNA",
    description: "Completa la palabra",
    category: "lectura",
    difficulty: "easy",
    type: "complete-word",
    data: {
      word: "LUNA",
      missingLetterIndex: 0,
      hint: "_UNA",
      options: ["L", "M", "N", "P"],
    },
  },
  {
    id: "lec-12",
    title: "Completar palabras - GATO",
    description: "¿Qué letra falta?",
    category: "lectura",
    difficulty: "easy",
    type: "complete-word",
    data: {
      word: "GATO",
      missingLetterIndex: 0,
      hint: "_ATO",
      options: ["G", "P", "R", "C"],
    },
  },
  // Más unir palabra con imagen
  {
    id: "lec-13",
    title: "Unir palabra con imagen - PERRO",
    description: "Elige la imagen correcta",
    category: "lectura",
    difficulty: "easy",
    type: "match-word-image",
    data: {
      word: "PERRO",
      options: [
        { image: "🐶", correct: true },
        { image: "🐱", correct: false },
        { image: "🐰", correct: false },
      ],
    },
  },
  {
    id: "lec-14",
    title: "Unir palabra con imagen - MANZANA",
    description: "Relaciona la palabra con la imagen",
    category: "lectura",
    difficulty: "easy",
    type: "match-word-image",
    data: {
      word: "MANZANA",
      options: [
        { image: "🍎", correct: true },
        { image: "🍌", correct: false },
        { image: "🍊", correct: false },
      ],
    },
  },
];
