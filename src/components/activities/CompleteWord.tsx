"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function CompleteWord({ activity }: { activity: Activity }) {
  const data = activity.data as {
    word: string;
    hint: string;
    options: string[];
  };
  const [result, setResult] = useState<boolean | null>(null);

  if (result !== null) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">{result ? "¡Correcto! 🎉" : "Intenta de nuevo"}</p>
        <p className="text-2xl">{result ? "La palabra es: " + data.word : "La palabra es: " + data.word}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">Completa la palabra</p>
      <p className="text-5xl font-bold text-center mb-8 tracking-widest">{data.hint}</p>
      <div className="flex flex-wrap justify-center gap-4">
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setResult(opt === data.word[data.missingLetterIndex])}
            className="w-20 h-20 text-4xl font-bold rounded-xl bg-primary-100 hover:bg-primary-200"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
