"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { InstallPwaButton } from "@/components/InstallPwaButton";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";

export function Header() {
  const { student, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity touch-manipulation"
        >
          <span className="text-3xl sm:text-4xl" role="img" aria-label="Mariposa">
            🦋
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-700">
              Mariposas
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">Aprendiendo jugando</p>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <AccessibilityPanel />
          <InstallPwaButton />
          <Link
            href="/profesor"
            className="text-sm text-primary-600 hover:underline font-medium"
          >
            Panel del profesor
          </Link>
          {student ? (
            <>
              {student.slug !== "invitado" && (
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {student.name}
                </span>
              )}
              <Link
                href="/login"
                onClick={logout}
                className="text-sm text-primary-600 hover:underline font-medium"
              >
                {student.slug === "invitado" ? "Iniciar sesión" : "Cambiar alumno"}
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-primary-600 hover:underline font-medium"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
