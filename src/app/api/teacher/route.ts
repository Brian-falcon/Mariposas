import { NextRequest, NextResponse } from "next/server";
import { getProgressReport, verifyTeacherPassword } from "@/lib/db";
import { allActivities } from "@/data/activities";

const TOTAL_ACTIVITIES = allActivities.length;

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    if (!verifyTeacherPassword(password || "")) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }
    const report = await getProgressReport();
    const summary = (report.summary || []).map((s: { total?: number }) => ({
      ...s,
      total: TOTAL_ACTIVITIES,
    }));
    return NextResponse.json({ ...report, summary });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener datos" },
      { status: 500 }
    );
  }
}
