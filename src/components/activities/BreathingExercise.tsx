"use client";

import { useState, useEffect, useRef } from "react";
import { Activity } from "@/types";
import { useActivityReport } from "@/context/ActivityReportContext";

export function BreathingExercise({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as { duration?: number; cycles?: number };
  const totalCycles = data.cycles ?? 6;
  const cycleMs = (data.duration ?? 60000) / totalCycles;
  const inhaleMs = cycleMs * 0.4;
  const exhaleMs = cycleMs * 0.6;

  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");
  const [cycle, setCycle] = useState(0);
  const [scale, setScale] = useState(0.8);
  const [completed, setCompleted] = useState(false);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (completed) return;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startRef.current;
      const cycleElapsed = elapsed % cycleMs;

      if (cycleElapsed < inhaleMs) {
        setPhase("inhale");
        const t = cycleElapsed / inhaleMs;
        setScale(0.8 + 0.4 * t);
      } else {
        setPhase("exhale");
        const t = (cycleElapsed - inhaleMs) / exhaleMs;
        setScale(1.2 - 0.4 * t);
      }

      const newCycle = Math.floor(elapsed / cycleMs);
      setCycle(Math.min(newCycle, totalCycles));

      if (elapsed >= cycleMs * totalCycles) {
        setCompleted(true);
        report?.reportComplete({ correct: true });
        return;
      }
    };

    startRef.current = Date.now();
    const id = setInterval(animate, 50);
    return () => clearInterval(id);
  }, [completed, totalCycles, cycleMs, inhaleMs, exhaleMs, report]);

  if (completed) {
    return (
      <div className="text-center py-16" role="status">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-6xl">🌿</span>
        </div>
        <p className="text-3xl font-bold text-green-700 mb-4">¡Muy bien!</p>
        <p className="text-xl text-gray-600">
          Completaste la respiración. Te sientes más calmado.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <p className="text-lg text-gray-600 mb-4">
        Sigue el círculo. Inspira cuando crece, expira cuando se hace pequeño.
      </p>
      <p className="text-2xl font-bold text-primary-600 mb-2">
        {phase === "inhale" ? "Inspira 🌬️" : "Expira 💨"}
      </p>
      <p className="text-gray-500 mb-8">
        Respiración {cycle + 1} de {totalCycles}
      </p>
      <div
        className="w-48 h-48 rounded-full bg-primary-200 flex items-center justify-center transition-all duration-100"
        style={{
          transform: `scale(${scale})`,
        }}
        aria-hidden
      >
        <span className="text-6xl">🫁</span>
      </div>
    </div>
  );
}
