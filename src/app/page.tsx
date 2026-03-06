import Link from "next/link";
import { categories } from "@/data/categories";
import { allActivities } from "@/data/activities";

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

export default function HomePage() {
  const totalActivities = allActivities.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-4">
          ¡Bienvenido a Mariposas! 🦋
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Plataforma educativa con{" "}
          <span className="font-bold text-primary-600">{totalActivities} actividades</span>{" "}
          para aprender jugando. Elige una categoría para comenzar.
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const count = allActivities.filter((a) => a.category === cat.id).length;
          return (
            <Link
              key={cat.id}
              href={`/categoria/${cat.id}`}
              className="block"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all border-2 border-transparent hover:border-primary-300">
                <span className="text-5xl block mb-3">{cat.icon}</span>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{cat.name}</h2>
                <p className="text-gray-600 text-sm mb-3">{cat.description}</p>
                <p className="text-primary-600 font-semibold">{count} actividades</p>
              </div>
            </Link>
          );
        })}
      </div>

      <section className="mt-12 p-6 bg-white rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">Todas las actividades</h2>
        <div className="flex flex-wrap gap-2">
          {allActivities.map((act) => (
            <Link
              key={act.id}
              href={`/actividad/${act.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50 hover:bg-primary-100"
            >
              <span>{act.title}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[act.difficulty]}`}
              >
                {difficultyLabels[act.difficulty]}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
