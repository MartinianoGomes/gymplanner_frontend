import type { DayWorkout } from "../../../types/Workout";

interface DayCardProps {
    day: DayWorkout;
    onViewDay: (dayKey: string) => void;
}

export default function DayCard({ day, onViewDay }: DayCardProps) {
    const hasExercises = day.exerciseCount > 0;

    return (
        <div className="bg-gray-200 rounded-xl p-4 md:p-6 hover:bg-gray-300 transition-all">
            {/* Header - sempre em linha */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-base md:text-lg font-medium text-gray-700">
                    {day.name}
                </h3>
                <span className="text-xs md:text-sm text-gray-500 bg-gray-300 px-2 py-1 rounded-full">
                    {day.exerciseCount} {day.exerciseCount === 1 ? 'exercício' : 'exercícios'}
                </span>
            </div>

            {/* Preview de exercícios */}
            <div className="mb-4 min-h-8">
                {hasExercises ? (
                    <div className="flex flex-wrap gap-1 md:gap-2">
                        {day.preview.slice(0, 3).map((exercise, index) => (
                            <span
                                key={index}
                                className="bg-gray-300 px-2 py-1 rounded text-xs text-gray-600"
                            >
                                {exercise}
                            </span>
                        ))}
                        {day.preview.length > 3 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                                +{day.preview.length - 3} mais
                            </span>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-400 italic text-sm">Nenhum exercício cadastrado</p>
                )}
            </div>

            {/* Botão */}
            <button
                onClick={() => onViewDay(day.dayKey)}
                className="w-full md:w-auto bg-amber-400 hover:bg-amber-500 text-gray-800 font-medium px-6 py-2.5 rounded-lg transition-all text-sm md:text-base"
            >
                Ver Treino
            </button>
        </div>
    );
}
