"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function MatchWordImage({ activity }: { activity: Activity }) {
  const data = activity.data as {
    word: string;
    options: { image: string; correct: boolean }[];
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
      <p className="text-xl text-center mb-6">
        ¿Qué imagen corresponde a &quot;{data.word}&quot;?
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setResult(opt.correct)}
            className="w-32 h-32 text-7xl flex items-center justify-center rounded-2xl bg-primary-100 hover:bg-primary-200 transition-all hover:scale-105"
          >
            {opt.image}
          </button>
        ))}
      </div>
    </div>
  );
}
