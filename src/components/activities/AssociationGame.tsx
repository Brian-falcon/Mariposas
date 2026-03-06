"use client";

import { useState } from "react";
import { Activity } from "@/types";

export function AssociationGame({ activity }: { activity: Activity }) {
  const data = activity.data as {
    groups: { items: string[]; name: string }[];
  };
  const allItems = data.groups.flatMap((g) =>
    g.items.map((item) => ({ item, group: g.name }))
  );
  const shuffled = [...allItems].sort(() => Math.random() - 0.5);
  const [selected, setSelected] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState<string | null>(null);

  const handleItemClick = (item: string, group: string) => {
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
    const group = data.groups.find((g) => g.name === groupSelected);
    if (!group) return;
    const correct = selected.length === group.items.length &&
      selected.every((s) => group.items.includes(s));
    if (correct) {
      setResult(true);
    }
  };

  const [result, setResult] = useState<boolean | null>(null);

  if (result) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">¡Muy bien agrupado! 🎉</p>
      </div>
    );
  }

  return (
    <div className="p-6">
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
