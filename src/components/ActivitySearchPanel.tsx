"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Activity } from "@/types";
import type { Category } from "@/types";
import { normalizeSearchText } from "@/lib/searchText";

const difficultyLabels = {
  easy: "Fácil",
  medium: "Medio",
  hard: "Difícil",
};

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-orange-100 text-orange-800",
};

function buildSearchBlob(activity: Activity, categoryName: string): string {
  return [
    activity.title,
    activity.description,
    activity.type.replace(/-/g, " "),
    activity.id,
    categoryName,
  ].join(" ");
}

function filterActivities(
  activities: Activity[],
  categories: Category[],
  query: string
): Activity[] {
  const q = normalizeSearchText(query);
  if (q.length < 2) return [];

  const catName = (id: string) =>
    categories.find((c) => c.id === id)?.name ?? "";

  return activities.filter((a) => {
    const blob = normalizeSearchText(buildSearchBlob(a, catName(a.category)));
    return blob.includes(q);
  });
}

type Props = {
  activities: Activity[];
  categories: Category[];
  /** Título sobre el buscador */
  title?: string;
};

export function ActivitySearchPanel({
  activities,
  categories,
  title = "Buscar actividades",
}: Props) {
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => filterActivities(activities, categories, query),
    [activities, categories, query]
  );

  const catName = (id: string) =>
    categories.find((c) => c.id === id)?.name ?? id;

  return (
    <section className="mb-8 sm:mb-10" aria-label="Búsqueda de actividades">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">{title}</h2>
      <div className="relative max-w-2xl">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 pointer-events-none"
          aria-hidden
        >
          🔍
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej: sumar, crucigrama, colores, memoria…"
          className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100 text-gray-800 placeholder:text-gray-400"
          autoComplete="off"
          aria-label="Buscar actividades por nombre o tema"
        />
      </div>

      {query.trim().length >= 2 && (
        <div className="mt-4">
          {results.length === 0 ? (
            <p className="text-gray-600 text-sm sm:text-base">
              No hay actividades que coincidan con &quot;{query.trim()}&quot;.
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-3">
                {results.length} resultado{results.length === 1 ? "" : "s"}
              </p>
              <ul className="max-h-[min(70vh,28rem)] overflow-y-auto space-y-2 pr-1">
                {results.map((act) => (
                  <li key={act.id}>
                    <Link
                      href={`/actividad/${act.id}`}
                      className="flex flex-wrap items-center gap-2 sm:gap-3 p-4 bg-white rounded-xl shadow border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all"
                    >
                      <span className="font-semibold text-gray-800 flex-1 min-w-[12rem]">
                        {act.title}
                      </span>
                      <span className="text-xs sm:text-sm text-primary-700 bg-primary-50 px-2 py-1 rounded-lg">
                        {catName(act.category)}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${difficultyColors[act.difficulty]}`}
                      >
                        {difficultyLabels[act.difficulty]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {query.trim().length > 0 && query.trim().length < 2 && (
        <p className="mt-2 text-sm text-gray-500">Escribe al menos 2 letras para buscar.</p>
      )}
    </section>
  );
}
