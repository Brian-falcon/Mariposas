"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { playSound, stopSound } from "@/lib/sounds";

export function RecognizeSound({ activity }: { activity: Activity }) {
  const data = activity.data as {
    soundType: string;
    options: string[];
    emojis: string[];
    audioUrl?: string;
  };
  const [result, setResult] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => () => stopSound(), [activity.id]);

  const handlePlay = () => {
    setIsPlaying(true);
    playSound(data.soundType, { audioUrl: data.audioUrl });
    setTimeout(() => setIsPlaying(false), 2500);
  };

  if (result !== null) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">{result ? "¡Correcto! 🎉" : "Intenta de nuevo"}</p>
        <p className="text-xl">{!result && `Es el sonido de: ${data.soundType}`}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xl text-center mb-2">
        Escucha el sonido y elige qué es
      </p>
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
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setResult(opt === data.soundType)}
            className="flex flex-col items-center gap-2 px-8 py-6 rounded-2xl bg-primary-100 hover:bg-primary-200 transition-all"
          >
            <span className="text-5xl">{data.emojis[i]}</span>
            <span className="text-xl font-bold capitalize">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
