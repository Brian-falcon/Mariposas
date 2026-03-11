import { NextRequest, NextResponse } from "next/server";
import { getStudentProgress } from "@/lib/db";
import { allActivities } from "@/data/activities";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    if (!studentId) {
      return NextResponse.json({ error: "studentId requerido" }, { status: 400 });
    }
    const id = parseInt(studentId, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "studentId inválido" }, { status: 400 });
    }
    const progress = await getStudentProgress(id);
    if (!progress) {
      return NextResponse.json({
        completed: 0,
        total: allActivities.length,
        correctCount: 0,
        withCorrect: 0,
        activities: [],
        stars: 0,
      });
    }
    const completed = progress.filter((p) => p.completed).length;
    const withCorrect = progress.filter((p) => p.correct != null).length;
    const correctCount = progress.filter((p) => p.correct === true).length;
    const stars = Math.floor((correctCount / Math.max(withCorrect, 1)) * 5);
    return NextResponse.json({
      completed,
      total: allActivities.length,
      correctCount,
      withCorrect,
      activities: progress,
      stars: Math.min(5, Math.max(0, stars)),
    });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener progreso" },
      { status: 500 }
    );
  }
}
