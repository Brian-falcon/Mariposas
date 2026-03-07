"use client";

import { useState } from "react";
import { Activity } from "@/types";

type ColoringData = {
  regions: string[];
  colors: string[];
};

const DEFAULT_COLORS = ["#E86B6B", "#4A90D9", "#5CB85C", "#F5A623", "#9B59B6", "#E91E8C"];

export function ColoringGame({ activity }: { activity: Activity }) {
  const data = activity.data as ColoringData;
  const regions = data.regions || [];
  const palette = data.colors || DEFAULT_COLORS;
  const [selectedColor, setSelectedColor] = useState(palette[0]);
  const [colored, setColored] = useState<Record<number, string>>({});

  const handleColor = (index: number) => {
    setColored((prev) => ({ ...prev, [index]: selectedColor }));
  };

  const allColored = regions.length > 0 && Object.keys(colored).length >= regions.length;

  if (allColored) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Muy bien pintado! 🎨</p>
      </div>
    );
  }

  const cols = Math.ceil(Math.sqrt(regions.length));

  return (
    <div className="p-4 sm:p-5 md:p-6 max-w-2xl mx-auto">
      <p className="text-base sm:text-lg md:text-xl text-center mb-3 md:mb-4">Elige un color y pinta cada zona</p>
      
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 md:mb-6">
        {palette.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-11 h-11 xs:w-12 xs:h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl border-4 transition-all touch-manipulation ${
              selectedColor === color ? "border-gray-800 scale-110" : "border-gray-300"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div
        className="grid gap-1.5 sm:gap-2 mx-auto max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-md"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {regions.map((_, i) => (
          <button
            key={i}
            onClick={() => handleColor(i)}
            className="aspect-square rounded-lg border-2 border-gray-300 flex items-center justify-center text-2xl xs:text-3xl sm:text-3xl md:text-4xl transition-all min-h-[55px] xs:min-h-[60px] sm:min-h-[70px] md:min-h-[80px] touch-manipulation"
            style={{ backgroundColor: colored[i] || "#f0f0f0" }}
          >
            {regions[i]}
          </button>
        ))}
      </div>
    </div>
  );
}
