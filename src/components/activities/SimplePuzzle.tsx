"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function SimplePuzzle({ activity }: { activity: Activity }) {
  const data = activity.data as { pieces: number; image: string };
  const [order, setOrder] = useState(
    Array.from({ length: data.pieces }, (_, i) => i).sort(() => Math.random() - 0.5)
  );
  const [lastClicked, setLastClicked] = useState<number | null>(null);

  const swap = (i: number, j: number) => {
    const newOrder = [...order];
    [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
    setOrder(newOrder);
    setLastClicked(null);
  };

  const handleClick = (i: number) => {
    if (lastClicked === null) {
      setLastClicked(i);
    } else if (lastClicked === i) {
      setLastClicked(null);
    } else {
      swap(lastClicked, i);
    }
  };

  const correct = order.every((v, idx) => v === idx);
  const size = Math.ceil(Math.sqrt(data.pieces));
  if (correct) {
    return (
      <div className="p-6 text-center">
        <p className="text-2xl md:text-4xl font-bold text-primary-700 mb-4 md:mb-6">¡Puzzle completo! 🎉</p>
        <div
          className="grid gap-2 md:gap-3 mx-auto max-w-[200px] sm:max-w-[280px] mb-4 md:mb-6"
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        >
          {Array.from({ length: data.pieces }, (_, i) => (
            <div
              key={i}
              className="aspect-square text-4xl md:text-6xl flex items-center justify-center rounded-xl bg-primary-100 border-2 border-primary-300"
            >
              {data.image}
            </div>
          ))}
        </div>
        <p className="text-lg text-gray-600">¡Lo armaste muy bien!</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">
        Ordena las piezas (toca dos para intercambiarlas)
      </p>
      <div
        className="grid gap-3 mx-auto max-w-sm"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {order.map((pieceIdx, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`aspect-square text-4xl md:text-5xl flex flex-col items-center justify-center rounded-xl transition-all relative ${
              lastClicked === i ? "ring-4 ring-primary-500 bg-primary-200 scale-105" : "bg-primary-100 hover:bg-primary-200"
            }`}
          >
            <span>{data.image}</span>
            <span className="text-xs md:text-sm font-bold text-primary-600 mt-0.5">{pieceIdx + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
