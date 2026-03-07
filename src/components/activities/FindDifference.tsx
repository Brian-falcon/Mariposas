"use client";

import { useState } from "react";
import { Activity } from "@/types";

type Round = { items: string[]; differentIndex: number; colors?: string[] };

export function FindDifference({ activity }: { activity: Activity }) {
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
        <p className="text-4xl mb-4">{result ? "¡Muy bien! 🎉" : "Intenta de nuevo"}</p>
        {result && !isLast && (
          <button
            onClick={handleNext}
            className="mt-4 px-8 py-4 text-xl font-bold rounded-xl bg-primary-500 text-white"
          >
            Siguiente →
          </button>
        )}
        {result && isLast && <p className="text-lg text-gray-600">¡Completaste todas!</p>}
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-lg text-center text-gray-500 mb-2">
        Pregunta {currentRound + 1} de {rounds.length}
      </p>
      <p className="text-xl text-center mb-6">¿Cuál es diferente?</p>
      <div className="flex flex-wrap justify-center gap-4">
        {round.items.map((item, i) => (
          <button
            key={i}
            onClick={() => setResult(i === round.differentIndex)}
            className={`w-24 h-24 flex items-center justify-center rounded-2xl text-5xl transition-all hover:scale-110 ${
              round.colors ? "" : "bg-primary-100"
            }`}
            style={round.colors ? { backgroundColor: round.colors[i] } : {}}
          >
            {!round.colors && item}
          </button>
        ))}
      </div>
    </div>
  );
}
