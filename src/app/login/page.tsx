"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type Student = { id: number; name: string; slug: string };

export default function LoginPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [matches, setMatches] = useState<Student[] | null>(null);
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
        setError("No se pudo cargar. ¿Configuraste la base de datos?");
      });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMatches(null);
    const search = nameInput.trim().toLowerCase();
    if (!search) return;

    const found = students.filter((s) => s.name.toLowerCase().trim() === search);

    if (found.length === 0) {
      setError("No encontramos a ningún alumno con ese nombre. Escribe tu nombre tal como está registrado.");
      return;
    }
    if (found.length === 1) {
      doLogin(found[0]);
      return;
    }
    // Varios coinciden (ej. "María" y "María José") — mostrar solo esos para elegir
    setMatches(found);
  };

  const doLogin = async (student: Student) => {
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
        login(student);
        router.push("/");
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
            Escribe tu nombre para comenzar
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
                setError("");
                setMatches(null);
              }}
              placeholder="Escribe tu nombre..."
              className="w-full px-4 py-3 text-lg rounded-xl border-2 border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              autoComplete="off"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 text-lg"
            >
              Entrar
            </button>

            {error && (
              <p className="text-amber-700 text-sm text-center bg-amber-50 py-2 px-3 rounded-lg">
                {error}
              </p>
            )}

            {matches && matches.length > 1 && (
              <div className="pt-2">
                <p className="text-sm text-gray-600 mb-2">¿Cuál eres tú?</p>
                <div className="flex flex-col gap-2">
                  {matches.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => doLogin(s)}
                      className="py-3 px-4 rounded-xl bg-white border-2 border-primary-200 hover:border-primary-500 hover:bg-primary-50 font-semibold text-gray-800 transition-all text-left"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
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
