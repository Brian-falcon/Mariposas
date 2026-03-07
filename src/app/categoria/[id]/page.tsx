import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { getActivitiesByCategory } from "@/data/activities";

export function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

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

export default function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const category = categories.find((c) => c.id === id);
  const activities = getActivitiesByCategory(id);

  if (!category) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-primary-600 hover:underline mb-6"
      >
        ← Volver al inicio
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-6xl">{category.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((act) => (
          <Link
            key={act.id}
            href={`/actividad/${act.id}`}
            className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <h2 className="text-lg font-bold text-gray-800 mb-2">{act.title}</h2>
            <p className="text-gray-600 text-sm mb-3">{act.description}</p>
            <span
              className={`inline-block text-sm px-3 py-1 rounded-full ${difficultyColors[act.difficulty]}`}
            >
              {difficultyLabels[act.difficulty]}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
