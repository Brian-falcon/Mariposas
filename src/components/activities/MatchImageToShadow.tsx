"use client";

import { useState } from "react";
import { Activity } from "@/types";
import { useActivityReport } from "@/context/ActivityReportContext";

type ShadowPair = { id: string; shadow: string; color: string };

function ImageDisplay({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain"
      draggable={false}
    />
  );
}

export function MatchImageToShadow({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as { pairs: ShadowPair[] };
  const pairs = data.pairs;
  const [selected, setSelected] = useState<ShadowPair | null>(null);
  const [matches, setMatches] = useState<Record<number, string>>({});
  const shuffled = [...pairs].sort(() => Math.random() - 0.5);

  const handleBottomClick = (pair: ShadowPair) => {
    if (Object.values(matches).includes(pair.id)) return;
    setSelected((prev) => (prev?.id === pair.id ? null : pair));
  };

  const handleSlotClick = (slotIndex: number) => {
    if (!selected) return;
    const pairId = pairs[slotIndex].id;
    if (matches[slotIndex] === pairId) return;
    if (selected.id === pairId) {
      setMatches((m) => ({ ...m, [slotIndex]: pairId }));
      setSelected(null);
    } else {
      setSelected(null);
    }
  };

  const allMatched = Object.keys(matches).length === pairs.length;

  if (allMatched) {
    report?.reportComplete({ correct: true });
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Excelente! 🎉</p>
        <p className="text-xl text-green-600">Uniste todas las imágenes con su sombra</p>
      </div>
    );
  }

  const remainingIds = pairs
    .map((p) => p.id)
    .filter((id) => !Object.values(matches).includes(id));

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <p className="text-xl text-center mb-6">
        Une cada imagen con su sombra. Toca la imagen de abajo y luego el recuadro que corresponde.
      </p>

      {/* Sección superior - Beige: sombras con zonas de soltar */}
      <div
        className="rounded-2xl p-4 sm:p-6 mb-6"
        style={{ backgroundColor: "#f5f0e6" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {pairs.map((pair, idx) => (
            <div key={pair.id} className="flex flex-col items-center">
              <div className="w-full aspect-square max-w-[120px] sm:max-w-[140px] flex items-center justify-center mb-2 rounded-xl bg-white border border-amber-200 overflow-hidden p-2">
                <ImageDisplay src={pair.shadow} alt={`Sombra de ${pair.id}`} />
              </div>
              <button
                type="button"
                onClick={() => handleSlotClick(idx)}
                className={`w-full min-h-[70px] sm:min-h-[80px] rounded-xl border-2 border-dashed flex items-center justify-center transition-all touch-manipulation ${
                  matches[idx]
                    ? "border-green-500 bg-green-50"
                    : selected?.id === pair.id
                    ? "border-primary-500 bg-primary-50 ring-2 ring-primary-400"
                    : "border-green-400 bg-white/50 hover:border-primary-400"
                }`}
                aria-label={`Soltar aquí para la sombra de ${pair.id}`}
              >
                {matches[idx] ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    <ImageDisplay src={pairs[idx].color} alt={pairs[idx].id} />
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Suelta aquí</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sección inferior - Verde claro: imágenes a color */}
      <div
        className="rounded-2xl p-4 sm:p-6"
        style={{ backgroundColor: "#e8f5e9" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {shuffled
            .filter((p) => remainingIds.includes(p.id))
            .map((pair) => (
              <button
                key={pair.id}
                type="button"
                onClick={() => handleBottomClick(pair)}
                className={`aspect-square max-w-[120px] sm:max-w-[140px] mx-auto flex items-center justify-center rounded-xl overflow-hidden transition-all touch-manipulation ${
                  selected?.id === pair.id
                    ? "ring-4 ring-primary-500 bg-primary-100 scale-105"
                    : "bg-white shadow-md hover:shadow-lg hover:scale-105"
                }`}
                aria-label={`Seleccionar ${pair.id}`}
              >
                <ImageDisplay src={pair.color} alt={pair.id} />
              </button>
            ))}
        </div>
      </div>

      {selected && (
        <p className="text-center text-primary-600 font-semibold mt-4">
          Toca el recuadro verde punteado donde va la imagen seleccionada
        </p>
      )}
    </div>
  );
}
