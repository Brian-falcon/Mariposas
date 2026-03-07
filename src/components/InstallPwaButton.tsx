"use client";

import { useState, useEffect } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPwaButton() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSHelp, setShowIOSHelp] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone = (window.navigator as { standalone?: boolean }).standalone;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (standalone || isStandalone) return;

    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: boolean }).MSStream);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    setShow(true);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleClick = async () => {
    if (isIOS) {
      setShowIOSHelp(true);
      return;
    }

    if (deferredPrompt) {
      setInstalling(true);
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setInstalling(false);
      if (outcome === "accepted") setShow(false);
    } else {
      setShowIOSHelp(true);
    }
  };

  if (!show) return null;

  return (
    <>
      <button
        onClick={handleClick}
        disabled={installing}
        className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-colors disabled:opacity-70"
        aria-label="Descargar app Mariposas"
      >
        <span>📲</span>
        <span className="hidden sm:inline">{installing ? "Instalando…" : "Descargar app"}</span>
      </button>

      {showIOSHelp && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowIOSHelp(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-3">📲 Descargar Mariposas</h3>
            <p className="text-gray-600 mb-4">
              Tocá el botón <strong>Compartir</strong> (↑) abajo y elegí{" "}
              <strong>&quot;Añadir a pantalla de inicio&quot;</strong>.
            </p>
            <button
              onClick={() => setShowIOSHelp(false)}
              className="w-full py-2 rounded-xl bg-primary-500 text-white font-semibold"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}
