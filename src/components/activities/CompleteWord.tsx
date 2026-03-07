"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { ActivityFeedback } from "./ActivityFeedback";
import { useActivityReport } from "@/context/ActivityReportContext";

type Round = { word: string; hint: string; options: string[]; missingLetterIndex: number };

export function CompleteWord({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as Round & { rounds?: Round[] };
  const rounds: Round[] = data.rounds ?? [data];
  const [currentRound, setCurrentRound] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);

  const round = rounds[currentRound];

  useEffect(() => {
    if (result !== null && currentRound >= rounds.length - 1) {
      report?.reportComplete({ correct: result });
    }
  }, [result, currentRound, rounds.length, report]);

  if (!round) return null;

  const handleNext = () => {
    setResult(null);
    setCurrentRound(currentRound + 1);
  };

  if (result !== null) {
    const isLast = currentRound >= rounds.length - 1;
    return (
      <ActivityFeedback
        correct={result}
        message={!result ? `La palabra correcta es: ${round.word}` : undefined}
        onRetry={!result ? () => setResult(null) : undefined}
        onNext={result && !isLast ? handleNext : undefined}
        isLast={result && isLast}
      />
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
