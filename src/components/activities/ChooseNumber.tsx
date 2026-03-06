"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function ChooseNumber({ activity }: { activity: Activity }) {
  const data = activity.data as {
    items: string[];
    correctAnswer: number;
    options: number[];
  };
  const [selected, setSelected] = useState<number | null>(null);

  if (selected === data.correctAnswer) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Excelente! 🎉</p>
        <p className="text-xl text-green-600">Hay {data.correctAnswer} elementos</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">¿Cuántos hay?</p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {data.items.map((item, i) => (
          <span key={i} className="text-5xl">
            {item}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {data.options.map((n) => (
          <button
            key={n}
            onClick={() => setSelected(n)}
            className="w-20 h-20 text-3xl font-bold rounded-xl bg-primary-100 hover:bg-primary-200"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
