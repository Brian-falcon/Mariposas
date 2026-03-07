import { Activity } from "@/types";

const colorRounds = [
  { targetColor: "rojo", colorHex: "#E86B6B", options: ["rojo", "azul", "verde", "amarillo"], colorOptions: ["#E86B6B", "#4A90D9", "#5CB85C", "#F5A623"] },
  { targetColor: "azul", colorHex: "#4A90D9", options: ["azul", "rojo", "verde", "amarillo"], colorOptions: ["#4A90D9", "#E86B6B", "#5CB85C", "#F5A623"] },
  { targetColor: "verde", colorHex: "#5CB85C", options: ["rojo", "azul", "verde", "naranja"], colorOptions: ["#E86B6B", "#4A90D9", "#5CB85C", "#F5A623"] },
  { targetColor: "morado", colorHex: "#9B59B6", options: ["rojo", "morado", "naranja", "verde"], colorOptions: ["#E86B6B", "#9B59B6", "#F5A623", "#5CB85C"] },
  { targetColor: "amarillo", colorHex: "#F5A623", options: ["amarillo", "naranja", "rojo", "verde"], colorOptions: ["#F5A623", "#E67E22", "#E86B6B", "#5CB85C"] },
  { targetColor: "naranja", colorHex: "#E67E22", options: ["naranja", "rojo", "amarillo", "verde"], colorOptions: ["#E67E22", "#E86B6B", "#F5A623", "#5CB85C"] },
  { targetColor: "rosa", colorHex: "#E91E8C", options: ["rosa", "rojo", "morado", "azul"], colorOptions: ["#E91E8C", "#E86B6B", "#9B59B6", "#4A90D9"] },
  { targetColor: "celeste", colorHex: "#00BCD4", options: ["celeste", "azul", "verde", "morado"], colorOptions: ["#00BCD4", "#4A90D9", "#5CB85C", "#9B59B6"] },
  { targetColor: "rojo", colorHex: "#E86B6B", options: ["rojo", "azul", "verde", "amarillo"], colorOptions: ["#E86B6B", "#4A90D9", "#5CB85C", "#F5A623"] },
  { targetColor: "verde", colorHex: "#5CB85C", options: ["rojo", "azul", "verde", "naranja"], colorOptions: ["#E86B6B", "#4A90D9", "#5CB85C", "#F5A623"] },
];

const shapeRounds = [
  { shape: "círculo", shapeEmoji: "⭕", options: ["círculo", "cuadrado", "triángulo"] },
  { shape: "cuadrado", shapeEmoji: "⬛", options: ["círculo", "cuadrado", "triángulo"] },
  { shape: "triángulo", shapeEmoji: "🔺", options: ["círculo", "cuadrado", "triángulo"] },
  { shape: "estrella", shapeEmoji: "⭐", options: ["círculo", "cuadrado", "estrella", "corazón"] },
  { shape: "círculo", shapeEmoji: "⭕", options: ["círculo", "cuadrado", "triángulo"] },
  { shape: "cuadrado", shapeEmoji: "■", options: ["círculo", "cuadrado", "triángulo"] },
  { shape: "corazón", shapeEmoji: "❤️", options: ["círculo", "estrella", "corazón", "triángulo"] },
  { shape: "triángulo", shapeEmoji: "▲", options: ["círculo", "cuadrado", "triángulo"] },
];

const differenceRounds = [
  { items: ["🍎", "🍎", "🍌", "🍎"], differentIndex: 2 },
  { items: ["🐶", "🐶", "🐱", "🐶"], differentIndex: 2 },
  { items: ["🍌", "🍌", "🍌", "🍎"], differentIndex: 3 },
  { items: ["⭐", "❤️", "⭐", "⭐"], differentIndex: 1 },
  { items: ["🌸", "🌸", "🌻", "🌸"], differentIndex: 2 },
  { items: ["🐰", "🐻", "🐰", "🐰"], differentIndex: 1 },
  { items: ["🚗", "🚗", "🚗", "✈️"], differentIndex: 3 },
  { items: ["🍊", "🍊", "🍎", "🍊"], differentIndex: 2 },
  { items: ["❤️", "❤️", "⭐", "❤️"], differentIndex: 2 },
  { items: ["🐱", "🐱", "🐱", "🐶"], differentIndex: 3 },
];

export const visualActivities: Activity[] = [
  {
    id: "vis-1",
    title: "Reconocer colores",
    description: "¿Qué color es cada uno?",
    category: "visual",
    difficulty: "easy",
    type: "recognize-colors",
    data: { rounds: colorRounds },
  },
  {
    id: "vis-2",
    title: "Identificar formas",
    description: "¿Qué forma es cada una?",
    category: "visual",
    difficulty: "easy",
    type: "identify-shapes",
    data: { rounds: shapeRounds },
  },
  {
    id: "vis-3",
    title: "Encontrar diferencias",
    description: "¿Cuál es diferente en cada caso?",
    category: "visual",
    difficulty: "easy",
    type: "find-difference",
    data: { rounds: differenceRounds },
  },
  {
    id: "vis-4",
    title: "Asociar imagen con palabra",
    description: "Une cada imagen con su nombre",
    category: "visual",
    difficulty: "easy",
    type: "match-image-word",
    data: {
      pairs: [
        { image: "🍎", word: "manzana" },
        { image: "🍌", word: "banana" },
        { image: "🍊", word: "naranja" },
      ],
    },
  },
  {
    id: "vis-5",
    title: "Asociar - Animales",
    description: "Relaciona cada animal con su nombre",
    category: "visual",
    difficulty: "medium",
    type: "match-image-word",
    data: {
      pairs: [
        { image: "🐶", word: "perro" },
        { image: "🐱", word: "gato" },
        { image: "🐰", word: "conejo" },
        { image: "🐻", word: "oso" },
      ],
    },
  },
  {
    id: "vis-6",
    title: "Asociar - Objetos",
    description: "Relaciona imagen con palabra",
    category: "visual",
    difficulty: "medium",
    type: "match-image-word",
    data: {
      pairs: [
        { image: "🏠", word: "casa" },
        { image: "🚗", word: "auto" },
        { image: "🌳", word: "árbol" },
        { image: "☀️", word: "sol" },
      ],
    },
  },
];
