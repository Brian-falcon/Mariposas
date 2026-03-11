"use client";

import { useState } from "react";
import { Activity } from "@/types";
import { useActivityReport } from "@/context/ActivityReportContext";

type ImageSlot = { id: string; src: string }; // src: emoji o ruta /images/xxx.png

function ImageOrEmoji({ src }: { src: string }) {
  const isUrl = src.startsWith("/");
  if (isUrl) {
    return (
      <img
        src={src}
        alt=""
        className="w-full h-full object-contain"
        draggable={false}
      />
    );
  }
  return <span className="text-5xl sm:text-6xl md:text-7xl">{src}</span>;
}

export function MatchImageToImage({ activity }: { activity: Activity }) {
  const report = useActivityReport();
  const data = activity.data as { images: ImageSlot[] };
  const slots = data.images;
  const [selected, setSelected] = useState<ImageSlot | null>(null);
  const [matches, setMatches] = useState<Record<number, string>>({});
  const shuffled = [...slots].sort(() => Math.random() - 0.5);

  const handleBottomClick = (slot: ImageSlot) => {
    if (Object.values(matches).includes(slot.id)) return;
    setSelected((prev) => (prev?.id === slot.id ? null : slot));
  };

  const handleSlotClick = (slotIndex: number) => {
    if (!selected) return;
    const slotId = slots[slotIndex].id;
    if (matches[slotIndex] === slotId) return; // ya está completo
    if (selected.id === slotId) {
      setMatches((m) => ({ ...m, [slotIndex]: slotId }));
      setSelected(null);
    } else {
      setSelected(null);
    }
  };

  const allMatched = Object.keys(matches).length === slots.length;

  if (allMatched) {
    report?.reportComplete({ correct: true });
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Excelente! 🎉</p>
        <p className="text-xl text-green-600">Uniste todas las imágenes correctamente</p>
      </div>
    );
  }

  const remainingIds = slots
    .map((s) => s.id)
    .filter((id) => !Object.values(matches).includes(id));

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <p className="text-xl text-center mb-6">
        Arrastra cada imagen de abajo hasta el recuadro que corresponde
      </p>

      {/* Sección superior - Beige: imágenes con zonas de soltar */}
      <div
        className="rounded-2xl p-4 sm:p-6 mb-6"
        style={{ backgroundColor: "#f5f0e6" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {slots.map((slot, idx) => (
            <div key={slot.id} className="flex flex-col items-center">
              <div className="w-full aspect-square max-w-[120px] sm:max-w-[140px] flex items-center justify-center mb-2 rounded-xl bg-white/60 overflow-hidden">
                <ImageOrEmoji src={slot.src} />
              </div>
              <button
                type="button"
                onClick={() => handleSlotClick(idx)}
                className={`w-full min-h-[70px] sm:min-h-[80px] rounded-xl border-2 border-dashed flex items-center justify-center transition-all touch-manipulation ${
                  matches[idx]
                    ? "border-green-500 bg-green-50"
                    : selected?.id === slot.id
                    ? "border-primary-500 bg-primary-50 ring-2 ring-primary-400"
                    : "border-green-400 border-dashed bg-white/50 hover:border-primary-400"
                }`}
                aria-label={`Soltar aquí para ${slot.id}`}
              >
                {matches[idx] ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    <ImageOrEmoji src={slot.src} />
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Suelta aquí</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sección inferior - Verde claro: opciones para arrastrar */}
      <div
        className="rounded-2xl p-4 sm:p-6"
        style={{ backgroundColor: "#e8f5e9" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {shuffled
            .filter((s) => remainingIds.includes(s.id))
            .map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => handleBottomClick(slot)}
                className={`aspect-square max-w-[120px] sm:max-w-[140px] mx-auto flex items-center justify-center rounded-xl transition-all touch-manipulation ${
                  selected?.id === slot.id
                    ? "ring-4 ring-primary-500 bg-primary-100 scale-105"
                    : "bg-white shadow-md hover:shadow-lg hover:scale-105"
                }`}
                aria-label={`Seleccionar ${slot.id}`}
              >
                <ImageOrEmoji src={slot.src} />
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
