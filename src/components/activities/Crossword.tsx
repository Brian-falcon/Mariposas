"use client";

import { useState } from "react";
import { Activity } from "@/types";

type WordEntry = { word: string; clue?: string; emoji?: string };

type CrosswordData = {
  words: WordEntry[];
};

export function Crossword({ activity }: { activity: Activity }) {
  const data = activity.data as CrosswordData;
  const words = data.words || [];
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [focusedWord, setFocusedWord] = useState(0);

  const updateLetter = (wordIndex: number, letterIndex: number, letter: string) => {
    const val = letter.toUpperCase().replace(/[^A-ZÑ]/g, "");
    setAnswers((prev) => {
      const current = prev[wordIndex] || "";
      const newWord = current.slice(0, letterIndex) + val + current.slice(letterIndex + 1);
      return { ...prev, [wordIndex]: newWord.slice(0, words[wordIndex].word.length) };
    });
  };

  const allDone = words.every((w, i) => (answers[i] || "").toUpperCase() === w.word);

  if (allDone) {
    return (
      <div className="text-center py-12">
        <p className="text-3xl md:text-4xl mb-4">¡Crucigrama completo! 🎉</p>
        <p className="text-xl text-gray-600">¡Muy bien resuelto!</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <div className="border-2 border-gray-800 rounded-lg p-4 md:p-6 bg-amber-50/50 shadow-lg">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-2">
          Crucigrama
        </h3>
        <p className="text-center text-gray-600 text-sm mb-4 md:mb-6">
          Completa cada palabra según la pista o el dibujo
        </p>

        <div className="border-t-2 border-gray-300 pt-4 mt-4">
          <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Pistas</p>
          <div className="space-y-5 md:space-y-6">
            {words.map((entry, wordIndex) => (
              <div
                key={wordIndex}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 md:p-4 rounded-lg transition-all ${
                  focusedWord === wordIndex ? "bg-primary-100 ring-2 ring-primary-500" : "bg-white"
                }`}
              >
                {/* Número estilo crucigrama clásico */}
                <div className="flex items-center gap-3 flex-1">
                  <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded bg-gray-800 text-white font-bold text-sm">
                    {wordIndex + 1}
                  </span>
                  {entry.emoji && (
                    <span className="text-3xl md:text-4xl" role="img" aria-hidden>
                      {entry.emoji}
                    </span>
                  )}
                  {entry.clue && (
                    <span className="text-base md:text-lg text-gray-800">
                      {entry.clue}
                    </span>
                  )}
                </div>

                {/* Cuadrícula de casillas */}
                <div className="flex gap-1 sm:gap-1.5 flex-shrink-0">
                  {entry.word.split("").map((_, letterIndex) => (
                    <input
                      key={letterIndex}
                      type="text"
                      maxLength={1}
                      value={answers[wordIndex]?.[letterIndex] || ""}
                      onChange={(e) => updateLetter(wordIndex, letterIndex, e.target.value)}
                      onFocus={() => setFocusedWord(wordIndex)}
                      className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 text-center text-base sm:text-lg md:text-xl font-bold border-2 border-gray-400 rounded focus:border-primary-600 focus:ring-2 focus:ring-primary-300 focus:outline-none bg-white"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
