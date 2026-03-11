"use client";

type CategoryStat = {
  id: string;
  name: string;
  icon: string;
  completed: number;
  correct: number;
  total: number;
};

export function CategoryBarChart({ stats }: { stats: CategoryStat[] }) {
  if (stats.length === 0) return null;
  const maxCompleted = Math.max(...stats.map((s) => s.completed), 1);

  return (
    <div className="space-y-3" role="img" aria-label="Gráfico de progreso por categoría">
      {stats.map((cat) => (
        <div key={cat.id} className="flex items-center gap-3">
          <span className="text-lg w-8 flex-shrink-0" aria-hidden>
            {cat.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-800 truncate">{cat.name}</span>
              <span className="text-gray-600 flex-shrink-0 ml-2">
                {cat.completed} / {cat.total}
                {cat.total > 0 && cat.correct > 0 && (
                  <span className="text-green-600 ml-1">
                    ({Math.round((cat.correct / cat.total) * 100)}%)
                  </span>
                )}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${(cat.completed / maxCompleted) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
