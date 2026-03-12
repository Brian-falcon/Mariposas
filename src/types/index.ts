export type Difficulty = "easy" | "medium" | "hard";

export type CategoryId =
  | "memoria"
  | "visual"
  | "matematica"
  | "lectura"
  | "auditivo"
  | "coordinacion"
  | "juegos"
  | "emociones"
  | "tiempo"
  | "espacial"
  | "categorizacion"
  | "vida-diaria"
  | "relajacion";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  difficulty: Difficulty;
  type: string;
  data: Record<string, unknown>;
}

export interface ActivityResult {
  correct: number;
  total: number;
  completed: boolean;
}
