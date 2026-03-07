"use client";

import { useState } from "react";
import { Activity } from "@/types";

type EmojiPuzzleData = {
  pieces: number;
  image: string;
};

export function EmojiPuzzle({ activity }: { activity: Activity }) {
  const data = activity.data as EmojiPuzzleData;
  const count = data.pieces || 4;
  const emoji = data.image || "🧩";
  const size = Math.ceil(Math.sqrt(count));
  const [order, setOrder] = useState(
    Array.from({ length: count }, (_, i) => i).sort(() => Math.random() - 0.5)
  );
  const [lastClicked, setLastClicked] = useState<number | null>(null);

  const swap = (i: number, j: number) => {
    const newOrder = [...order];
    [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
    setOrder(newOrder);
    setLastClicked(null);
  };

  const handleClick = (idx: number) => {
    if (lastClicked === null) setLastClicked(idx);
    else if (lastClicked === idx) setLastClicked(null);
    else swap(lastClicked, idx);
  };

  const correct = order.every((v, i) => v === i);

  if (correct) {
    return (
      <div className="p-4 md:p-6 text-center">
        <p className="text-2xl md:text-4xl font-bold text-primary-700 mb-4 md:mb-6">¡Puzzle completado! 🎉</p>
        <div
          className="grid gap-2 md:gap-3 mx-auto max-w-[200px] xs:max-w-[260px] sm:max-w-[320px] mb-4 md:mb-6"
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        >
          {Array.from({ length: count }, (_, i) => (
            <div
              key={i}
              className="aspect-square min-h-[50px] md:min-h-[70px] flex items-center justify-center text-3xl md:text-5xl rounded-xl border-2 border-primary-300"
              style={{ backgroundColor: "var(--color-soft-blue, #e8f4f8)" }}
            >
              {emoji}
            </div>
          ))}
        </div>
        <p className="text-lg text-gray-600">¡Lo armaste muy bien!</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <p className="text-lg md:text-xl text-center mb-4 md:mb-6">
        Ordena las piezas (toca dos para intercambiar)
      </p>
      <div
        className="grid gap-1.5 sm:gap-2 md:gap-3 mx-auto max-w-[200px] xs:max-w-[260px] sm:max-w-[300px] md:max-w-[360px]"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {order.map((pieceIdx, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`aspect-square rounded-lg md:rounded-xl transition-all min-h-[50px] xs:min-h-[60px] sm:min-h-[70px] md:min-h-[90px] flex flex-col items-center justify-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl ${
              lastClicked === i ? "ring-4 ring-primary-500 scale-105" : ""
            }`}
            style={{ backgroundColor: "var(--color-soft-blue, #e8f4f8)" }}
          >
            <span>{emoji}</span>
            <span className="text-xs font-bold text-primary-600 mt-0.5">{pieceIdx + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
