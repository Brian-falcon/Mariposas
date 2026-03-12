"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function CertificadoPage() {
  const { student } = useAuth();
  const [progress, setProgress] = useState<{ completed: number; total: number } | null>(null);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!student || student.slug === "invitado") return;
    fetch(`/api/student-progress?studentId=${student.id}`)
      .then((res) => res.json())
      .then((data) =>
        setProgress({
          completed: data.completed ?? 0,
          total: data.total ?? 0,
        })
      )
      .catch(() => setProgress(null));
  }, [student]);

  const handlePrint = () => {
    window.print();
  };

  const name = student?.name && student.slug !== "invitado" ? student.name : "Estudiante";
  const percentage = progress && progress.total > 0
    ? Math.round((progress.completed / progress.total) * 100)
    : 0;

  if (student?.slug === "invitado") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-600 mb-4">
          Inicia sesión con tu cuenta para obtener tu certificado.
        </p>
        <Link href="/login" className="text-primary-600 font-bold hover:underline">
          Ir a iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-primary-600 font-medium hover:underline">
          ← Volver al inicio
        </Link>
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 print:hidden"
        >
          Imprimir / Guardar PDF
        </button>
      </div>

      <div
        ref={certRef}
        className="bg-white border-4 border-primary-300 rounded-3xl p-8 sm:p-12 text-center shadow-xl print:border-2 print:shadow-none"
      >
        <p className="text-2xl text-primary-600 font-semibold mb-2">Certificado de logros</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-700 mb-4">
          🦋 Mariposas
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Se certifica que
        </p>
        <p className="text-3xl sm:text-4xl font-bold text-primary-700 mb-8 border-b-2 border-primary-200 pb-4">
          {name}
        </p>
        <p className="text-lg text-gray-600 mb-4">
          ha completado {progress?.completed ?? 0} actividades ({percentage}%)
        </p>
        <p className="text-gray-500">
          en la plataforma educativa Mariposas - Aprendiendo jugando
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <span className="text-4xl">🌟</span>
          <span className="text-4xl">⭐</span>
          <span className="text-4xl">🏆</span>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4 print:hidden">
        Usa &quot;Imprimir&quot; y elige &quot;Guardar como PDF&quot; para descargar tu certificado.
      </p>
    </div>
  );
}
