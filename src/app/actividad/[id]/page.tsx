import Link from "next/link";
import { notFound } from "next/navigation";
import { getActivityById } from "@/data/activities";
import { categories } from "@/data/categories";
import { ActivityRunner } from "@/components/activities/ActivityRunner";

const difficultyLabels = {
  easy: "Fácil",
  medium: "Medio",
  hard: "Difícil",
};

export default function ActivityPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const activity = getActivityById(id);

  if (!activity) notFound();

  const category = categories.find((c) => c.id === activity.category);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href={`/categoria/${activity.category}`}
        className="inline-flex items-center gap-2 text-primary-600 hover:underline mb-6"
      >
        ← Volver a {category?.name}
      </Link>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-3xl">{category?.icon}</span>
          <h1 className="text-2xl font-bold text-gray-800">{activity.title}</h1>
          <span className="px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
            {difficultyLabels[activity.difficulty]}
          </span>
        </div>
        <p className="text-gray-600 mb-6">{activity.description}</p>

        <div className="min-h-[300px]">
          <ActivityRunner activity={activity} />
        </div>
      </div>
    </div>
  );
}
