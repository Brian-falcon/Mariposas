"use client";

import { useState, useEffect } from "react";

export function InstallPwaBanner() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // No mostrar si ya está instalada (standalone)
    if (typeof window === "undefined") return;
    const standalone = (window.navigator as { standalone?: boolean }).standalone;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (standalone || isStandalone) return;

    // No mostrar si ya cerraron el banner
    if (localStorage.getItem("mariposas_pwa_dismissed") === "1") return;

    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: boolean }).MSStream);

    setShow(true);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    setShow(false);
    localStorage.setItem("mariposas_pwa_dismissed", "1");
  };

  if (!show || dismissed) return null;

  return (
    <div className="bg-primary-100 border-b border-primary-200 px-4 py-2 flex items-center justify-between gap-3">
      <p className="text-sm text-primary-800 flex-1">
        {isIOS ? (
          <>📲 Tocá <strong>Compartir</strong> (↑) y elegí &quot;Añadir a pantalla de inicio&quot; para tener Mariposas en el inicio</>
        ) : (
          <>📲 Para tener Mariposas en el inicio: tocá el menú del navegador y elegí &quot;Instalar app&quot; o &quot;Añadir a pantalla de inicio&quot;</>
        )}
      </p>
      <button
        onClick={handleDismiss}
        className="text-primary-600 hover:text-primary-800 text-sm font-medium shrink-0"
        aria-label="Cerrar"
      >
        Entendido
      </button>
    </div>
  );
}
