"use client";

import { useState } from "react";
import { Activity } from "@/types";
import { useActivityReport } from "@/context/ActivityReportContext";

type Round = { items: string[]; correctAnswer: number; options: number[]; label?: string };

export function ChooseNumber({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as {
    items?: string[];
    correctAnswer?: number;
    options?: number[];
    rounds?: Round[];
  };
  const rounds: Round[] = data.rounds ?? (data.items ? [{
    items: data.items,
    correctAnswer: data.correctAnswer!,
    options: data.options!,
  }] : []);
  const [currentRound, setCurrentRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const round = rounds[currentRound];
  if (!round) return null;

  const handleCorrect = () => setShowCorrect(true);

  const handleNext = () => {
    setShowCorrect(false);
    setSelected(null);
    setCurrentRound(currentRound + 1);
  };

  if (showCorrect || selected === round.correctAnswer) {
    const isLast = currentRound >= rounds.length - 1;
    if (isLast) report?.reportComplete({ correct: true });
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Excelente! 🎉</p>
        <p className="text-xl text-green-600 mb-6">Hay {round.correctAnswer} elementos</p>
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
        {round.options.map((n) => (
          <button
            key={n}
            onClick={() => {
              setSelected(n);
              if (n === round.correctAnswer) handleCorrect();
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
