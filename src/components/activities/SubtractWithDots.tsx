"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { ActivityFeedback } from "./ActivityFeedback";
import { useActivityReport } from "@/context/ActivityReportContext";

type Round = { total: number; subtract: number; answer: number };

export function SubtractWithDots({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as { rounds: Round[] };
  const rounds = data.rounds ?? [];
  const [currentRound, setCurrentRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    if (result !== null && currentRound >= rounds.length - 1) {
      report?.reportComplete({ correct: result });
    }
  }, [result, currentRound, rounds.length, report]);

  const round = rounds[currentRound];
  if (!round) return null;

  const dotsTotal = "•".repeat(round.total);
  const dotsSubtract = "•".repeat(round.subtract);
  const wrongOptions = [round.answer - 2, round.answer - 1, round.answer + 1, round.answer + 2]
    .filter((n) => n >= 0 && n !== round.answer);
  const allOptions = Array.from(new Set([round.answer, ...wrongOptions])).sort((a, b) => a - b);
  const options = allOptions.length >= 3 ? allOptions.slice(0, 4) : [round.answer - 1, round.answer, round.answer + 1].filter((n) => n >= 0);

  const handleSelect = (n: number) => {
    if (result !== null) return;
    setSelected(n);
    setResult(n === round.answer);
  };

  const handleNext = () => {
    setResult(null);
    setSelected(null);
    setCurrentRound((c) => c + 1);
  };

  if (result !== null) {
    const isLast = currentRound >= rounds.length - 1;
    return (
      <ActivityFeedback
        correct={result}
        correctMessage={`¡Muy bien! ${round.total} − ${round.subtract} = ${round.answer} 🎉`}
        onRetry={!result ? () => { setResult(null); setSelected(null); } : undefined}
        onNext={result && !isLast ? handleNext : undefined}
        isLast={result && isLast}
      />
    );
  }

  return (
    <div className="p-6">
      {rounds.length > 1 && (
        <p className="text-lg text-center text-gray-500 mb-2">
          Resta {currentRound + 1} de {rounds.length}
        </p>
      )}
      <p className="text-xl text-center mb-6">
        Cuenta los puntitos. Restamos los de abajo, ¿cuántos quedan?
      </p>
      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="flex flex-wrap justify-center gap-2 min-h-[60px]">
          {dotsTotal.split("").map((d, i) => (
            <span key={i} className="text-4xl sm:text-5xl text-primary-600">•</span>
          ))}
        </div>
        <span className="text-4xl font-bold">−</span>
        <div className="flex flex-wrap justify-center gap-2 min-h-[60px]">
          {dotsSubtract.split("").map((d, i) => (
            <span key={i} className="text-4xl sm:text-5xl text-gray-400">•</span>
          ))}
        </div>
        <span className="text-4xl font-bold">= ?</span>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {options.map((n) => (
          <button
            key={n}
            onClick={() => handleSelect(n)}
            className={`w-20 h-20 text-3xl font-bold rounded-xl transition-all ${
              selected === n ? "bg-primary-500 text-white ring-4 ring-primary-300" : "bg-primary-100 hover:bg-primary-200"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
