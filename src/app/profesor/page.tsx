"use client";

import { useState, useMemo } from "react";
import { categories } from "@/data/categories";

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

type SortOption = "nombre" | "completadas" | "ultimo" | "tiempo" | "aciertos";

export default function ProfesorPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    students: StudentData[];
    summary: Summary[];
  } | null>(null);

  // Filtros
  const [filterStudent, setFilterStudent] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("nombre");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchData();
  };

  const handleRefresh = () => {
    fetchData();
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

  const formatTimeLong = (sec: number) => {
    if (sec < 60) return `${sec} seg`;
    const min = Math.floor(sec / 60);
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h > 0) return `${h}h ${m} min`;
    return `${m} min`;
  };

  // Datos enriquecidos por alumno (tiempo total, última actividad, % aciertos)
  const enrichedSummary = useMemo(() => {
    if (!data) return [];
    return data.summary.map((s) => {
      const studentData = data.students.find((st) => st.name === s.studentName);
      const activities = studentData?.activities ?? [];
      const totalTime = activities.reduce((sum, a) => sum + (a.time_seconds ?? 0), 0);
      const withCorrect = activities.filter((a) => a.correct != null);
      const correctCount = activities.filter((a) => a.correct === true).length;
      const successRate =
        withCorrect.length > 0
          ? Math.round((correctCount / withCorrect.length) * 100)
          : null;
      const lastActivity = activities
        .filter((a) => a.completed_at)
        .map((a) => new Date(a.completed_at!).getTime())
        .reduce((max, t) => (t > max ? t : max), 0);

      return {
        ...s,
        totalTime,
        successRate,
        lastActivityMs: lastActivity || null,
        failed: activities.filter((a) => a.correct === false).length,
      };
    });
  }, [data]);

  // Resumen por categoría (para el alumno seleccionado o global)
  const categoryStats = useMemo(() => {
    if (!data) return [];
    let activities: Activity[] = [];
    if (filterStudent) {
      const student = data.students.find((s) => s.name === filterStudent);
      activities = student?.activities ?? [];
    } else {
      activities = data.students.flatMap((s) => s.activities);
    }
    const byCat: Record<string, { completed: number; correct: number; total: number }> = {};
    for (const cat of categories) {
      byCat[cat.id] = { completed: 0, correct: 0, total: 0 };
    }
    for (const a of activities) {
      if (a.category && byCat[a.category]) {
        byCat[a.category].total++;
        if (a.completed) byCat[a.category].completed++;
        if (a.correct === true) byCat[a.category].correct++;
      }
    }
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      ...byCat[c.id],
    })).filter((s) => s.total > 0);
  }, [data, filterStudent]);

  // Filtrar y ordenar estudiantes
  const filteredAndSortedSummary = useMemo(() => {
    let list = [...enrichedSummary];

    // Filtro por alumno
    if (filterStudent) {
      list = list.filter((s) => s.studentName === filterStudent);
    }

    // Ordenar
    list.sort((a, b) => {
      switch (sortBy) {
        case "nombre":
          return a.studentName.localeCompare(b.studentName);
        case "completadas":
          return b.completed - a.completed;
        case "ultimo":
          return (b.lastActivityMs ?? 0) - (a.lastActivityMs ?? 0);
        case "tiempo":
          return b.totalTime - a.totalTime;
        case "aciertos":
          return (b.successRate ?? 0) - (a.successRate ?? 0);
        default:
          return 0;
      }
    });

    return list;
  }, [enrichedSummary, filterStudent, sortBy]);

  // Estudiantes filtrados para las tablas
  const filteredStudents = useMemo(() => {
    if (!data) return [];
    let list = data.students;

    if (filterStudent) {
      list = list.filter((s) => s.name === filterStudent);
    }

    return list.map((s) => ({
      ...s,
      activities: s.activities.filter((a) => {
        if (filterCategory && a.category !== filterCategory) return false;
        if (filterDateFrom && a.completed_at) {
          if (new Date(a.completed_at) < new Date(filterDateFrom)) return false;
        }
        if (filterDateTo && a.completed_at) {
          if (new Date(a.completed_at) > new Date(filterDateTo + "T23:59:59")) return false;
        }
        return true;
      }),
    }));
  }, [data, filterStudent, filterCategory, filterDateFrom, filterDateTo]);

  const exportCSV = () => {
    if (!data) return;
    const headers = [
      "Alumno",
      "Actividad",
      "Categoría",
      "Estado",
      "Resultado",
      "Tiempo (seg)",
      "Completado",
    ];
    const rows = data.students.flatMap((s) =>
      s.activities.map((a) => [
        s.name,
        a.activity_title,
        a.category,
        a.completed ? "Completo" : "En curso",
        a.correct === true ? "Correcto" : a.correct === false ? "Falló" : "-",
        a.time_seconds ?? "",
        a.completed_at ? formatDate(a.completed_at) : "-",
      ])
    );
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `progreso-alumnos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
              Ingresa tu correo y contraseña para ver el progreso de los alumnos
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none mb-3"
              autoComplete="email"
              autoFocus
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none mb-4"
              autoComplete="current-password"
            />
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Progreso de los alumnos
        </h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? "Actualizando..." : "🔄 Actualizar"}
          </button>
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-800"
          >
            📥 Exportar CSV
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">Filtros</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Alumno</label>
            <select
              value={filterStudent}
              onChange={(e) => setFilterStudent(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:outline-none"
            >
              <option value="">Todos</option>
              {data?.students?.map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Categoría (en tabla)</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:outline-none"
            >
              <option value="">Todas</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Desde</label>
            <input
              type="date"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Hasta</label>
            <input
              type="date"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Ordenar</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:outline-none"
            >
              <option value="nombre">Por nombre</option>
              <option value="completadas">Por actividades completadas</option>
              <option value="ultimo">Por última actividad</option>
              <option value="tiempo">Por tiempo total</option>
              <option value="aciertos">Por % aciertos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resumen por categoría */}
      {categoryStats.length > 0 && (
        <div className="bg-white rounded-xl shadow p-4 mb-6 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">
            Resumen por categoría {filterStudent ? `(${filterStudent})` : "(todos)"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {categoryStats.map((cat) => (
              <div
                key={cat.id}
                className="p-3 rounded-lg bg-gray-50 border border-gray-200"
              >
                <p className="text-lg mb-1">{cat.icon}</p>
                <p className="font-medium text-gray-800 text-sm">{cat.name}</p>
                <p className="text-gray-600 text-xs">
                  {cat.completed} completadas
                  {cat.total > 0 && cat.correct > 0 && (
                    <span className="block text-green-600">
                      {Math.round((cat.correct / cat.total) * 100)}% aciertos
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tarjetas de alumnos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredAndSortedSummary.map((s) => (
            <div
              key={s.studentId}
              className="bg-white rounded-xl shadow p-4 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-lg text-gray-800 mb-3">{s.studentName}</h3>
              <p className="text-gray-600 text-sm">
                Actividades completadas: <strong>{s.completed}</strong> / {s.total}
              </p>
              {s.failed > 0 && (
                <p className="text-red-600 font-semibold mt-1 text-sm">
                  Con errores: {s.failed}
                </p>
              )}
              {s.successRate != null && (
                <p className="text-primary-600 font-semibold mt-1 text-sm">
                  Aciertos: {s.successRate}%
                </p>
              )}
              {s.avgScore != null && (
                <p className="text-primary-600 font-semibold mt-1 text-sm">
                  Promedio: {s.avgScore}%
                </p>
              )}
              <p className="text-gray-500 text-xs mt-2">
                Tiempo total: {formatTimeLong(s.totalTime)}
              </p>
              <p className="text-gray-500 text-xs">
                Última actividad: {s.lastActivityMs ? formatDate(new Date(s.lastActivityMs).toISOString()) : "-"}
              </p>
            </div>
          ))}
        </div>

      {/* Tablas detalladas */}
      <div className="space-y-8">
        {filteredStudents.map((s) => (
          <div key={s.slug} className="bg-white rounded-xl shadow overflow-hidden">
            <div className="bg-primary-100 px-4 py-3 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{s.name}</h2>
              <span className="text-sm text-gray-600">
                {s.activities.length} actividades mostradas
              </span>
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
                        {filterCategory || filterDateFrom || filterDateTo
                          ? "No hay actividades con los filtros aplicados"
                          : "Sin actividades aún"}
                      </td>
                    </tr>
                  ) : (
                    s.activities.map((a, i) => (
                      <tr
                        key={i}
                        className={`border-b border-gray-100 hover:bg-gray-50 ${
                          a.correct === false ? "bg-red-50" : ""
                        }`}
                      >
                        <td className="py-3 px-4 font-medium">{a.activity_title}</td>
                        <td className="py-3 px-4 text-gray-600 capitalize">{a.category}</td>
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
                          {a.score != null ? (
                            `${a.score}%`
                          ) : a.correct != null ? (
                            a.correct ? (
                              <span className="text-green-600 font-bold">✓ Correcto</span>
                            ) : (
                              <span className="text-red-600 font-bold">✗ Falló</span>
                            )
                          ) : (
                            "-"
                          )}
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
