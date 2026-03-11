"use client";

import { useState } from "react";
import { Activity } from "@/types";
import { useActivityReport } from "@/context/ActivityReportContext";

type ShadowPair = { id: string; shadow: string; color: string };

function ImageDisplay({ src, alt, draggable = false }: { src: string; alt: string; draggable?: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain select-none pointer-events-none"
      draggable={draggable}
    />
  );
}

export function MatchImageToShadow({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as { pairs: ShadowPair[] };
  const pairs = data.pairs;
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const shuffled = [...pairs].sort(() => Math.random() - 0.5);

  const handleDragStart = (e: React.DragEvent, pair: ShadowPair) => {
    if (Object.values(matches).includes(pair.id)) return;
    setDragging(pair.id);
    e.dataTransfer.setData("text/plain", pair.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDragging(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    const pairId = e.dataTransfer.getData("text/plain");
    if (!pairId) return;
    if (matches[slotIndex] === pairs[slotIndex].id) return; // ya completado
    if (pairId === pairs[slotIndex].id) {
      setMatches((m) => ({ ...m, [slotIndex]: pairId }));
    }
    setDragging(null);
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
        Arrastra cada imagen con el mouse hasta el recuadro que corresponde a su sombra.
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
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, idx)}
                className={`w-full min-h-[70px] sm:min-h-[80px] rounded-xl border-2 border-dashed flex items-center justify-center transition-all cursor-pointer ${
                  matches[idx]
                    ? "border-green-500 bg-green-50"
                    : "border-green-400 bg-white/50 hover:border-primary-400 hover:bg-primary-50/50"
                }`}
              >
                {matches[idx] ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    <ImageDisplay src={pairs[idx].color} alt={pairs[idx].id} />
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Suelta aquí</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección inferior - Verde claro: imágenes a arrastrar */}
      <div
        className="rounded-2xl p-4 sm:p-6"
        style={{ backgroundColor: "#e8f5e9" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {shuffled
            .filter((p) => remainingIds.includes(p.id))
            .map((pair) => (
              <div
                key={pair.id}
                draggable
                onDragStart={(e) => handleDragStart(e, pair)}
                onDragEnd={handleDragEnd}
                className={`aspect-square max-w-[120px] sm:max-w-[140px] mx-auto flex items-center justify-center rounded-xl overflow-hidden cursor-grab active:cursor-grabbing transition-all ${
                  dragging === pair.id ? "opacity-50 scale-95" : "bg-white shadow-md hover:shadow-lg"
                }`}
              >
                <ImageDisplay src={pair.color} alt={pair.id} />
              </div>
            ))}
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4">
        En tablets o celulares: mantené presionada la imagen y arrastrala hasta el recuadro.
      </p>
    </div>
  );
}
