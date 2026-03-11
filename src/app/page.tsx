import Link from "next/link";
import { categories } from "@/data/categories";
import { allActivities } from "@/data/activities";
import { WelcomeSection } from "@/components/WelcomeSection";

export default function HomePage() {
  const totalActivities = allActivities.length;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
      <WelcomeSection />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="navigation" aria-label="Categorías de actividades">
        {categories.map((cat) => {
          const count = allActivities.filter((a) => a.category === cat.id).length;
          return (
            <Link
              key={cat.id}
              href={`/categoria/${cat.id}`}
              className="block focus:outline-none focus:ring-4 focus:ring-primary-400 rounded-2xl"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all border-2 border-transparent hover:border-primary-300">
                <span className="text-5xl block mb-3" aria-hidden>{cat.icon}</span>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{cat.name}</h2>
                <p className="text-gray-600 text-sm mb-3">{cat.description}</p>
                <p className="text-primary-600 font-semibold">{count} actividades</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
