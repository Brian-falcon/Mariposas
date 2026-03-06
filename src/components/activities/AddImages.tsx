"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function AddImages({ activity }: { activity: Activity }) {
  const data = activity.data as {
    group1: string[];
    group2: string[];
    answer: number;
  };
  const [selected, setSelected] = useState<number | null>(null);

  const options = [data.answer - 1, data.answer, data.answer + 1].filter(
    (n) => n >= 0
  );
  const uniqueOptions = Array.from(new Set(options)).sort((a, b) => a - b);

  if (selected === data.answer) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Muy bien! 🎉</p>
        <p className="text-xl text-green-600">
          {data.group1.length} + {data.group2.length} = {data.answer}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">¿Cuánto es en total?</p>
      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="flex gap-2">
          {data.group1.map((item, i) => (
            <span key={i} className="text-5xl">
              {item}
            </span>
          ))}
        </div>
        <span className="text-3xl">+</span>
        <div className="flex gap-2">
          {data.group2.map((item, i) => (
            <span key={i} className="text-5xl">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {uniqueOptions.map((n) => (
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
