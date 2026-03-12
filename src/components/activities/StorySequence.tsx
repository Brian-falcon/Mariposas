"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { ActivityFeedback } from "./ActivityFeedback";
import { useActivityReport } from "@/context/ActivityReportContext";

export function StorySequence({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as { panels: string[] };
  const panels = data.panels ?? [];
  const correctOrder = [...panels];
  const [order, setOrder] = useState<string[]>(() => [...panels].sort(() => Math.random() - 0.5));
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    if (result !== null) {
      report?.reportComplete({ correct: result });
    }
  }, [result, report]);

  const move = (from: number, to: number) => {
    if (result !== null) return;
    const newOrder = [...order];
    const [removed] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, removed);
    setOrder(newOrder);
  };

  const check = () => {
    const correct = order.every((v, i) => v === correctOrder[i]);
    setResult(correct);
  };

  if (result !== null) {
    return (
      <ActivityFeedback
        correct={result}
        correctMessage="¡Historia en orden! 🎉"
        onRetry={!result ? () => setResult(null) : undefined}
        isLast={true}
      />
    );
  }

  if (panels.length === 0) return null;

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-8">
        Ordena la historia. ¿Qué viene primero, después y al final?
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-8">
        {order.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span className="text-4xl sm:text-5xl p-4 bg-primary-50 rounded-2xl min-w-[120px] text-center">
              {item}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => i > 0 && move(i, i - 1)}
                disabled={i === 0}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                aria-label="Mover a la izquierda"
              >
                ←
              </button>
              <button
                onClick={() => i < order.length - 1 && move(i, i + 1)}
                disabled={i === order.length - 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                aria-label="Mover a la derecha"
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
          Verificar orden
        </button>
      </div>
    </div>
  );
}
