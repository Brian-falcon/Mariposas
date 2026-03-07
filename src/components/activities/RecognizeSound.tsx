"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { playSound, stopSound } from "@/lib/sounds";

type SoundRound = {
  soundType: string;
  options: string[];
  emojis: string[];
  audioUrl?: string;
};

export function RecognizeSound({ activity }: { activity: Activity }) {
  const data = activity.data as SoundRound & { rounds?: SoundRound[] };
  const rounds: SoundRound[] = data.rounds ?? [data];
  const [currentRound, setCurrentRound] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const round = rounds[currentRound];

  useEffect(() => () => stopSound(), [activity.id]);

  const handlePlay = () => {
    if (!round) return;
    setIsPlaying(true);
    playSound(round.soundType, { audioUrl: round.audioUrl });
    setTimeout(() => setIsPlaying(false), 2500);
  };

  const handleNext = () => {
    setResult(null);
    setCurrentRound((c) => c + 1);
  };

  if (!round) return null;

  if (result !== null) {
    const isLast = currentRound >= rounds.length - 1;
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">{result ? "¡Correcto! 🎉" : "Intenta de nuevo"}</p>
        <p className="text-xl mb-6">{!result && `Es el sonido de: ${round.soundType}`}</p>
        {result && !isLast && (
          <button
            onClick={handleNext}
            className="px-8 py-4 text-xl font-bold rounded-xl bg-primary-500 text-white"
          >
            Siguiente →
          </button>
        )}
        {result && isLast && <p className="text-lg text-gray-600">¡Completaste todas!</p>}
        {!result && (
          <button
            onClick={() => setResult(null)}
            className="mt-4 px-8 py-4 text-xl font-bold rounded-xl bg-primary-500 text-white"
          >
            Intentar de nuevo
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-6">
      {rounds.length > 1 && (
        <p className="text-lg text-center text-gray-500 mb-2">
          Pregunta {currentRound + 1} de {rounds.length}
        </p>
      )}
      <p className="text-xl text-center mb-2">Escucha el sonido y elige qué es</p>
      <p className="text-center text-gray-600 mb-4">Toca el altavoz para escuchar</p>
      <div className="flex flex-col items-center mb-8">
        <button
          type="button"
          onClick={handlePlay}
          disabled={isPlaying}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl transition-all touch-manipulation ${
            isPlaying
              ? "bg-primary-300 scale-110 animate-pulse"
              : "bg-primary-100 hover:bg-primary-200 hover:scale-105"
          }`}
          aria-label="Reproducir sonido"
        >
          🔊
        </button>
        <p className="text-sm text-gray-600 mt-3">
          {isPlaying ? "Reproduciendo..." : "Toca para escuchar"}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {round.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setResult(opt === round.soundType)}
            className="flex flex-col items-center gap-2 px-8 py-6 rounded-2xl bg-primary-100 hover:bg-primary-200 transition-all"
          >
            <span className="text-5xl">{round.emojis[i]}</span>
            <span className="text-xl font-bold capitalize">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
