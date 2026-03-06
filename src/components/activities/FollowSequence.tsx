"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function FollowSequence({ activity }: { activity: Activity }) {
  const data = activity.data as {
    pattern: string[];
    colors?: string[];
    shapes?: string[];
    nextCorrect: string;
  };
  const [result, setResult] = useState<boolean | null>(null);

  const options = data.colors
    ? [...new Set(data.pattern.map((p, i) => data.colors![data.pattern.indexOf(p)]))]
    : [...new Set(data.pattern)];

  if (result !== null) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">{result ? "¡Correcto! 🎉" : "Intenta de nuevo"}</p>
      </div>
    );
  }

  const getDisplay = (item: string) => {
    if (data.colors) {
      const idx = data.pattern.indexOf(item);
      return (
        <div
          className="w-16 h-16 rounded-full"
          style={{ backgroundColor: data.colors[idx] }}
        />
      );
    }
    return <span className="text-4xl">{item}</span>;
  };

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">¿Qué sigue en la secuencia?</p>
      <div className="flex justify-center gap-4 mb-8">
        {data.pattern.map((p, i) => (
          <div key={i}>{getDisplay(p)}</div>
        ))}
        <span className="text-4xl flex items-center">?</span>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {data.colors
          ? options.map((c, i) => {
              const patternItem = data.pattern[
                data.colors!.indexOf(c as string)
              ];
              return (
                <button
                  key={i}
                  onClick={() => setResult(patternItem === data.nextCorrect)}
                  className="w-20 h-20 rounded-full border-4 border-gray-300"
                  style={{ backgroundColor: c as string }}
                  aria-label={patternItem}
                />
              );
            })
          : options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setResult(opt === data.nextCorrect)}
                className="px-8 py-4 text-3xl rounded-xl bg-primary-100 hover:bg-primary-200"
              >
                {opt}
              </button>
            ))}
      </div>
    </div>
  );
}
