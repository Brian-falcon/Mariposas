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
    } else {
      swap(lastClicked, i);
    }
  };

  const correct = order.every((v, idx) => v === idx);
  if (correct) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Puzzle completo! 🎉</p>
      </div>
    );
  }

  const size = Math.ceil(Math.sqrt(data.pieces));
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
            className={`aspect-square text-5xl flex items-center justify-center rounded-xl transition-all ${
              lastClicked === i ? "ring-4 ring-primary-500 bg-primary-200" : "bg-primary-100 hover:bg-primary-200"
            }`}
          >
            {data.image}
          </button>
        ))}
      </div>
    </div>
  );
}
