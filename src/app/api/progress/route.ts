import { NextRequest, NextResponse } from "next/server";
import { recordProgress } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      studentId,
      activityId,
      activityTitle,
      category,
      completed,
      score,
      correct,
      startedAt,
      completedAt,
      timeSeconds,
    } = body;

    if (!studentId || !activityId || !activityTitle || !category) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    await recordProgress({
      studentId: Number(studentId),
      activityId,
      activityTitle,
      category,
      completed: Boolean(completed),
      score: score != null ? Number(score) : undefined,
      correct: correct != null ? Boolean(correct) : undefined,
      startedAt: startedAt || new Date().toISOString(),
      completedAt: completedAt || new Date().toISOString(),
      timeSeconds: timeSeconds ?? 0,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Error al guardar progreso" },
      { status: 500 }
    );
  }
}
