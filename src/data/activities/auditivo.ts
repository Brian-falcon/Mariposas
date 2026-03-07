import { Activity } from "@/types";

export const auditivoActivities: Activity[] = [
  {
    id: "aud-1",
    title: "Reconocer sonidos - Animales",
    description: "Escucha y elige el animal correcto",
    category: "auditivo",
    difficulty: "easy",
    type: "recognize-sound",
    data: {
      soundType: "perro",
      options: ["perro", "gato", "pájaro", "vaca"],
      emojis: ["🐶", "🐱", "🐦", "🐮"],
    },
  },
  {
    id: "aud-2",
    title: "Reconocer sonidos - Transporte",
    description: "¿Qué sonido escuchas?",
    category: "auditivo",
    difficulty: "easy",
    type: "recognize-sound",
    data: {
      soundType: "auto",
      options: ["auto", "tren", "avión", "barco"],
      emojis: ["🚗", "🚂", "✈️", "🚢"],
    },
  },
  {
    id: "aud-3",
    title: "Elegir sonido correcto - Naturaleza",
    description: "Identifica el sonido de la naturaleza",
    category: "auditivo",
    difficulty: "medium",
    type: "choose-sound",
    data: {
      correctSound: "lluvia",
      options: ["lluvia", "viento", "trueno", "río"],
      emojis: ["🌧️", "💨", "⛈️", "🌊"],
    },
  },
  {
    id: "aud-4",
    title: "Elegir sonido - Instrumentos",
    description: "¿Qué instrumento suena?",
    category: "auditivo",
    difficulty: "medium",
    type: "choose-sound",
    data: {
      correctSound: "campana",
      options: ["campana", "tambor", "flauta", "guitarra"],
      emojis: ["🔔", "🥁", "🎵", "🎸"],
    },
  },
  // Más reconocer sonidos
  {
    id: "aud-5",
    title: "Reconocer sonidos - Gato",
    description: "¿Qué animal hace este sonido?",
    category: "auditivo",
    difficulty: "easy",
    type: "recognize-sound",
    data: {
      soundType: "gato",
      options: ["perro", "gato", "vaca", "pájaro"],
      emojis: ["🐶", "🐱", "🐮", "🐦"],
    },
  },
  {
    id: "aud-6",
    title: "Reconocer sonidos - Vaca",
    description: "Escucha y elige el animal",
    category: "auditivo",
    difficulty: "easy",
    type: "recognize-sound",
    data: {
      soundType: "vaca",
      options: ["perro", "gato", "vaca", "oveja"],
      emojis: ["🐶", "🐱", "🐮", "🐑"],
    },
  },
];
