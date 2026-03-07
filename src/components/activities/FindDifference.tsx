"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { ActivityFeedback } from "./ActivityFeedback";
import { useActivityReport } from "@/context/ActivityReportContext";

type Round = { items: string[]; differentIndex: number; colors?: string[] };

export function FindDifference({ activity }: { activity: Activity }) {
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
        correctMessage="¡Muy bien! 🎉"
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
