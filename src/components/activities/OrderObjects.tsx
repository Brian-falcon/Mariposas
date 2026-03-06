"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function OrderObjects({ activity }: { activity: Activity }) {
  const data = activity.data as {
    items: string[];
    order?: "asc";
    correctOrder?: string[];
  };
  const correctOrder = data.correctOrder || data.items;
  const [order, setOrder] = useState<string[]>(
    [...data.items].sort(() => Math.random() - 0.5)
  );
  const [result, setResult] = useState<boolean | null>(null);

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

  if (result !== null) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">{result ? "¡Perfecto! 🎉" : "Intenta ordenar de nuevo"}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
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
