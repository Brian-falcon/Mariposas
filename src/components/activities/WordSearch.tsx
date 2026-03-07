"use client";

import { useState, useMemo } from "react";
import { Activity } from "@/types";

const DIRECTIONS = [
  { dr: 0, dc: 1 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 }, { dr: 1, dc: -1 },
  { dr: 0, dc: -1 }, { dr: -1, dc: 0 }, { dr: -1, dc: -1 }, { dr: -1, dc: 1 },
];

const FILLER = "AEIOURTLMNSP";

function generateGrid(words: string[], size: number): { grid: string[][]; positions: { word: string; positions: [number, number][] }[] } {
  const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(""));
  const positions: { word: string; positions: [number, number][] }[] = [];
  const cleanWords = [...new Set(words.map((w) => w.replace(/\s/g, "").toUpperCase()).filter((w) => w.length >= 2))];

  for (const word of cleanWords.sort((a, b) => b.length - a.length)) {
    let placed = false;
    const tries = [...Array(800)].map((_, i) => i);
    for (const _ of tries) {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
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
        break;
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
  const words = ((activity.data as { words?: string[] }).words || []);
  const { grid, positions } = useMemo(() => generateGrid(words, 18), [words.join(",")]);

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

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary-700 mb-2">
          Sopa de letras
        </h3>
        <p className="text-gray-600">
          Haz clic en la primera letra y luego en la última letra de cada nombre
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6 p-4 bg-white/80 rounded-xl">
        {positions.map((p) => (
          <span
            key={p.word}
            className={`px-4 py-2 rounded-xl font-bold text-lg transition-all ${
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
        className="inline-grid gap-1 p-6 rounded-2xl mx-auto"
        style={{
          background: "linear-gradient(145deg, #fef3e2 0%, #fde4c0 50%, #fbd49a 100%)",
          boxShadow: "0 8px 32px rgba(245,166,35,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
          gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 1fr)`,
        }}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => onClick(r, c)}
              className={`
                w-11 h-11 flex items-center justify-center text-xl font-black rounded-lg
                transition-all duration-200 select-none
                ${isFound(r, c)
                  ? "bg-emerald-500 text-white shadow-lg scale-105"
                  : isSelected(r, c)
                  ? "bg-primary-500 text-white ring-4 ring-primary-300 shadow-lg"
                  : "bg-white/90 hover:bg-primary-100 text-gray-800 shadow-md hover:scale-105"
                }
              `}
            >
              {letter}
            </button>
          ))
        )}
      </div>

      <p className="text-center mt-4 text-lg font-semibold text-gray-600">
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
