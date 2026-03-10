import { Activity } from "@/types";
import { memoriaActivities } from "./memoria";
import { visualActivities } from "./visual";
import { matematicaActivities } from "./matematica";
import { lecturaActivities } from "./lectura";
import { auditivoActivities } from "./auditivo";
import { coordinacionActivities } from "./coordinacion";
import { juegosActivities } from "./juegos";
export const allActivities: Activity[] = [
  ...memoriaActivities,
  ...visualActivities,
  ...matematicaActivities,
  ...lecturaActivities,
  ...auditivoActivities,
  ...coordinacionActivities,
  ...juegosActivities,
];

export function getActivitiesByCategory(category: string): Activity[] {
  return allActivities.filter((a) => a.category === category);
}

export function getActivityById(id: string): Activity | undefined {
  return allActivities.find((a) => a.id === id);
}

export function getActivitiesByDifficulty(difficulty: string): Activity[] {
  return allActivities.filter((a) => a.difficulty === difficulty);
}
