"use client";

import { useState } from "react";
import { Activity } from "@/types";

type ShieldData = {
  shield: "penarol" | "nacional";
  pieces: number;
};

const SHIELDS: Record<string, string[]> = {
  penarol: ["#000", "#FFD700", "#000", "#FFD700", "#000", "#FFD700", "#000", "#FFD700", "#000"],
  nacional: ["#fff", "#0033A0", "#fff", "#DC143C", "#fff", "#0033A0", "#fff", "#DC143C", "#fff"],
};

export function ShieldPuzzle({ activity }: { activity: Activity }) {
  const data = activity.data as ShieldData;
  const colors = SHIELDS[data.shield] || SHIELDS.penarol;
  const [order, setOrder] = useState(
    Array.from({ length: colors.length }, (_, i) => i).sort(() => Math.random() - 0.5)
  );
  const [lastClicked, setLastClicked] = useState<number | null>(null);

  const swap = (i: number, j: number) => {
    const newOrder = [...order];
    [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
    setOrder(newOrder);
    setLastClicked(null);
  };

  const handleClick = (i: number) => {
    if (lastClicked === null) setLastClicked(i);
    else { swap(lastClicked, i); }
  };

  const correct = order.every((v, idx) => v === idx);
  const size = Math.ceil(Math.sqrt(colors.length));
  const name = data.shield === "penarol" ? "Peñarol" : "Nacional";

  if (correct) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Escudo de {name} completo! 🏆</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 md:p-6">
      <p className="text-base sm:text-lg md:text-xl text-center mb-3 md:mb-6">
        Arma el escudo de {name} (toca dos piezas para intercambiarlas)
      </p>
      <div
        className="grid gap-1.5 sm:gap-2 md:gap-3 mx-auto max-w-[220px] xs:max-w-[260px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[400px]"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {order.map((pieceIdx, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`aspect-square rounded-lg md:rounded-xl transition-all min-h-[55px] xs:min-h-[65px] sm:min-h-[75px] md:min-h-[90px] lg:min-h-[100px] touch-manipulation ${
              lastClicked === i ? "ring-4 ring-primary-500 scale-105" : ""
            }`}
            style={{ backgroundColor: colors[pieceIdx] }}
          />
        ))}
      </div>
    </div>
  );
}
