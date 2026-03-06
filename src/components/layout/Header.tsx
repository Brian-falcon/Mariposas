"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <span className="text-4xl" role="img" aria-label="Mariposa">
            🦋
          </span>
          <div>
            <h1 className="text-2xl font-bold text-primary-700">
              Mariposas
            </h1>
            <p className="text-sm text-gray-600">Aprendiendo jugando</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
