"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function FindDifference({ activity }: { activity: Activity }) {
  const data = activity.data as {
    items: string[];
    differentIndex: number;
    colors?: string[];
  };
  const [result, setResult] = useState<boolean | null>(null);

  const handleSelect = (i: number) => {
    setResult(i === data.differentIndex);
  };

  if (result !== null) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">{result ? "¡Muy bien! 🎉" : "Intenta de nuevo"}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">¿Cuál es diferente?</p>
      <div className="flex flex-wrap justify-center gap-4">
        {data.items.map((item, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`w-24 h-24 flex items-center justify-center rounded-2xl text-5xl transition-all hover:scale-110 ${
              data.colors ? "" : "bg-primary-100"
            }`}
            style={data.colors ? { backgroundColor: data.colors[i] } : {}}
          >
            {!data.colors && item}
          </button>
        ))}
      </div>
    </div>
  );
}
