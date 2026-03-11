"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { ActivityFeedback } from "./ActivityFeedback";
import { useActivityReport } from "@/context/ActivityReportContext";

type Round = {
  pattern: string[];
  colors?: string[];
  shapes?: string[];
  nextCorrect: string;
};

export function FollowSequence({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const raw = activity.data as Round & { rounds?: Round[] };
  const rounds: Round[] = raw.rounds ?? [raw];
  const [currentRound, setCurrentRound] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);

  const data = rounds[currentRound];

  useEffect(() => {
    if (result !== null && currentRound >= rounds.length - 1) {
      report?.reportComplete({ correct: result });
    }
  }, [result, currentRound, rounds.length, report]);

  const handleNext = () => {
    setResult(null);
    setCurrentRound((c) => c + 1);
  };

  const options = data?.colors
    ? Array.from(new Set(data.pattern.map((p) => data.colors![data.pattern.indexOf(p)])))
    : data
    ? Array.from(new Set(data.pattern))
    : [];

  if (result !== null) {
    return (
      <ActivityFeedback
        correct={result}
        onRetry={!result ? () => setResult(null) : undefined}
        onNext={result && currentRound < rounds.length - 1 ? handleNext : undefined}
        isLast={result && currentRound >= rounds.length - 1}
      />
    );
  }

  if (!data) return null;

  const getDisplay = (item: string) => {
    if (data.colors) {
      const idx = data.pattern.indexOf(item);
      return (
        <div
          className="w-16 h-16 rounded-full"
          style={{ backgroundColor: data.colors[idx] }}
        />
      );
    }
    return <span className="text-4xl">{item}</span>;
  };

  return (
    <div className="p-6">
      {rounds.length > 1 && (
        <p className="text-lg text-center text-gray-500 mb-2">
          Ejercicio {currentRound + 1} de {rounds.length}
        </p>
      )}
      <p className="text-xl text-center mb-6">¿Qué sigue en la secuencia?</p>
      <div className="flex justify-center gap-4 mb-8">
        {data.pattern.map((p, i) => (
          <div key={i}>{getDisplay(p)}</div>
        ))}
        <span className="text-4xl flex items-center">?</span>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {data.colors
          ? options.map((c, i) => {
              const patternItem = data.pattern[data.colors!.indexOf(c as string)];
              return (
                <button
                  key={i}
                  onClick={() => setResult(patternItem === data.nextCorrect)}
                  className="w-20 h-20 rounded-full border-4 border-gray-300"
                  style={{ backgroundColor: c as string }}
                  aria-label={patternItem}
                />
              );
            })
          : options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setResult(opt === data.nextCorrect)}
                className="px-8 py-4 text-3xl rounded-xl bg-primary-100 hover:bg-primary-200"
              >
                {opt}
              </button>
            ))}
      </div>
    </div>
  );
}
