"use client";

import { useState } from "react";
import { Activity } from "@/types";

type Round = { group1: string[]; group2: string[]; answer: number };

export function AddImages({ activity }: { activity: Activity }) {
  const data = activity.data as {
    group1?: string[];
    group2?: string[];
    answer?: number;
    rounds?: Round[];
  };
  const rounds: Round[] = data.rounds ?? (data.group1 ? [{ group1: data.group1, group2: data.group2!, answer: data.answer! }] : []);
  const [currentRound, setCurrentRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const round = rounds[currentRound];
  if (!round) return null;

  const options = [round.answer - 1, round.answer, round.answer + 1].filter((n) => n >= 0);
  const uniqueOptions = Array.from(new Set(options)).sort((a, b) => a - b);

  const handleNext = () => {
    setShowCorrect(false);
    setSelected(null);
    setCurrentRound(currentRound + 1);
  };

  if (showCorrect || selected === round.answer) {
    const isLast = currentRound >= rounds.length - 1;
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Muy bien! 🎉</p>
        <p className="text-xl text-green-600 mb-6">
          {round.group1.length} + {round.group2.length} = {round.answer}
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
      <p className="text-xl text-center mb-6">¿Cuánto es en total?</p>
      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="flex gap-2">
          {round.group1.map((item, i) => (
            <span key={i} className="text-5xl">{item}</span>
          ))}
        </div>
        <span className="text-3xl">+</span>
        <div className="flex gap-2">
          {round.group2.map((item, i) => (
            <span key={i} className="text-5xl">{item}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {uniqueOptions.map((n) => (
          <button
            key={n}
            onClick={() => {
              setSelected(n);
              if (n === round.answer) setShowCorrect(true);
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
