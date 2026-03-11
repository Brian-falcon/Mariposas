import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-8xl mb-4" role="img" aria-hidden>
        🦋
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-2">
        Página no encontrada
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Lo sentimos, la página que buscas no existe. Puedes volver al inicio para seguir aprendiendo.
      </p>
      <Link
        href="/"
        className="btn-primary inline-flex items-center gap-2 px-8 py-4"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
