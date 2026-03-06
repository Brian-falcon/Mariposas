"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function RecognizeLetters({ activity }: { activity: Activity }) {
  const data = activity.data as { targetLetter: string; options: string[] };
  const [result, setResult] = useState<boolean | null>(null);

  if (result !== null) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">{result ? "¡Correcto! 🎉" : "Intenta de nuevo"}</p>
        <p className="text-xl">{result ? "Muy bien" : `La letra es: ${data.targetLetter}`}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">
        Encuentra la letra <span className="text-4xl font-bold text-primary-600">{data.targetLetter}</span>
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setResult(opt === data.targetLetter)}
            className="w-20 h-20 text-4xl font-bold rounded-xl bg-primary-100 hover:bg-primary-200"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
