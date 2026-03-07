"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { useActivityReport } from "@/context/ActivityReportContext";
import { ActivityFeedback } from "./ActivityFeedback";

type Round = { items: string[]; answer: number; label?: string };

export function CountObjects({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as { items?: string[]; answer?: number; rounds?: Round[] };
  const rounds: Round[] = data.rounds ?? (data.items ? [{ items: data.items, answer: data.answer! }] : []);
  const [currentRound, setCurrentRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  useEffect(() => {
    if (showCorrect && currentRound >= rounds.length - 1) {
      report?.reportComplete({ correct: true });
    }
  }, [showCorrect, currentRound, rounds.length, report]);

  const round = rounds[currentRound];
  if (!round) return null;

  const options = [round.answer - 1, round.answer, round.answer + 1].filter((n) => n >= 0);
  const uniqueOptions = Array.from(new Set(options)).sort((a, b) => a - b);

  const handleCorrect = () => {
    setShowCorrect(true);
  };

  const handleNext = () => {
    setShowCorrect(false);
    setSelected(null);
    setCurrentRound(currentRound + 1);
  };

  // Respuesta incorrecta: mostrar cruz roja y permitir reintentar
  if (selected !== null && selected !== round.answer && !showCorrect) {
    return (
      <ActivityFeedback
        correct={false}
        message={`Hay ${round.answer} elementos. ¡Cuenta de nuevo!`}
        onRetry={() => setSelected(null)}
      />
    );
  }

  if (showCorrect || selected === round.answer) {
    const isLast = currentRound >= rounds.length - 1;
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-5xl text-green-600">✓</span>
        </div>
        <p className="text-3xl font-bold text-green-700 mb-4">¡Correcto! 🎉</p>
        <p className="text-xl text-green-600 mb-6">
          Hay {round.answer} elementos
        </p>
        {isLast ? (
          <p className="text-lg text-gray-600">¡Completaste todas las preguntas!</p>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-4 text-xl font-bold rounded-xl bg-primary-500 text-white hover:bg-primary-600"
          >
            Siguiente pregunta →
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-lg text-center text-gray-500 mb-2">
        Pregunta {currentRound + 1} de {rounds.length}
      </p>
      <p className="text-xl text-center mb-6">
        {round.label ? `¿Cuántos ${round.label} hay?` : "¿Cuántos hay?"}
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {round.items.map((item, i) => (
          <span key={i} className="text-5xl">
            {item}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {uniqueOptions.map((n) => (
          <button
            key={n}
            onClick={() => {
              setSelected(n);
              if (n === round.answer) handleCorrect();
            }}
            className="w-20 h-20 text-3xl font-bold rounded-xl bg-primary-100 hover:bg-primary-200"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
