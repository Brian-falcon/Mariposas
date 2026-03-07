"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Activity } from "@/types";
import { getNumberDots } from "@/lib/numberDots";

type TraceData = {
  start?: number;
  end?: number;
};

const DEFAULT_START = 0;
const DEFAULT_END = 20;

export function TraceNumber({ activity }: { activity: Activity }) {
  const data = activity.data as TraceData;
  const start = data.start ?? DEFAULT_START;
  const end = data.end ?? DEFAULT_END;
  const numbers = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const num = numbers[currentIndex];
  const dots = getNumberDots(num);
  const hitRadius = 12;
  const dotRadius = 5;

  const allVisited = dots.length > 0 && visited.size >= dots.length;
  const isLast = currentIndex >= numbers.length - 1;

  useEffect(() => {
    if (allVisited && !showSuccess) {
      setShowSuccess(true);
      const t = setTimeout(() => {
        if (currentIndex < numbers.length - 1) {
          setCurrentIndex((c) => c + 1);
          setVisited(new Set());
          setShowSuccess(false);
        }
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [allVisited, showSuccess, currentIndex, numbers.length]);

  const getPosition = useCallback((e: React.MouseEvent | React.Touch) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    return { x, y };
  }, []);

  const nextExpected = visited.size;
  const checkHit = useCallback(
    (pos: { x: number; y: number }) => {
      if (nextExpected >= dots.length) return;
      const [dx, dy] = dots[nextExpected];
      const dist = Math.sqrt((pos.x - dx) ** 2 + (pos.y - dy) ** 2);
      if (dist < hitRadius) {
        setVisited((v) => new Set([...v, nextExpected]));
      }
    },
    [dots, nextExpected]
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const pos = getPosition(e);
    if (pos) checkHit(pos);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const pos = {
        x: ((touch.clientX - rect.left) / rect.width) * 100,
        y: ((touch.clientY - rect.top) / rect.height) * 100,
      };
      checkHit(pos);
    }
  };

  if (allVisited && isLast) {
    return (
      <div className="text-center py-12">
        <p className="text-3xl md:text-4xl mb-4">¡Completaste todos los números! 🎉</p>
        <p className="text-xl text-gray-600">Del {start} al {end}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <p className="text-center text-base md:text-lg mb-2">
        Sigue los puntitos con el mouse o el dedo
      </p>
      <p className="text-center text-lg md:text-xl font-bold text-primary-700 mb-4">
        Número {currentIndex + 1} de {numbers.length}: <span className="text-3xl">{num}</span>
      </p>

      <div
        ref={containerRef}
        className="relative mx-auto bg-white rounded-xl border-2 border-gray-300 aspect-square max-w-[320px] sm:max-w-[400px] touch-none select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => e.preventDefault()}
        style={{ touchAction: "none" }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
        >
          {/* Líneas que ya fueron trazadas */}
          {visited.size > 1 && (
            <polyline
              points={Array.from(visited)
                .sort((a, b) => a - b)
                .map((i) => dots[i])
                .map(([x, y]) => `${x},${y}`)
                .join(" ")}
              fill="none"
              stroke="#4A90D9"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          {/* Puntos */}
          {dots.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={dotRadius}
              fill={visited.has(i) ? "#4A90D9" : "#8B4513"}
            />
          ))}
        </svg>

        {showSuccess && !isLast && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-500/30 rounded-xl">
            <span className="text-4xl font-bold text-green-700">¡Bien! Siguiente →</span>
          </div>
        )}
      </div>

      <p className="text-center text-sm text-gray-500 mt-3">
        Puntos: {visited.size} / {dots.length}
      </p>
    </div>
  );
}
