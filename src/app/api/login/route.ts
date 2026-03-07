import { NextRequest, NextResponse } from "next/server";
import { getStudents, createSession } from "@/lib/db";

export async function GET() {
  const students = await getStudents();
  return NextResponse.json(students);
}

export async function POST(request: NextRequest) {
  try {
    const { studentId } = await request.json();
    if (!studentId) {
      return NextResponse.json(
        { error: "studentId requerido" },
        { status: 400 }
      );
    }
    const session = await createSession(Number(studentId));
    if (!session) {
      return NextResponse.json(
        { error: "Error al crear sesión" },
        { status: 500 }
      );
    }
    return NextResponse.json({
      ok: true,
      sessionId: session.id,
      studentId: session.student_id,
    });
  } catch {
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
