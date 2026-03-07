"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [students, setStudents] = useState<{ id: number; name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/login")
      .then((res) => res.json())
      .then((data) => {
        setStudents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setStudents([]);
        setLoading(false);
        setError("No se pudo cargar la lista. ¿Configuraste la base de datos?");
      });
  }, []);

  const handleSelect = async (student: { id: number; name: string; slug: string }) => {
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id }),
      });
      const data = await res.json();
      if (data.ok) {
        login(student);
        router.push("/");
      } else {
        setError("Error al iniciar sesión");
      }
    } catch {
      login(student);
      router.push("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
            Mariposas 🦋
          </h1>
          <p className="text-lg text-gray-600">
            ¿Quién va a jugar hoy?
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Cargando...</div>
        ) : students.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800 mb-2">{error || "No hay alumnos cargados."}</p>
            <p className="text-sm text-amber-700 mb-4">
              Configura la base de datos Neon y ejecuta el schema.
            </p>
            <button
              onClick={() => {
                login({ id: 0, name: "Invitado", slug: "invitado" });
                router.push("/");
              }}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
            >
              Continuar sin guardar progreso
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {students.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelect(s)}
                className="py-4 px-4 rounded-xl bg-white border-2 border-primary-200 hover:border-primary-500 hover:bg-primary-50 font-semibold text-gray-800 transition-all text-center shadow-sm"
              >
                {s.name}
              </button>
            ))}
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-8">
          El profesor puede ver el progreso en{" "}
          <a href="/profesor" className="text-primary-600 font-semibold hover:underline">
            Panel del profesor
          </a>
        </p>
      </div>
    </div>
  );
}
