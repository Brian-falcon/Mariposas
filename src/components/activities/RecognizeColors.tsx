"use client";

import { useState } from "react";
import { Activity } from "@/types";

type Round = { targetColor: string; colorHex: string; options: string[]; colorOptions: string[] };

export function RecognizeColors({ activity }: { activity: Activity }) {
  const data = activity.data as Round & { rounds?: Round[] };
  const rounds: Round[] = data.rounds ?? [data];
  const [currentRound, setCurrentRound] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);

  const round = rounds[currentRound];
  if (!round) return null;

  const handleNext = () => {
    setResult(null);
    setCurrentRound(currentRound + 1);
  };

  if (result !== null) {
    const isLast = currentRound >= rounds.length - 1;
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">{result ? "¡Correcto! 🎉" : "Intenta de nuevo"}</p>
        <p className="text-xl mb-6">{result ? "Muy bien" : `El color es: ${round.targetColor}`}</p>
        {!result ? null : isLast ? (
          <p className="text-lg text-gray-600">¡Completaste todas!</p>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-4 text-xl font-bold rounded-xl bg-primary-500 text-white"
          >
            Siguiente →
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
      <p className="text-xl text-center mb-6">¿Qué color es este?</p>
      <div
        className="w-32 h-32 mx-auto rounded-2xl mb-8 border-4 border-gray-300"
        style={{ backgroundColor: round.colorHex }}
      />
      <div className="flex flex-wrap justify-center gap-4">
        {round.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setResult(opt === round.targetColor)}
            className="px-8 py-4 text-xl font-bold rounded-xl bg-primary-100 hover:bg-primary-200 capitalize"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
