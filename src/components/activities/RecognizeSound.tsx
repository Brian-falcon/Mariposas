"use client";

import { useState, useEffect, useMemo } from "react";
import { Activity } from "@/types";
import { playSound, stopSound } from "@/lib/sounds";
import { ActivityFeedback } from "./ActivityFeedback";
import { useActivityReport } from "@/context/ActivityReportContext";
import { shuffleArray } from "@/lib/shuffle";

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
  const report = useActivityReport();

  useEffect(() => () => stopSound(), [activity.id]);
  useEffect(() => {
    if (result !== null && currentRound >= rounds.length - 1) {
      report?.reportComplete({ correct: result });
    }
  }, [result, currentRound, rounds.length, report]);

  const choicePairs = useMemo(
    () =>
      round
        ? shuffleArray(round.options.map((opt, i) => ({ opt, emoji: round.emojis[i] ?? "" })))
        : [],
    [currentRound, round]
  );

  const handlePlay = () => {
    if (!round) return;
    setIsPlaying(true);
    playSound(round.soundType, {
      audioUrl: round.audioUrl,
      onPlaybackEnd: () => setIsPlaying(false),
    });
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
        message={!result ? `Es el sonido de: ${round.soundType}` : undefined}
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
        {choicePairs.map(({ opt, emoji }) => (
          <button
            key={`${opt}-${emoji}`}
            type="button"
            onClick={() => setResult(opt === round.soundType)}
            className="flex flex-col items-center gap-2 px-8 py-6 rounded-2xl bg-primary-100 hover:bg-primary-200 transition-all"
          >
            <span className="text-5xl">{emoji}</span>
            <span className="text-xl font-bold capitalize">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
