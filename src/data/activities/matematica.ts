import { Activity } from "@/types";

const countRounds1 = [
  { items: ["🍅", "🍅", "🍅", "🍅"], answer: 4, label: "tomates" },
  { items: ["🧅", "🧅", "🧅"], answer: 3, label: "cebollas" },
  { items: ["🥕", "🥕", "🥕", "🥕", "🥕"], answer: 5, label: "zanahorias" },
  { items: ["🍎", "🍎", "🍎"], answer: 3, label: "manzanas" },
  { items: ["🍌", "🍌", "🍌", "🍌"], answer: 4, label: "bananas" },
  { items: ["🍊", "🍊", "🍊"], answer: 3, label: "naranjas" },
  { items: ["🍇", "🍇", "🍇", "🍇"], answer: 4, label: "uvas" },
  { items: ["🍓", "🍓", "🍓", "🍓", "🍓", "🍓"], answer: 6, label: "frutillas" },
  { items: ["🍑", "🍑", "🍑"], answer: 3, label: "duraznos" },
  { items: ["🥦", "🥦", "🥦", "🥦"], answer: 4, label: "brócolis" },
];

const countRounds2 = [
  { items: ["⭐", "⭐", "⭐", "⭐", "⭐"], answer: 5, label: "estrellas" },
  { items: ["🐶", "🐶", "🐶"], answer: 3, label: "perros" },
  { items: ["🌸", "🌸", "🌸", "🌸"], answer: 4, label: "flores" },
  { items: ["❤️", "❤️", "❤️", "❤️", "❤️", "❤️"], answer: 6, label: "corazones" },
  { items: ["🐱", "🐱", "🐱", "🐱"], answer: 4, label: "gatos" },
  { items: ["🐰", "🐰", "🐰"], answer: 3, label: "conejos" },
  { items: ["🐻", "🐻", "🐻", "🐻"], answer: 4, label: "osos" },
  { items: ["🚗", "🚗", "🚗"], answer: 3, label: "autos" },
  { items: ["✏️", "✏️", "✏️", "✏️", "✏️"], answer: 5, label: "lápices" },
  { items: ["📕", "📕", "📕", "📕"], answer: 4, label: "libros" },
];

const addRounds = [
  { group1: ["🍎", "🍎"], group2: ["🍎", "🍎", "🍎"], answer: 5 },
  { group1: ["⭐", "⭐", "⭐"], group2: ["⭐", "⭐"], answer: 5 },
  { group1: ["🍌", "🍌"], group2: ["🍌"], answer: 3 },
  { group1: ["⭐", "⭐"], group2: ["⭐", "⭐", "⭐", "⭐"], answer: 6 },
  { group1: ["🐶", "🐶"], group2: ["🐶", "🐶", "🐶"], answer: 5 },
  { group1: ["🌸", "🌸", "🌸"], group2: ["🌸", "🌸"], answer: 5 },
  { group1: ["🍊", "🍊", "🍊"], group2: ["🍊", "🍊"], answer: 5 },
  { group1: ["❤️", "❤️"], group2: ["❤️", "❤️", "❤️", "❤️"], answer: 6 },
  { group1: ["🍅", "🍅", "🍅"], group2: ["🍅", "🍅"], answer: 5 },
  { group1: ["🐱", "🐱"], group2: ["🐱", "🐱", "🐱"], answer: 5 },
];

const subtractRounds = [
  { total: ["🍊", "🍊", "🍊", "🍊"], subtract: ["🍊"], answer: 3 },
  { total: ["⭐", "⭐", "⭐", "⭐", "⭐"], subtract: ["⭐", "⭐"], answer: 3 },
  { total: ["🍎", "🍎", "🍎", "🍎", "🍎"], subtract: ["🍎", "🍎"], answer: 3 },
  { total: ["🐶", "🐶", "🐶", "🐶", "🐶", "🐶"], subtract: ["🐶", "🐶", "🐶"], answer: 3 },
  { total: ["🌸", "🌸", "🌸", "🌸", "🌸"], subtract: ["🌸", "🌸"], answer: 3 },
  { total: ["🍌", "🍌", "🍌", "🍌", "🍌", "🍌"], subtract: ["🍌", "🍌"], answer: 4 },
  { total: ["❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️"], subtract: ["❤️", "❤️", "❤️"], answer: 4 },
  { total: ["🍅", "🍅", "🍅", "🍅", "🍅", "🍅", "🍅"], subtract: ["🍅", "🍅"], answer: 5 },
  { total: ["🐱", "🐱", "🐱", "🐱", "🐱"], subtract: ["🐱"], answer: 4 },
  { total: ["✏️", "✏️", "✏️", "✏️", "✏️", "✏️"], subtract: ["✏️", "✏️", "✏️"], answer: 3 },
];

