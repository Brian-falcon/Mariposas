"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { playSound, stopSound } from "@/lib/sounds";
import { ActivityFeedback } from "./ActivityFeedback";
import { useActivityReport } from "@/context/ActivityReportContext";

type SoundRound = {
  correctSound: string;
  options: string[];
  emojis: string[];
  audioUrl?: string;
};

export function ChooseSound({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as SoundRound & { rounds?: SoundRound[] };
  const rounds: SoundRound[] = data.rounds ?? [data];
  const [currentRound, setCurrentRound] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const round = rounds[currentRound];

  useEffect(() => () => stopSound(), [activity.id]);
  useEffect(() => {
    if (result !== null && currentRound >= rounds.length - 1) {
      report?.reportComplete({ correct: result });
    }
  }, [result, currentRound, rounds.length, report]);

  const handlePlay = () => {
    if (!round) return;
    setIsPlaying(true);
    playSound(round.correctSound, { audioUrl: round.audioUrl });
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
      <ActivityFeedback
        correct={result}
        message={!result ? `Era el sonido de: ${round.correctSound}` : undefined}
        onRetry={!result ? () => setResult(null) : undefined}
        onNext={result && !isLast ? handleNext : undefined}
        isLast={result && isLast}
      />
    );
  }

  return (
    <div className="p-6">
      {rounds.length > 1 && (
        <p className="text-lg text-center text-gray-500 mb-2">
          Pregunta {currentRound + 1} de {rounds.length}
        </p>
      )}
      <p className="text-xl text-center mb-2">¿Qué sonido escuchas?</p>
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
            onClick={() => setResult(opt === round.correctSound)}
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
