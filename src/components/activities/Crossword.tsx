"use client";

import { useState } from "react";
import { Activity } from "@/types";

type CrosswordData = {
  words: { word: string; clue?: string }[];
};

export function Crossword({ activity }: { activity: Activity }) {
  const data = activity.data as CrosswordData;
  const words = data.words || [];
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentWord, setCurrentWord] = useState(0);

  const word = words[currentWord];

  const updateLetter = (index: number, letter: string) => {
    const val = letter.toUpperCase().replace(/[^A-ZÑ]/g, "");
    setAnswers((prev) => {
      const current = prev[currentWord] || "";
      const newWord = current.slice(0, index) + val + current.slice(index + 1);
      return { ...prev, [currentWord]: newWord.slice(0, word.word.length) };
    });
  };

  const allDone = words.every((w, i) => (answers[i] || "").toUpperCase() === w.word);

  if (allDone) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Crucigrama completo! 🎉</p>
      </div>
    );
  }

  if (!word) return null;

  return (
    <div className="p-4 sm:p-5 md:p-6 max-w-2xl mx-auto">
      <p className="text-center text-sm sm:text-base md:text-lg mb-2">
        Palabra {currentWord + 1} de {words.length}
      </p>
      {word.clue && (
        <p className="text-center text-gray-600 text-sm sm:text-base mb-3 md:mb-4">{word.clue}</p>
      )}
      <p className="text-center text-base md:text-xl font-bold text-primary-700 mb-4 md:mb-6">
        {word.word.length} letras
      </p>
      
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 mb-6 md:mb-8">
        {word.word.split("").map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={answers[currentWord]?.[i] || ""}
            onChange={(e) => updateLetter(i, e.target.value)}
            className="w-12 h-12 xs:w-14 xs:h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 text-center text-xl sm:text-2xl md:text-3xl font-bold border-2 border-primary-300 rounded-xl focus:border-primary-500 focus:outline-none min-w-0"
          />
        ))}
      </div>

      <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
        <button
          onClick={() => setCurrentWord((c) => Math.max(c - 1, 0))}
          disabled={currentWord === 0}
          className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-primary-100 font-bold text-base sm:text-lg disabled:opacity-50 min-h-[48px] touch-manipulation"
        >
          ← Anterior
        </button>
        <button
          onClick={() => setCurrentWord((c) => Math.min(c + 1, words.length - 1))}
          disabled={currentWord >= words.length - 1}
          className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-primary-100 font-bold text-base sm:text-lg disabled:opacity-50 min-h-[48px] touch-manipulation"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
