"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto py-6" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-lg text-gray-600">
            <span className="text-2xl" role="img" aria-hidden>🦋</span>{" "}
            Mariposas - Plataforma educativa inclusiva para aprender jugando
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" aria-label="Enlaces del sitio">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary-600 hover:underline transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/profesor"
              className="text-gray-600 hover:text-primary-600 hover:underline transition-colors"
            >
              Panel del profesor
            </Link>
            <button
              type="button"
              onClick={() => {
                const btn = document.querySelector('[aria-label="Opciones de accesibilidad"]') as HTMLButtonElement | null;
                if (btn) btn.click();
              }}
              className="text-gray-600 hover:text-primary-600 hover:underline transition-colors bg-transparent border-none cursor-pointer text-base font-normal"
            >
              Accesibilidad
            </button>
          </nav>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          © {currentYear} Mariposas. Diseñado para personas con distintas capacidades.
        </p>
      </div>
    </footer>
  );
}
