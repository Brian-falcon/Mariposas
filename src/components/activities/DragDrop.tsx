"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function DragDrop({ activity }: { activity: Activity }) {
  const data = activity.data as { pairs: { source: string; target: string }[] };
  const [matched, setMatched] = useState<string[]>([]);
  const [selected, setSelected] = useState<{ source: string; target: string } | null>(null);

  const sources = data.pairs.map((p) => p.source);
  const targets = data.pairs.map((p) => p.target).sort(() => Math.random() - 0.5);

  const handleSourceClick = (pair: { source: string; target: string }) => {
    if (matched.includes(pair.target)) return;
    if (selected?.target === pair.target) {
      setMatched([...matched, pair.target]);
      setSelected(null);
    } else {
      setSelected(pair);
    }
  };

  const handleTargetClick = (target: string) => {
    const pair = data.pairs.find((p) => p.target === target);
    if (!pair || matched.includes(target)) return;
    if (selected?.target === target) {
      setMatched([...matched, target]);
      setSelected(null);
    } else {
      setSelected(pair);
    }
  };

  if (matched.length === data.pairs.length) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Excelente! 🎉</p>
        <p className="text-xl text-green-600">Uniste todo correctamente</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">Une cada elemento con su pareja</p>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <div className="flex flex-wrap gap-4 justify-center">
          {data.pairs.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSourceClick(p)}
              className={`w-28 h-28 text-5xl flex items-center justify-center rounded-2xl transition-all ${
                selected?.source === p.source ? "ring-4 ring-green-500" : "bg-primary-100"
              }`}
            >
              {p.source}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {targets.map((t) => (
            <button
              key={t}
              onClick={() => handleTargetClick(t)}
              className={`px-6 py-4 text-2xl font-bold rounded-xl transition-all ${
                selected?.target === t ? "ring-4 ring-green-500 bg-green-100" : "bg-gray-100"
              } ${matched.includes(t) ? "opacity-50" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
