"use client";

import { useState } from "react";
import { Activity } from "@/types";

type GroupRound = { groups: { items: string[]; name: string }[] };

export function AssociationGame({ activity }: { activity: Activity }) {
  const data = activity.data as GroupRound & { rounds?: GroupRound[] };
  const rounds: GroupRound[] = data.rounds ?? [{ groups: data.groups }];
  const [currentRound, setCurrentRound] = useState(0);

  const roundData = rounds[currentRound];
  const groups = roundData?.groups ?? [];
  const allItems = groups.flatMap((g) =>
    g.items.map((item) => ({ item, group: g.name }))
  );
  const shuffled = [...allItems].sort(() => Math.random() - 0.5);

  const [selected, setSelected] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState<string | null>(null);
  const [result, setResult] = useState<boolean | null>(null);

  const handleItemClick = (item: string, group: string) => {
    if (result !== null) return;
    if (groupSelected === null) {
      setGroupSelected(group);
      setSelected([item]);
    } else if (groupSelected === group) {
      if (!selected.includes(item)) setSelected([...selected, item]);
    } else {
      setGroupSelected(null);
      setSelected([]);
    }
  };

  const handleCheck = () => {
    if (groupSelected === null) return;
    const group = groups.find((g) => g.name === groupSelected);
    if (!group) return;
    const correct =
      selected.length === group.items.length &&
      selected.every((s) => group.items.includes(s));
    setResult(correct);
  };

  const handleNext = () => {
    setResult(null);
    setSelected([]);
    setGroupSelected(null);
    setCurrentRound((c) => c + 1);
  };

  if (!roundData) return null;

  if (result !== null) {
    const isLast = currentRound >= rounds.length - 1;
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">{result ? "¡Muy bien agrupado! 🎉" : "Intenta de nuevo"}</p>
        {result && !isLast && (
          <button
            onClick={handleNext}
            className="mt-4 px-8 py-4 text-xl font-bold rounded-xl bg-primary-500 text-white"
          >
            Siguiente →
          </button>
        )}
        {result && isLast && <p className="text-lg text-gray-600">¡Completaste todas!</p>}
        {!result && (
          <button
            onClick={() => {
              setResult(null);
              setSelected([]);
              setGroupSelected(null);
            }}
            className="mt-4 px-8 py-4 text-xl font-bold rounded-xl bg-primary-500 text-white"
          >
            Intentar de nuevo
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-6">
      {rounds.length > 1 && (
        <p className="text-lg text-center text-gray-500 mb-2">
          Ejercicio {currentRound + 1} de {rounds.length}
        </p>
      )}
      <p className="text-xl text-center mb-6">
        Agrupa los que van juntos (toca varios del mismo grupo)
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {shuffled.map(({ item, group }, i) => (
          <button
            key={i}
            onClick={() => handleItemClick(item, group)}
            className={`w-24 h-24 text-5xl flex items-center justify-center rounded-2xl transition-all ${
              selected.includes(item) ? "ring-4 ring-green-500 bg-green-100" : "bg-primary-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      {groupSelected && (
        <div className="text-center">
          <button
            onClick={handleCheck}
            className="px-8 py-4 text-xl font-bold rounded-xl bg-green-500 text-white"
          >
            Verificar grupo
          </button>
        </div>
      )}
    </div>
  );
}
