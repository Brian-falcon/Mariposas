"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { ActivityFeedback } from "./ActivityFeedback";
import { useActivityReport } from "@/context/ActivityReportContext";

type Round = { items: string[]; correctIndex: number };

export function OddOneOut({ activity }: { activity: Activity }) {
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

  const handleSelect = (index: number) => {
    if (result !== null) return;
    setSelected(index);
    setResult(index === round.correctIndex);
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
        correctMessage="¡Muy bien! Encontraste el intruso 👏"
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
      <p className="text-xl text-center mb-8">
        ¿Cuál no pertenece al grupo? Toca el que es diferente
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {round.items.map((item, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`w-24 h-24 text-5xl flex items-center justify-center rounded-2xl transition-all ${
              selected === i ? "ring-4 ring-primary-500 bg-primary-200" : "bg-primary-100 hover:bg-primary-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
