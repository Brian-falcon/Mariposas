import { Activity } from "@/types";

export const auditivoActivities: Activity[] = [
  {
    id: "aud-1",
    title: "Reconocer sonidos - Animales",
    description: "Escucha y elige el animal correcto en cada pregunta",
    category: "auditivo",
    difficulty: "easy",
    type: "recognize-sound",
    data: {
      rounds: [
        { soundType: "perro", options: ["perro", "gato", "pájaro", "vaca"], emojis: ["🐶", "🐱", "🐦", "🐮"] },
        { soundType: "gato", options: ["perro", "gato", "vaca", "pájaro"], emojis: ["🐶", "🐱", "🐮", "🐦"] },
        { soundType: "vaca", options: ["perro", "gato", "vaca", "oveja"], emojis: ["🐶", "🐱", "🐮", "🐑"] },
        { soundType: "pájaro", options: ["perro", "gato", "pájaro", "vaca"], emojis: ["🐶", "🐱", "🐦", "🐮"] },
        { soundType: "oveja", options: ["perro", "gato", "vaca", "oveja"], emojis: ["🐶", "🐱", "🐮", "🐑"] },
        { soundType: "perro", options: ["gato", "perro", "oveja", "pájaro"], emojis: ["🐱", "🐶", "🐑", "🐦"] },
      ],
    },
  },
  {
    id: "aud-2",
    title: "Reconocer sonidos - Transporte",
    description: "¿Qué sonido escuchas en cada pregunta?",
    category: "auditivo",
    difficulty: "easy",
    type: "recognize-sound",
    data: {
      rounds: [
        { soundType: "auto", options: ["auto", "tren", "avión", "barco"], emojis: ["🚗", "🚂", "✈️", "🚢"] },
        { soundType: "tren", options: ["auto", "tren", "avión", "barco"], emojis: ["🚗", "🚂", "✈️", "🚢"] },
        { soundType: "avión", options: ["auto", "tren", "avión", "barco"], emojis: ["🚗", "🚂", "✈️", "🚢"] },
        { soundType: "barco", options: ["auto", "tren", "avión", "barco"], emojis: ["🚗", "🚂", "✈️", "🚢"] },
        { soundType: "auto", options: ["tren", "barco", "auto", "avión"], emojis: ["🚂", "🚢", "🚗", "✈️"] },
        { soundType: "tren", options: ["avión", "tren", "barco", "auto"], emojis: ["✈️", "🚂", "🚢", "🚗"] },
      ],
    },
  },
  {
    id: "aud-3",
    title: "Elegir sonido correcto - Naturaleza e instrumentos",
    description: "Identifica el sonido en cada pregunta",
    category: "auditivo",
    difficulty: "medium",
    type: "choose-sound",
    data: {
      rounds: [
        { correctSound: "lluvia", options: ["lluvia", "viento", "trueno", "río"], emojis: ["🌧️", "💨", "⛈️", "🌊"] },
        { correctSound: "viento", options: ["lluvia", "viento", "trueno", "río"], emojis: ["🌧️", "💨", "⛈️", "🌊"] },
        { correctSound: "trueno", options: ["lluvia", "viento", "trueno", "río"], emojis: ["🌧️", "💨", "⛈️", "🌊"] },
        { correctSound: "río", options: ["lluvia", "viento", "trueno", "río"], emojis: ["🌧️", "💨", "⛈️", "🌊"] },
        { correctSound: "campana", options: ["campana", "tambor", "flauta", "guitarra"], emojis: ["🔔", "🥁", "🎵", "🎸"] },
        { correctSound: "tambor", options: ["campana", "tambor", "flauta", "guitarra"], emojis: ["🔔", "🥁", "🎵", "🎸"] },
        { correctSound: "flauta", options: ["campana", "tambor", "flauta", "guitarra"], emojis: ["🔔", "🥁", "🎵", "🎸"] },
        { correctSound: "guitarra", options: ["campana", "tambor", "flauta", "guitarra"], emojis: ["🔔", "🥁", "🎵", "🎸"] },
      ],
    },
  },
  {
    id: "aud-4",
    title: "Reconocer sonidos - Más animales",
    description: "Escucha y elige en cada pregunta",
    category: "auditivo",
    difficulty: "easy",
    type: "recognize-sound",
    data: {
      rounds: [
        { soundType: "gato", options: ["perro", "gato", "vaca", "pájaro"], emojis: ["🐶", "🐱", "🐮", "🐦"] },
        { soundType: "vaca", options: ["perro", "gato", "vaca", "oveja"], emojis: ["🐶", "🐱", "🐮", "🐑"] },
        { soundType: "perro", options: ["oveja", "perro", "gato", "vaca"], emojis: ["🐑", "🐶", "🐱", "🐮"] },
        { soundType: "pájaro", options: ["vaca", "pájaro", "perro", "gato"], emojis: ["🐮", "🐦", "🐶", "🐱"] },
      ],
    },
  },
];
