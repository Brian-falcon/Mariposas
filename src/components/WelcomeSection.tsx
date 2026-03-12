"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePersonalization } from "@/context/PersonalizationContext";
import { allActivities } from "@/data/activities";

type ProgressData = {
  completed: number;
  total: number;
  correctCount: number;
  withCorrect: number;
  stars: number;
} | null;

const BADGES = [
  { min: 5, emoji: "🌟", label: "Principiante" },
  { min: 10, emoji: "⭐", label: "Explorador" },
  { min: 25, emoji: "🏆", label: "Aventurero" },
  { min: 50, emoji: "👑", label: "Campeón" },
  { min: 100, emoji: "🎯", label: "¡Completado!" },
];

export function WelcomeSection() {
  const { student } = useAuth();
  const { avatar } = usePersonalization();
  const [progress, setProgress] = useState<ProgressData>(null);

  useEffect(() => {
    if (!student || student.slug === "invitado") {
      setProgress(null);
      return;
    }
    fetch(`/api/student-progress?studentId=${student.id}`)
      .then((res) => res.json())
      .then((data) =>
        setProgress({
          completed: data.completed ?? 0,
          total: data.total ?? allActivities.length,
          correctCount: data.correctCount ?? 0,
          withCorrect: data.withCorrect ?? 0,
          stars: data.stars ?? 0,
        })
      )
      .catch(() => setProgress(null));
  }, [student]);

  const name = student?.name && student.slug !== "invitado" ? student.name.split(" ")[0] : null;
  const totalActivities = allActivities.length;
  const earnedBadges = progress
    ? BADGES.filter((b) => progress.completed >= Math.min(b.min, progress.total))
    : [];
  const canDownloadCertificate = progress && progress.completed >= 10;

  return (
    <section className="text-center mb-8 sm:mb-12" aria-labelledby="welcome-heading">
      <h1
        id="welcome-heading"
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-700 mb-3 sm:mb-4"
      >
        {name ? `¡Hola, ${name}! ${avatar}` : `¡Bienvenido a Mariposas! ${avatar}`}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-4">
        {name
          ? "Sigue aprendiendo jugando. Elige una categoría para comenzar."
          : `Plataforma educativa con ${totalActivities} actividades para aprender jugando. Elige una categoría para comenzar.`}
      </p>

      {progress && progress.total > 0 && (
        <div className="space-y-4 mb-6">
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg border-2 border-primary-100"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary-600">{progress.completed}</span>
              <span className="text-gray-600">actividades completadas</span>
            </div>
            <div className="h-px sm:h-8 sm:w-px bg-gray-200" aria-hidden />
            <div className="flex items-center gap-1" aria-label={`${progress.stars} estrellas de 5`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="text-2xl sm:text-3xl"
                  role="img"
                  aria-hidden
                >
                  {i <= progress.stars ? "⭐" : "☆"}
                </span>
              ))}
            </div>
            <div className="w-full sm:w-48">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (progress.completed / progress.total) * 100)}%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {progress.completed} / {progress.total} actividades
              </p>
            </div>
          </div>
          {earnedBadges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {earnedBadges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-primary-50 rounded-full text-primary-700 font-medium"
                  title={b.label}
                >
                  <span className="text-2xl">{b.emoji}</span>
                  <span>{b.label}</span>
                </span>
              ))}
            </div>
          )}
          {canDownloadCertificate && (
            <a
              href="/certificado"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
            >
              🏅 Descargar certificado
            </a>
          )}
        </div>
      )}
    </section>
  );
}
