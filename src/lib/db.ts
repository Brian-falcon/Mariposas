import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL no configurada. Usando modo sin base de datos.");
}

export const sql = process.env.DATABASE_URL
  ? neon(process.env.DATABASE_URL)
  : null;

export async function getStudents() {
  if (!sql) return [];
  try {
    const rows = await sql`SELECT id, slug, name FROM students ORDER BY name`;
    return rows as { id: number; slug: string; name: string }[];
  } catch {
    return [];
  }
}

export async function createSession(studentId: number) {
  if (!sql) return null;
  try {
    const [row] = await sql`
      INSERT INTO sessions (student_id) VALUES (${studentId})
      RETURNING id, student_id, created_at
    `;
    return row;
  } catch {
    return null;
  }
}

export async function recordProgress(data: {
  studentId: number;
  activityId: string;
  activityTitle: string;
  category: string;
  completed: boolean;
  score?: number;
  correct?: boolean;
  startedAt: string;
  completedAt: string;
  timeSeconds: number;
}) {
  if (!sql) return null;
  try {
    await sql`
      INSERT INTO progress (
        student_id, activity_id, activity_title, category,
        completed, score, correct, started_at, completed_at, time_seconds
      ) VALUES (
        ${data.studentId}, ${data.activityId}, ${data.activityTitle}, ${data.category},
        ${data.completed}, ${data.score ?? null}, ${data.correct ?? null},
        ${data.startedAt}, ${data.completedAt},
        ${data.timeSeconds}
      )
      ON CONFLICT (student_id, activity_id) DO UPDATE SET
        completed = EXCLUDED.completed,
        score = COALESCE(EXCLUDED.score, progress.score),
        correct = COALESCE(EXCLUDED.correct, progress.correct),
        completed_at = COALESCE(EXCLUDED.completed_at, progress.completed_at),
        time_seconds = COALESCE(EXCLUDED.time_seconds, progress.time_seconds)
    `;
    return true;
  } catch {
    return null;
  }
}

export async function getProgressReport() {
  if (!sql) return { students: [], summary: [] };
  try {
    const students = await sql`SELECT id, slug, name FROM students ORDER BY name`;
    const progress = await sql`
      SELECT p.student_id, p.activity_id, p.activity_title, p.category,
             p.completed, p.score, p.correct, p.started_at, p.completed_at, p.time_seconds
      FROM progress p
      ORDER BY p.completed_at DESC NULLS LAST, p.started_at DESC
    `;

    const byStudent: Record<
      number,
      { name: string; slug: string; activities: Record<string, unknown>[] }
    > = {};
    for (const s of students as { id: number; name: string; slug: string }[]) {
      byStudent[s.id] = { name: s.name, slug: s.slug, activities: [] };
    }
    for (const p of progress as { student_id: number }[]) {
      if (byStudent[p.student_id]) {
        byStudent[p.student_id].activities.push(p as Record<string, unknown>);
      }
    }

    const summary = (students as { id: number; name: string }[]).map((s) => {
      const acts = (
        progress as { student_id: number; completed: boolean; score: number | null }[]
      ).filter((a) => a.student_id === s.id);
      const completed = acts.filter((a) => a.completed).length;
      const withScore = acts.filter((a) => a.score != null);
      const avgScore =
        withScore.length > 0
          ? Math.round(
              withScore.reduce((sum, a) => sum + (a.score ?? 0), 0) / withScore.length
            )
          : null;
      return {
        studentId: s.id,
        studentName: s.name,
        completed,
        total: acts.length,
        avgScore,
      };
    });

    return { students: Object.values(byStudent), summary };
  } catch {
    return { students: [], summary: [] };
  }
}

export function verifyTeacherCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.TEACHER_EMAIL?.trim().toLowerCase() || "";
  const expectedPassword = process.env.TEACHER_PASSWORD || "";
  if (!expectedEmail || !expectedPassword) return false;
  return (
    email?.trim().toLowerCase() === expectedEmail && password === expectedPassword
  );
}
