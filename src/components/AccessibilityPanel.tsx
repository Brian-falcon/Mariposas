"use client";

import { useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { usePersonalization } from "@/context/PersonalizationContext";
import type { FontSize, ColorScheme } from "@/context/AccessibilityContext";

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const acc = useAccessibility();
  const { avatar, setAvatar, avatars } = usePersonalization();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
        aria-label="Opciones de accesibilidad"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span className="text-2xl" aria-hidden>⚙️</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-title"
            className="fixed right-4 top-16 sm:right-6 sm:top-20 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6"
          >
            <h2 id="accessibility-title" className="text-xl font-bold text-gray-800 mb-4">
              Configuración
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tu avatar
                </label>
                <div className="flex flex-wrap gap-2">
                  {avatars.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAvatar(a)}
                      className={`w-12 h-12 text-2xl rounded-xl transition-all ${
                        avatar === a
                          ? "bg-primary-500 ring-2 ring-primary-600 scale-110"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <hr className="border-gray-200" />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tamaño del texto
                </label>
                <div className="flex gap-2">
                  {(["small", "medium", "large"] as FontSize[]).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => acc.setFontSize(size)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        acc.fontSize === size
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {size === "small" ? "A-" : size === "medium" ? "A" : "A+"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Colores
                </label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["default", "Normal"],
                      ["high-contrast", "Alto contraste"],
                      ["dark", "Modo oscuro"],
                    ] as [ColorScheme, string][]
                  ).map(([scheme, label]) => (
                    <button
                      key={scheme}
                      type="button"
                      onClick={() => acc.setColorScheme(scheme)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        acc.colorScheme === scheme
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acc.reducedMotion}
                  onChange={(e) => acc.setReducedMotion(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700">Reducir animaciones</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acc.largeButtons}
                  onChange={(e) => acc.setLargeButtons(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700">Botones más grandes</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  acc.reset();
                  setOpen(false);
                }}
                className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
              >
                Restaurar valores
              </button>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 text-gray-500"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  );
}
