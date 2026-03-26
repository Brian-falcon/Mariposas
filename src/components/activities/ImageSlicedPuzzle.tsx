"use client";

import { useState } from "react";
import { Activity } from "@/types";

type PuzzleImage = { src: string; label?: string };

type ImageSlicedPuzzleData = {
  pieces: number;
  // Usado para compatibilidad: puede ser una URL/ruta de imagen o un emoji (futuro).
  image?: string;
  label?: string;
  images?: PuzzleImage[];
};

function isLikelyImageSrc(src: string) {
  const s = src.trim();
  if (!s) return false;
  return s.startsWith("/") || s.startsWith("http") || s.includes(".");
}

export function ImageSlicedPuzzle({ activity }: { activity: Activity }) {
  const data = activity.data as ImageSlicedPuzzleData;
  const pieces = data.pieces || 4;
  const size = Math.ceil(Math.sqrt(pieces));

  const [puzzle] = useState(() => {
    const fallback: PuzzleImage = { src: data.image || "", label: data.label || "Imagen" };
    if (Array.isArray(data.images) && data.images.length > 0) {
      const pick = data.images[Math.floor(Math.random() * data.images.length)];
      return { src: pick.src, label: pick.label || data.label || "Imagen" };
    }
    if (typeof data.image === "string" && data.image.trim()) {
      return { src: data.image, label: data.label || "Imagen" };
    }
    return fallback;
  });

  const imageSrc = puzzle.src;
  const name = puzzle.label || "Imagen";
  const isImage = isLikelyImageSrc(imageSrc);

  const [order, setOrder] = useState(() =>
    Array.from({ length: pieces }, (_, i) => i).sort(() => Math.random() - 0.5)
  );
  const [lastClicked, setLastClicked] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const swap = (i: number, j: number) => {
    if (i === j) return;
    const newOrder = [...order];
    [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
    setOrder(newOrder);
    setLastClicked(null);
  };

  const handleClick = (i: number) => {
    if (lastClicked === null) setLastClicked(i);
    else if (lastClicked === i) setLastClicked(null);
    else swap(lastClicked, i);
  };

  const correct = order.every((v, idx) => v === idx);

  if (correct && isImage) {
    return (
      <div className="p-4 sm:p-6 md:p-8 text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-700 mb-4 md:mb-6">
          ¡Puzzle de {name} completo! 🏆
        </p>
        <div className="flex justify-center mb-4 md:mb-6">
          <img
            src={imageSrc}
            alt={`Puzzle de ${name} completo`}
            className="max-w-[320px] xs:max-w-[380px] sm:max-w-[420px] md:max-w-[520px] w-full h-auto rounded-xl shadow-lg"
          />
        </div>
        <p className="text-lg md:text-xl text-gray-600">¡Lo armaste muy bien!</p>
      </div>
    );
  }

  if (correct && !isImage) {
    // Fallback por si alguna actividad usa emoji (no debería pasar con los datos nuevos).
    return (
      <div className="p-4 sm:p-6 md:p-8 text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-700 mb-4 md:mb-6">
          ¡Puzzle completo! 🏆
        </p>
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="max-w-[360px] aspect-square w-full rounded-xl bg-primary-50 border border-primary-200 flex items-center justify-center text-6xl shadow-sm">
            {imageSrc}
          </div>
        </div>
        <p className="text-lg md:text-xl text-gray-600">¡Lo armaste muy bien!</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 md:p-6">
      <p className="text-base sm:text-lg md:text-xl text-center mb-3 md:mb-6">
        Ordena las piezas para formar la imagen completa
      </p>

      <div className="relative">
        {isImage && (
          <img
            src={imageSrc}
            alt=""
            className="absolute opacity-0 w-0 h-0"
            onLoad={() => setImageLoaded(true)}
          />
        )}

        <div
          className="grid gap-2 sm:gap-1.5 md:gap-2 mx-auto max-w-[380px]"
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        >
          {order.map((pieceIdx, cellIdx) => {
            const col = pieceIdx % size;
            const row = Math.floor(pieceIdx / size);
            const bgSize = size * 100;
            const bgX = -col * 100;
            const bgY = -row * 100;

            return (
              <button
                key={cellIdx}
                type="button"
                onClick={() => handleClick(cellIdx)}
                className={`aspect-square rounded-xl transition-all min-h-[64px] sm:min-h-[86px] md:min-h-[100px] overflow-hidden touch-manipulation ${
                  lastClicked === cellIdx ? "ring-4 ring-primary-500 scale-105 z-10" : ""
                } ${!imageLoaded && isImage ? "bg-gray-200 animate-pulse" : ""}`}
                style={
                  imageLoaded && isImage
                    ? {
                        backgroundImage: `url(${imageSrc})`,
                        backgroundSize: `${bgSize}% ${bgSize}%`,
                        backgroundPosition: `${bgX}% ${bgY}%`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "#e5e7eb",
                      }
                    : undefined
                }
                aria-label="Pieza de puzzle"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

