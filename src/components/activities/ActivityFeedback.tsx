"use client";

type Props = {
  correct: boolean;
  message?: string;
  onRetry?: () => void;
  onNext?: () => void;
  isLast?: boolean;
  correctMessage?: string;
};

export function ActivityFeedback({
  correct,
  message,
  onRetry,
  onNext,
  isLast,
  correctMessage = "¡Correcto! 🎉",
}: Props) {
  if (correct) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-5xl text-green-600">✓</span>
        </div>
        <p className="text-3xl font-bold text-green-700 mb-4">{correctMessage}</p>
        {!isLast && onNext && (
          <button
            onClick={onNext}
            className="px-8 py-4 text-xl font-bold rounded-xl bg-primary-500 text-white hover:bg-primary-600"
          >
            Siguiente →
          </button>
        )}
        {isLast && <p className="text-lg text-gray-600">¡Completaste todas!</p>}
      </div>
    );
  }

  return (
    <div className="text-center py-12 px-4">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center border-4 border-red-300">
        <span className="text-5xl text-red-600 font-bold">✗</span>
      </div>
      <p className="text-2xl md:text-3xl font-bold text-red-700 mb-2">
        Incorrecto
      </p>
      <p className="text-lg text-red-600 mb-6">
        {message || "Intenta de nuevo. ¡Tú puedes!"}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-8 py-4 text-xl font-bold rounded-xl bg-primary-500 text-white hover:bg-primary-600"
        >
          Intentar de nuevo
        </button>
      )}
    </div>
  );
}
