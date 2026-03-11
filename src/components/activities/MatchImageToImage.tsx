"use client";

import { useState } from "react";
import { Activity } from "@/types";
import { useActivityReport } from "@/context/ActivityReportContext";

type ImageSlot = { id: string; src: string }; // src: emoji o ruta /images/xxx.png

function ImageOrEmoji({ src, selectNone = false }: { src: string; selectNone?: boolean }) {
  const isUrl = src.startsWith("/");
  if (isUrl) {
    return (
      <img
        src={src}
        alt=""
        className={`w-full h-full object-contain ${selectNone ? "select-none pointer-events-none" : ""}`}
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
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const shuffled = [...slots].sort(() => Math.random() - 0.5);

  const handleDragStart = (e: React.DragEvent, slot: ImageSlot) => {
    if (Object.values(matches).includes(slot.id)) return;
    setDragging(slot.id);
    e.dataTransfer.setData("text/plain", slot.id);
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
    const slotId = e.dataTransfer.getData("text/plain");
    if (!slotId) return;
    if (matches[slotIndex] === slots[slotIndex].id) return;
    if (slotId === slots[slotIndex].id) {
      setMatches((m) => ({ ...m, [slotIndex]: slotId }));
    }
    setDragging(null);
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
        Arrastra cada imagen con el mouse hasta el recuadro que corresponde.
      </p>

      {/* Sección superior - Beige: imágenes con zonas de soltar */}
      <div
        className="rounded-2xl p-4 sm:p-6 mb-6"
        style={{ backgroundColor: "#f5f0e6" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {slots.map((slot, idx) => (
            <div key={slot.id} className="flex flex-col items-center">
              <div className="w-full aspect-square max-w-[120px] sm:max-w-[140px] flex items-center justify-center mb-2 rounded-xl bg-white/60 overflow-hidden p-2">
                <ImageOrEmoji src={slot.src} />
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
                    <ImageOrEmoji src={slots[idx].src} selectNone />
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
            .filter((s) => remainingIds.includes(s.id))
            .map((slot) => (
              <div
                key={slot.id}
                draggable
                onDragStart={(e) => handleDragStart(e, slot)}
                onDragEnd={handleDragEnd}
                className={`aspect-square max-w-[120px] sm:max-w-[140px] mx-auto flex items-center justify-center rounded-xl transition-all cursor-grab active:cursor-grabbing ${
                  dragging === slot.id ? "opacity-50 scale-95" : "bg-white shadow-md hover:shadow-lg"
                }`}
              >
                <ImageOrEmoji src={slot.src} selectNone />
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
