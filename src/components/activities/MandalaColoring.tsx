"use client";

import { useState } from "react";
import { Activity } from "@/types";

type MandalaData = {
  image: string;
  gridSize?: number;
  colors?: string[];
};

const DEFAULT_COLORS = ["#E86B6B", "#4A90D9", "#5CB85C", "#F5A623", "#9B59B6", "#E91E8C"];

export function MandalaColoring({ activity }: { activity: Activity }) {
  const data = activity.data as MandalaData;
  const imageSrc = data.image;
  const gridSize = data.gridSize || 6;
  const palette = data.colors || DEFAULT_COLORS;
  const totalCells = gridSize * gridSize;

  const [selectedColor, setSelectedColor] = useState(palette[0]);
  const [colored, setColored] = useState<Record<number, string>>({});

  const handleColor = (index: number) => {
    setColored((prev) => ({ ...prev, [index]: selectedColor }));
  };

  const coloredCount = Object.keys(colored).length;
  const allColored = coloredCount >= totalCells;

  if (allColored) {
    return (
      <div className="text-center py-12">
        <p className="text-3xl md:text-4xl mb-4">¡Mandala pintado! 🎨</p>
        <p className="text-xl text-gray-600">¡Quedó muy lindo!</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <p className="text-base sm:text-lg text-center mb-3 md:mb-4">
        Elige un color y toca cada zona para pintar
      </p>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
        {palette.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-4 transition-all touch-manipulation ${
              selectedColor === color ? "border-gray-800 scale-110" : "border-gray-300"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[320px] sm:max-w-[400px] aspect-square">
        <img
          src={imageSrc}
          alt="Mandala para colorear"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
        <div
          className="absolute inset-0 grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {Array.from({ length: totalCells }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleColor(i)}
              className="transition-colors touch-manipulation min-h-0 mix-blend-screen"
              style={{
                backgroundColor: colored[i] ? colored[i] : "transparent",
              }}
            />
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 mt-2">
        Zonas pintadas: {coloredCount} / {totalCells}
      </p>
    </div>
  );
}
