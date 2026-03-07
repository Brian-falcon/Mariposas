"use client";

import { useState, useMemo } from "react";
import { Activity } from "@/types";

const ALL_DIRECTIONS = [
  { dr: 0, dc: 1 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 }, { dr: 1, dc: -1 },
  { dr: 0, dc: -1 }, { dr: -1, dc: 0 }, { dr: -1, dc: -1 }, { dr: -1, dc: 1 },
];

const HORIZONTAL_VERTICAL = [
  { dr: 0, dc: 1 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: -1, dc: 0 },
];

const FILLER = "AEIOURTLMNSP";

type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY_CONFIG: Record<Difficulty, { gridSize: number; directions: typeof ALL_DIRECTIONS; wordCount: number }> = {
  easy: { gridSize: 10, directions: HORIZONTAL_VERTICAL, wordCount: 5 },
  medium: { gridSize: 14, directions: ALL_DIRECTIONS, wordCount: 8 },
  hard: { gridSize: 18, directions: ALL_DIRECTIONS, wordCount: 14 },
};

function generateGrid(
  words: string[],
  difficulty: Difficulty
): { grid: string[][]; positions: { word: string; positions: [number, number][] }[] } {
  const config = DIFFICULTY_CONFIG[difficulty];
  const size = config.gridSize;
  const directions = config.directions;

  const allWords = words.map((w) => w.replace(/\s/g, "").toUpperCase()).filter((w) => w.length >= 2);
  const wordCount = Math.min(config.wordCount, allWords.length);
  const selectedWords = [...new Set(allWords)]
    .sort((a, b) => a.length - b.length)
    .slice(0, wordCount);

  const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(""));
  const positions: { word: string; positions: [number, number][] }[] = [];
  const cleanWords = [...selectedWords].sort((a, b) => b.length - a.length);

  for (const word of cleanWords) {
    let placed = false;
    for (let attempt = 0; attempt < 800 && !placed; attempt++) {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const pos: [number, number][] = [];
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const nr = r + i * dir.dr, nc = c + i * dir.dc;
        if (nr < 0 || nr >= size || nc < 0 || nc >= size) { ok = false; break; }
        if (grid[nr][nc] && grid[nr][nc] !== word[i]) { ok = false; break; }
        pos.push([nr, nc]);
      }
      if (ok) {
        pos.forEach(([rr, cc], i) => { grid[rr][cc] = word[i]; });
        positions.push({ word, positions: pos });
        placed = true;
      }
    }
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) grid[r][c] = FILLER[Math.floor(Math.random() * FILLER.length)];
    }
  }
  return { grid, positions };
}

export function WordSearch({ activity }: { activity: Activity }) {
  const data = activity.data as { words?: string[]; difficulty?: Difficulty };
  const words = data.words || [];
  const difficulty = (activity.difficulty || data.difficulty || "hard") as Difficulty;
  const { grid, positions } = useMemo(
    () => generateGrid(words, difficulty),
    [words.join(","), difficulty]
  );

  const [found, setFound] = useState<Set<string>>(new Set());
  const [start, setStart] = useState<[number, number] | null>(null);

  const getLine = (a: [number, number], b: [number, number]): [number, number][] => {
    const [r1, c1] = a, [r2, c2] = b;
    const steps = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1));
    if (!steps) return [a];
    const cells: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      cells.push([r1 + Math.round(((r2 - r1) * i) / steps), c1 + Math.round(((c2 - c1) * i) / steps)]);
    }
    return cells;
  };

  const onClick = (r: number, c: number) => {
    if (!start) {
      setStart([r, c]);
      return;
    }
    const cells = getLine(start, [r, c]);
    const w = cells.map(([rr, cc]) => grid[rr][cc]).join("");
    const rev = w.split("").reverse().join("");
    const match = positions.find((p) => p.word === w || p.word === rev);
    if (match && !found.has(match.word)) setFound((f) => new Set(f).add(match.word));
    setStart(null);
  };

  const isFound = (r: number, c: number) =>
    positions.some((p) => found.has(p.word) && p.positions.some(([pr, pc]) => pr === r && pc === c));

  const isSelected = (r: number, c: number) =>
    start !== null && start[0] === r && start[1] === c;

  const allFound = positions.length > 0 && positions.every((p) => found.has(p.word));

  if (positions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        No se pudieron colocar las palabras. Intenta recargar la página.
      </div>
    );
  }

  const gridSize = grid[0]?.length || 18;

  return (
    <div className="p-4 md:p-6 w-full max-w-2xl mx-auto">
      <div className="text-center mb-4 md:mb-5">
        <h3 className="text-xl md:text-2xl font-bold text-primary-700 mb-2">
          Sopa de letras
        </h3>
        <p className="text-sm md:text-base text-gray-600 mb-1">
          Haz clic en la primera letra y luego en la última letra de cada nombre
        </p>
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
          difficulty === "easy" ? "bg-green-100 text-green-800" :
          difficulty === "medium" ? "bg-yellow-100 text-yellow-800" :
          "bg-orange-100 text-orange-800"
        }`}>
          {difficulty === "easy" ? "Fácil" : difficulty === "medium" ? "Medio" : "Difícil"}
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-4 md:mb-5 p-3 md:p-4 bg-white/80 rounded-xl">
        {positions.map((p) => (
          <span
            key={p.word}
            className={`px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl font-bold text-sm md:text-lg transition-all ${
              found.has(p.word)
                ? "bg-emerald-500 text-white line-through opacity-90"
                : "bg-primary-100 text-primary-800 shadow-sm"
            }`}
          >
            {p.word}
          </span>
        ))}
      </div>

      <div
        className={`w-full mx-auto aspect-square grid gap-0.5 md:gap-1 p-3 md:p-5 rounded-xl md:rounded-2xl ${
          difficulty === "easy" ? "max-w-[min(95vw,320px)]" :
          difficulty === "medium" ? "max-w-[min(95vw,400px)]" :
          "max-w-[min(95vw,480px)]"
        }`}
        style={{
          background: "linear-gradient(145deg, #fef3e2 0%, #fde4c0 50%, #fbd49a 100%)",
          boxShadow: "0 8px 32px rgba(245,166,35,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => onClick(r, c)}
              className={`
                min-w-0 aspect-square flex items-center justify-center text-sm sm:text-base md:text-lg font-black rounded
                transition-all duration-200 select-none
                ${isFound(r, c)
                  ? "bg-emerald-500 text-white shadow-lg"
                  : isSelected(r, c)
                  ? "bg-primary-500 text-white ring-2 md:ring-4 ring-primary-300 shadow-lg"
                  : "bg-white/90 hover:bg-primary-100 text-gray-800 shadow-sm hover:shadow-md"
                }
              `}
            >
              {letter}
            </button>
          ))
        )}
      </div>

      <p className="text-center mt-4 text-base md:text-lg font-semibold text-gray-600">
        Encontrados: <span className="text-primary-600">{found.size}</span> de {positions.length}
      </p>

      {allFound && (
        <div className="text-center mt-6 py-8 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
          <p className="text-4xl mb-2">¡Excelente! 🎉</p>
          <p className="text-xl text-emerald-700 font-bold">¡Encontraste todos los nombres!</p>
        </div>
      )}
    </div>
  );
}
