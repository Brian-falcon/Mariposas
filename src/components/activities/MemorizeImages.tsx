"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";

export function MemorizeImages({ activity }: { activity: Activity }) {
  const data = activity.data as { images: string[]; displayTime: number };
  const [phase, setPhase] = useState<"show" | "guess" | "success">("show");
  const [step, setStep] = useState(0);
  const options = [...data.images].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (phase === "show") {
      const timer = setTimeout(() => setPhase("guess"), data.displayTime);
      return () => clearTimeout(timer);
    }
  }, [phase, data.displayTime]);

  const handleSelect = (img: string) => {
    if (phase !== "guess") return;
    if (img === data.images[step]) {
      if (step + 1 >= data.images.length) {
        setPhase("success");
      } else {
        setStep(step + 1);
      }
    }
  };

  if (phase === "success") {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Muy bien! 🎉</p>
        <p className="text-xl text-green-600">Recordaste todas las imágenes</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-6">
        {phase === "show"
          ? "Mira con atención..."
          : `Toca la ${step + 1}ª imagen en orden`}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {phase === "show"
          ? data.images.map((img, i) => (
              <div
                key={i}
                className="w-24 h-24 text-6xl flex items-center justify-center bg-primary-100 rounded-2xl"
              >
                {img}
              </div>
            ))
          : options.map((img, i) => (
              <button
                key={i}
                onClick={() => handleSelect(img)}
                className="w-24 h-24 text-6xl flex items-center justify-center bg-gray-100 rounded-2xl hover:bg-primary-100 transition-colors"
                aria-label={`Seleccionar ${img}`}
              >
                {img}
              </button>
            ))}
      </div>
    </div>
  );
}
