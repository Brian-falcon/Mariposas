"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function IdentifyShapes({ activity }: { activity: Activity }) {
  const data = activity.data as { shape: string; shapeEmoji: string; options: string[] };
  const [result, setResult] = useState<boolean | null>(null);

  const handleSelect = (opt: string) => {
    setResult(opt === data.shape);
  };

  if (result !== null) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">{result ? "¡Correcto! 🎉" : "Intenta de nuevo"}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">¿Qué forma es esta?</p>
      <div className="text-8xl text-center mb-8">{data.shapeEmoji}</div>
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
