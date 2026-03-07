"use client";

import { useState } from "react";
import { Activity } from "@/types";

type Round = { word: string; hint: string; options: string[]; missingLetterIndex: number };

export function CompleteWord({ activity }: { activity: Activity }) {
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
        <p className="text-xl mb-6">La palabra es: {round.word}</p>
        {result && !isLast && (
          <button
            onClick={handleNext}
            className="px-8 py-4 text-xl font-bold rounded-xl bg-primary-500 text-white"
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
      <p className="text-xl text-center mb-6">Completa la palabra</p>
      <p className="text-5xl font-bold text-center mb-8 tracking-widest">{round.hint}</p>
      <div className="flex flex-wrap justify-center gap-4">
        {round.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setResult(opt === round.word[round.missingLetterIndex])}
            className="w-20 h-20 text-4xl font-bold rounded-xl bg-primary-100 hover:bg-primary-200"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
