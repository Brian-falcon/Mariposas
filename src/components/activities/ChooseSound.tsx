"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function ChooseSound({ activity }: { activity: Activity }) {
  const data = activity.data as {
    correctSound: string;
    options: string[];
    emojis: string[];
  };
  const [result, setResult] = useState<boolean | null>(null);

  if (result !== null) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">{result ? "¡Correcto! 🎉" : "Intenta de nuevo"}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">¿Qué sonido escuchas?</p>
      <p className="text-6xl text-center mb-8">🔊</p>
      <div className="flex flex-wrap justify-center gap-4">
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setResult(opt === data.correctSound)}
            className="flex flex-col items-center gap-2 px-8 py-6 rounded-2xl bg-primary-100 hover:bg-primary-200"
          >
            <span className="text-5xl">{data.emojis[i]}</span>
            <span className="text-xl font-bold capitalize">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
