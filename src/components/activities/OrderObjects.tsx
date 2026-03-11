"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { ActivityFeedback } from "./ActivityFeedback";
import { useActivityReport } from "@/context/ActivityReportContext";

type Round = {
  items: string[];
  order?: "asc";
  correctOrder?: string[];
};

export function OrderObjects({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const raw = activity.data as Round & { rounds?: Round[] };
  const rounds: Round[] = raw.rounds ?? [raw];
  const [currentRound, setCurrentRound] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);

  const data = rounds[currentRound];
  const correctOrder = data?.correctOrder ?? data?.items ?? [];
  const [order, setOrder] = useState<string[]>(() => {
    const d = rounds[0];
    return d?.items ? [...d.items].sort(() => Math.random() - 0.5) : [];
  });

  useEffect(() => {
    if (data?.items) {
      setOrder([...data.items].sort(() => Math.random() - 0.5));
    }
  }, [currentRound, data?.items]);

  useEffect(() => {
    if (result !== null && currentRound >= rounds.length - 1) {
      report?.reportComplete({ correct: result });
    }
  }, [result, currentRound, rounds.length, report]);

  const move = (from: number, to: number) => {
    const newOrder = [...order];
    const [removed] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, removed);
    setOrder(newOrder);
  };

  const check = () => {
    const correct = order.every((v, i) => v === correctOrder[i]);
    setResult(correct);
  };

  const handleNext = () => {
    setResult(null);
    setCurrentRound((c) => c + 1);
  };

  if (result !== null) {
    return (
      <ActivityFeedback
        correct={result}
        correctMessage="¡Perfecto! 🎉"
        onRetry={!result ? () => setResult(null) : undefined}
        onNext={result && currentRound < rounds.length - 1 ? handleNext : undefined}
        isLast={result && currentRound >= rounds.length - 1}
      />
    );
  }

  if (!data || order.length === 0) return null;

  return (
    <div className="p-6">
      {rounds.length > 1 && (
        <p className="text-lg text-center text-gray-500 mb-2">
          Ejercicio {currentRound + 1} de {rounds.length}
        </p>
      )}
      <p className="text-xl text-center mb-6">
        Ordena de menor a mayor (usa las flechas)
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {order.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span className="text-5xl">{item}</span>
            <div className="flex gap-2">
              <button
                onClick={() => i > 0 && move(i, i - 1)}
                disabled={i === 0}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                ←
              </button>
              <button
                onClick={() => i < order.length - 1 && move(i, i + 1)}
                disabled={i === order.length - 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                →
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={check}
          className="px-8 py-4 text-xl font-bold rounded-xl bg-green-500 text-white hover:bg-green-600"
        >
          Verificar
        </button>
      </div>
    </div>
  );
}
