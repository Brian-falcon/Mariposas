"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { useActivityReport } from "@/context/ActivityReportContext";
import { ActivityFeedback } from "./ActivityFeedback";

type Round = { targetColor: string; colorHex: string; options: string[]; colorOptions: string[] };

export function RecognizeColors({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as Round & { rounds?: Round[] };
  const rounds: Round[] = data.rounds ?? [data];
  const [currentRound, setCurrentRound] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    if (result !== null && currentRound >= rounds.length - 1) {
      report?.reportComplete({ correct: result });
    }
  }, [result, currentRound, rounds.length, report]);

  const round = rounds[currentRound];
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
        message={!result ? `El color correcto es: ${round.targetColor}` : undefined}
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
