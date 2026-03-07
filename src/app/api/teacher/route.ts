import { NextRequest, NextResponse } from "next/server";
import { getProgressReport, verifyTeacherCredentials } from "@/lib/db";
import { allActivities } from "@/data/activities";

const TOTAL_ACTIVITIES = allActivities.length;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!verifyTeacherCredentials(email || "", password || "")) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrectos" },
        { status: 401 }
      );
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
