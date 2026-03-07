"use client";

import { useState } from "react";
import { Activity } from "@/types";
import { useActivityReport } from "@/context/ActivityReportContext";

export function MatchImageWord({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as { pairs: { image: string; word: string }[] };
  const [selected, setSelected] = useState<{ image: string; word: string } | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const words = data.pairs.map((p) => p.word).sort(() => Math.random() - 0.5);

  const handleImageClick = (pair: { image: string; word: string }) => {
    if (matched.includes(pair.word)) return;
    if (selected?.word === pair.word) {
      setMatched([...matched, pair.word]);
      setSelected(null);
    } else {
      setSelected(pair);
    }
  };

  const handleWordClick = (word: string) => {
    const pair = data.pairs.find((p) => p.word === word);
    if (!pair || matched.includes(word)) return;
    if (selected?.word === word) {
      setMatched([...matched, word]);
      setSelected(null);
    } else {
      setSelected(pair);
    }
  };

  if (matched.length === data.pairs.length) {
    report?.reportComplete({ correct: true });
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Excelente! 🎉</p>
        <p className="text-xl text-green-600">Uniste todas correctamente</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">Une cada imagen con su palabra</p>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="flex flex-wrap gap-4 justify-center">
          {data.pairs.map((p, i) => (
            <button
              key={i}
              onClick={() => handleImageClick(p)}
              className={`w-28 h-28 text-6xl flex items-center justify-center rounded-2xl transition-all ${
                selected?.word === p.word ? "ring-4 ring-green-500" : "bg-primary-100"
              } ${matched.includes(p.word) ? "opacity-50" : ""}`}
            >
              {p.image}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {words.map((w) => (
            <button
              key={w}
              onClick={() => handleWordClick(w)}
              className={`px-6 py-3 text-xl font-bold rounded-xl transition-all ${
                selected?.word === w ? "ring-4 ring-green-500 bg-green-100" : "bg-gray-100"
              } ${matched.includes(w) ? "opacity-50" : ""}`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
