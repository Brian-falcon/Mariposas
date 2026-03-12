"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { ActivityFeedback } from "./ActivityFeedback";
import { useActivityReport } from "@/context/ActivityReportContext";

type Round = { question: string; emoji?: string; options: string[]; correct: string };

export function ChooseOption({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as { rounds: Round[] };
  const rounds = data.rounds ?? [];
  const [currentRound, setCurrentRound] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    if (result !== null && currentRound >= rounds.length - 1) {
      report?.reportComplete({ correct: result });
    }
  }, [result, currentRound, rounds.length, report]);

  const round = rounds[currentRound];
  if (!round) return null;

  const handleSelect = (opt: string) => {
    if (result !== null) return;
    setSelected(opt);
    setResult(opt === round.correct);
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
        correctMessage="¡Excelente! 👍"
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
          Pregunta {currentRound + 1} de {rounds.length}
        </p>
      )}
      <p className="text-xl text-center mb-6">
        {round.question}
      </p>
      {round.emoji && (
        <div className="flex justify-center mb-6">
          <span className="text-6xl" role="img">{round.emoji}</span>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {round.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            className={`px-8 py-4 text-lg font-medium rounded-xl transition-all ${
              selected === opt ? "bg-primary-500 text-white ring-4 ring-primary-300" : "bg-primary-100 hover:bg-primary-200"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
