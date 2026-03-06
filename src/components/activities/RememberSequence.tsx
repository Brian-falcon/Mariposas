"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";

export function RememberSequence({ activity }: { activity: Activity }) {
  const data = activity.data as {
    sequence: string[];
    colors?: string[];
    shapes?: string[];
  };
  const [phase, setPhase] = useState<"show" | "guess" | "success">("show");
  const [selected, setSelected] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (phase === "show") {
      const timer = setTimeout(() => setPhase("guess"), 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const getDisplay = (item: string) => {
    if (data.colors) {
      const idx = data.sequence.indexOf(item);
      return (
        <div
          className="w-16 h-16 rounded-full"
          style={{ backgroundColor: data.colors[idx] }}
        />
      );
    }
    const idx = data.sequence.indexOf(item);
    return <span className="text-4xl">{data.shapes?.[idx] || item}</span>;
  };

  const handleSelect = (item: string) => {
    if (phase !== "guess") return;
    const correct = item === data.sequence[step];
    if (correct) {
      if (step + 1 >= data.sequence.length) {
        setPhase("success");
      } else {
        setStep(step + 1);
      }
    }
  };

  if (phase === "success") {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Perfecto! 🎉</p>
        <p className="text-xl text-green-600">Recordaste la secuencia</p>
      </div>
    );
  }

  const options = data.colors
    ? data.sequence.map((s, i) => (
        <button
          key={i}
          onClick={() => handleSelect(s)}
          className="w-20 h-20 rounded-full border-4 border-gray-300 hover:border-primary-500"
          style={{ backgroundColor: data.colors![i] }}
          aria-label={s}
        />
      ))
    : data.sequence.map((s, i) => (
        <button
          key={i}
          onClick={() => handleSelect(s)}
          className="px-8 py-4 text-3xl rounded-xl bg-primary-100 hover:bg-primary-200"
        >
          {data.shapes?.[i] || s}
        </button>
      ));

  return (
    <div className="p-6 text-center">
      <p className="text-xl mb-6">
        {phase === "show"
          ? "Mira la secuencia..."
          : `Toca el ${step + 1}º elemento`}
      </p>
      {phase === "show" ? (
        <div className="flex justify-center gap-4 mb-8">
          {data.sequence.map((s, i) => (
            <div key={i}>{getDisplay(s)}</div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">{options}</div>
      )}
    </div>
  );
}
