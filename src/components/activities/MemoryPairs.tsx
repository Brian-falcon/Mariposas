"use client";

import { useState, useEffect, useMemo } from "react";
import { Activity } from "@/types";
import { useActivityReport } from "@/context/ActivityReportContext";

export function MemoryPairs({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as { pairs: string[]; gridSize: number };
  const cards = useMemo(
    () => [...data.pairs, ...data.pairs].sort(() => Math.random() - 0.5),
    [data.pairs.join(",")]
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      if (cards[a] === cards[b]) {
        setMatched((m) => [...m, a, b]);
        setFlipped([]);
      } else {
        const timer = setTimeout(() => setFlipped([]), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [flipped, cards]);

  const handleClick = (i: number) => {
    if (flipped.includes(i) || matched.includes(i) || flipped.length >= 2) return;
    setFlipped([...flipped, i]);
  };

  if (matched.length === cards.length) {
    report?.reportComplete({ correct: true });
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Excelente! 🎉</p>
        <p className="text-xl text-green-600">Encontraste todas las parejas</p>
      </div>
    );
  }

  const cols = Math.ceil(Math.sqrt(cards.length));
  return (
    <div className="p-4 md:p-6">
      <p className="text-base md:text-xl text-center mb-4 md:mb-6">Encuentra las parejas iguales</p>
      <div
        className="grid gap-2 md:gap-3 mx-auto max-w-md"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {cards.map((card, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="aspect-square text-4xl flex items-center justify-center rounded-xl transition-all bg-primary-100 hover:bg-primary-200"
            aria-label={flipped.includes(i) || matched.includes(i) ? card : "Carta oculta"}
          >
            {flipped.includes(i) || matched.includes(i) ? card : "❓"}
          </button>
        ))}
      </div>
    </div>
  );
}