const chooseRounds = [
  { items: ["🍎", "🍎", "🍎", "🍎"], correctAnswer: 4, options: [2, 3, 4, 5] },
  { items: ["🍅", "🍅", "🍅"], correctAnswer: 3, options: [2, 3, 4] },
  { items: ["🧅", "🧅", "🧅", "🧅", "🧅"], correctAnswer: 5, options: [4, 5, 6] },
  { items: ["🌸", "🌸", "🌸", "🌸", "🌸", "🌸"], correctAnswer: 6, options: [4, 5, 6, 7] },
  { items: ["🐱", "🐱", "🐱", "🐱"], correctAnswer: 4, options: [3, 4, 5] },
  { items: ["🐶", "🐶", "🐶", "🐶", "🐶"], correctAnswer: 5, options: [4, 5, 6] },
  { items: ["⭐", "⭐", "⭐", "⭐"], correctAnswer: 4, options: [3, 4, 5] },
  { items: ["🍌", "🍌", "🍌", "🍌", "🍌", "🍌"], correctAnswer: 6, options: [5, 6, 7] },
  { items: ["❤️", "❤️", "❤️", "❤️", "❤️"], correctAnswer: 5, options: [4, 5, 6] },
  { items: ["🚗", "🚗", "🚗"], correctAnswer: 3, options: [2, 3, 4] },
];

export const matematicaActivities: Activity[] = [
  {
    id: "mat-1",
    title: "Contar objetos - Verduras y frutas",
    description: "Cuenta cuántos hay de cada uno",
    category: "matematica",
    difficulty: "easy",
    type: "count-objects",
    data: { rounds: countRounds1 },
  },
  {
    id: "mat-2",
    title: "Contar objetos - Estrellas y más",
    description: "Cuenta las estrellas y otros objetos",
    category: "matematica",
    difficulty: "easy",
    type: "count-objects",
    data: { rounds: countRounds2 },
  },
  {
    id: "mat-3",
    title: "Contar objetos - Más cantidad",
    description: "¿Cuántos hay en total?",
    category: "matematica",
    difficulty: "medium",
    type: "count-objects",
    data: {
      rounds: [
        { items: ["🐶", "🐶", "🐶", "🐶", "🐶", "🐶", "🐶"], answer: 7 },
        { items: ["🚗", "🚗", "🚗", "🚗", "🚗", "🚗", "🚗", "🚗"], answer: 8 },
        { items: ["⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐"], answer: 9 },
        { items: ["🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎"], answer: 10 },
        { items: ["🌸", "🌸", "🌸", "🌸", "🌸", "🌸", "🌸"], answer: 7 },
        { items: ["❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️", "❤️"], answer: 8 },
        { items: ["🐱", "🐱", "🐱", "🐱", "🐱", "🐱", "🐱", "🐱", "🐱"], answer: 9 },
        { items: ["✏️", "✏️", "✏️", "✏️", "✏️", "✏️", "✏️", "✏️", "✏️", "✏️"], answer: 10 },
      ],
    },
  },
  {
    id: "mat-4",
    title: "Sumar con imágenes",
    description: "Suma los objetos de cada pregunta",
    category: "matematica",
    difficulty: "easy",
    type: "add-images",
    data: { rounds: addRounds },
  },
  {
    id: "mat-5",
    title: "Restas simples",
    description: "¿Cuántos quedan en cada caso?",
    category: "matematica",
    difficulty: "easy",
    type: "subtract-images",
    data: { rounds: subtractRounds },
  },
  {
    id: "mat-6",
    title: "Elegir número correcto",
    description: "Selecciona cuántos hay en cada pregunta",
    category: "matematica",
    difficulty: "easy",
    type: "choose-number",
    data: { rounds: chooseRounds },
  },
  {
    id: "mat-7",
    title: "Elegir número - Avanzado",
    description: "¿Cuántos objetos hay?",
    category: "matematica",
    difficulty: "medium",
    type: "choose-number",
    data: {
      rounds: [
        ...chooseRounds.slice(0, 5),
        { items: ["🐱", "🐱", "🐱", "🐱", "🐱", "🐱"], correctAnswer: 6, options: [4, 5, 6, 7] },
      ],
    },
  },
];
