"use client";

import { useState, useEffect } from "react";

type Summary = {
  studentId: number;
  studentName: string;
  completed: number;
  total: number;
  avgScore: number | null;
};

type Activity = {
  student_id: number;
  activity_id: string;
  activity_title: string;
  category: string;
  completed: boolean;
  score: number | null;
  correct: boolean | null;
  started_at: string;
  completed_at: string | null;
  time_seconds: number | null;
};

type StudentData = {
  name: string;
  slug: string;
  activities: Activity[];
};

export default function ProfesorPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<{
    students: StudentData[];
    summary: Summary[];
  } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Error");
        return;
      }
      setData(json);
      setAuthenticated(true);
    } catch {
      setError("Error de conexión");
    }
  };

  const formatDate = (d: string | null) => {
    if (!d) return "-";
    const date = new Date(d);
    return date.toLocaleString("es-UY", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (sec: number | null) => {
    if (sec == null) return "-";
    if (sec < 60) return `${sec} seg`;
    return `${Math.floor(sec / 60)} min ${sec % 60} seg`;
  };

  if (!authenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Panel del profesor
            </h1>
            <p className="text-gray-600 mb-6">
              Ingresa la contraseña para ver el progreso de los alumnos
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none mb-4"
              autoFocus
            />
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Progreso de los alumnos
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {data?.summary?.map((s) => (
          <div
            key={s.studentId}
            className="bg-white rounded-xl shadow p-4 border border-gray-200"
          >
            <h3 className="font-bold text-lg text-gray-800 mb-2">{s.studentName}</h3>
            <p className="text-gray-600 text-sm">
              Actividades completadas: {s.completed} / {s.total}
            </p>
            {s.avgScore != null && (
              <p className="text-primary-600 font-semibold mt-1">
                Promedio: {s.avgScore}%
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {data?.students?.map((s) => (
          <div key={s.slug} className="bg-white rounded-xl shadow overflow-hidden">
            <div className="bg-primary-100 px-4 py-3">
              <h2 className="text-xl font-bold text-gray-800">{s.name}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4">Actividad</th>
                    <th className="text-left py-3 px-4">Categoría</th>
                    <th className="text-left py-3 px-4">Estado</th>
                    <th className="text-left py-3 px-4">Calificación</th>
                    <th className="text-left py-3 px-4">Tiempo</th>
                    <th className="text-left py-3 px-4">Completado</th>
                  </tr>
                </thead>
                <tbody>
                  {s.activities.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-gray-500">
                        Sin actividades aún
                      </td>
                    </tr>
                  ) : (
                    s.activities.map((a, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{a.activity_title}</td>
                        <td className="py-3 px-4 text-gray-600">{a.category}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              a.completed
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {a.completed ? "Completo" : "En curso"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {a.score != null
                            ? `${a.score}%`
                            : a.correct != null
                            ? a.correct
                              ? "✓"
                              : "✗"
                            : "-"}
                        </td>
                        <td className="py-3 px-4">
                          {formatTime(a.time_seconds)}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {formatDate(a.completed_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
