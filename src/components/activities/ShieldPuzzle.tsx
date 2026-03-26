"use client";

import { useState } from "react";
import { Activity } from "@/types";

type PuzzleImage = { src: string; label: string };

type ShieldData = {
  // "shield" se mantiene solo para compatibilidad con actividades antiguas.
  shield?: "penarol" | "nacional";
  pieces: number;
  // Modo nuevo: puzzle con una imagen (o varias opciones a elegir al azar).
  image?: string;
  label?: string;
  images?: PuzzleImage[];
};

const SHIELD_IMAGES: Record<string, string> = {
  penarol: "/escudo-penarol.png",
  nacional: "/escudo-nacional.png",
};

const SHIELD_NAMES: Record<string, string> = {
  penarol: "Peñarol",
  nacional: "Nacional",
};

export function ShieldPuzzle({ activity }: { activity: Activity }) {
  const data = activity.data as ShieldData;
  const pieces = data.pieces || 9;
  const size = Math.ceil(Math.sqrt(pieces));

  // Elegimos una imagen al montar (no en cada render) para que el puzzle sea consistente.
  const [puzzle] = useState(() => {
    const fallback = { src: "/images/avion.png", label: "Imagen" };
    if (Array.isArray(data.images) && data.images.length > 0) {
      const pick = data.images[Math.floor(Math.random() * data.images.length)];
      return { src: pick.src, label: pick.label };
    }
    if (typeof data.image === "string" && data.image.trim()) {
      return { src: data.image, label: data.label || "Imagen" };
    }
    if (data.shield) {
      return {
        src: SHIELD_IMAGES[data.shield] || fallback.src,
        label: SHIELD_NAMES[data.shield] || fallback.label,
      };
    }
    return fallback;
  });

  const imageSrc = puzzle.src;
  const name = puzzle.label;

  const [order, setOrder] = useState(
    () => Array.from({ length: pieces }, (_, i) => i).sort(() => Math.random() - 0.5)
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
    if (lastClicked === null) {
      setLastClicked(i);
    } else if (lastClicked === i) {
      setLastClicked(null);
    } else {
      swap(lastClicked, i);
    }
  };

  const correct = order.every((v, idx) => v === idx);

  if (correct) {
    return (
      <div className="p-4 sm:p-6 md:p-8 text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-700 mb-4 md:mb-6">
          ¡Puzzle de {name} completo! 🏆
        </p>
        <div className="flex justify-center mb-4 md:mb-6">
          <img
            src={imageSrc}
            alt={`Puzzle de ${name} completo`}
            className="max-w-[240px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-[400px] w-full h-auto rounded-xl shadow-lg"
          />
        </div>
        <p className="text-lg md:text-xl text-gray-600">¡Lo armaste muy bien!</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 md:p-6">
      <p className="text-base sm:text-lg md:text-xl text-center mb-3 md:mb-6">
        Arma el puzzle de {name} (toca dos piezas para intercambiarlas)
      </p>
      <div className="relative">
        <img
          src={imageSrc}
          alt=""
          className="absolute opacity-0 w-0 h-0"
          onLoad={() => setImageLoaded(true)}
        />
        <div
          className="grid gap-1 sm:gap-1.5 md:gap-2 mx-auto max-w-[240px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-[380px]"
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        >
          {order.map((pieceIdx, i) => {
            const col = pieceIdx % size;
            const row = Math.floor(pieceIdx / size);
            const bgSize = size * 100;
            const bgX = -col * 100;
            const bgY = -row * 100;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleClick(i)}
                className={`aspect-square rounded-lg md:rounded-xl transition-all min-h-[60px] xs:min-h-[70px] sm:min-h-[85px] md:min-h-[100px] overflow-hidden touch-manipulation ${
                  lastClicked === i ? "ring-4 ring-primary-500 scale-105 z-10" : ""
                } ${!imageLoaded ? "bg-gray-200 animate-pulse" : ""}`}
                style={
                  imageLoaded
                    ? {
                        backgroundImage: `url(${imageSrc})`,
                        backgroundSize: `${bgSize}% ${bgSize}%`,
                        backgroundPosition: `${bgX}% ${bgY}%`,
                        backgroundColor: "#e5e7eb",
                      }
                    : undefined
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
