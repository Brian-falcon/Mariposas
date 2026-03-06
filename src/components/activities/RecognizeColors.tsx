"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function RecognizeColors({ activity }: { activity: Activity }) {
  const data = activity.data as {
    targetColor: string;
    colorHex: string;
    options: string[];
    colorOptions: string[];
  };
  const [result, setResult] = useState<boolean | null>(null);

  const handleSelect = (opt: string) => {
    setResult(opt === data.targetColor);
  };

  if (result !== null) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">{result ? "¡Correcto! 🎉" : "Intenta de nuevo"}</p>
        <p className="text-xl">{result ? "Muy bien" : `El color es: ${data.targetColor}`}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">
        ¿Qué color es este?
      </p>
      <div
        className="w-32 h-32 mx-auto rounded-2xl mb-8 border-4 border-gray-300"
        style={{ backgroundColor: data.colorHex }}
      />
      <div className="flex flex-wrap justify-center gap-4">
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            className="px-8 py-4 text-xl font-bold rounded-xl bg-primary-100 hover:bg-primary-200 capitalize"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
