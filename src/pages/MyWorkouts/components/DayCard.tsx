import type { DayWorkout } from "../../../types/Workout";

interface DayCardProps {
    day: DayWorkout;
    onViewDay: (dayKey: string) => void;
}

const DayIcon = ({ dayNumber, hasExercises }: { dayNumber: number; hasExercises: boolean }) => {
    const baseClass = `w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${hasExercises
        ? 'bg-gradient-to-br from-primary/20 to-primary-light/10 group-hover:from-primary/30 group-hover:to-primary-light/20'
        : 'bg-gray-100 group-hover:bg-gray-200'
        }`;
    const iconClass = `w-5 h-5 transition-all duration-300 ${hasExercises
        ? 'text-primary group-hover:text-primary-dark group-hover:scale-110'
        : 'text-gray-400 group-hover:text-gray-500'
        }`;

    if (dayNumber === 7) {
        return (
            <div className={baseClass}>
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            </div>
        );
    }

    if (dayNumber === 6) {
        return (
            <div className={baseClass}>
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
        );
    }

    return (
        <div className={baseClass}>
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
            </svg>
        </div>
    );
};

export default function DayCard({ day, onViewDay }: DayCardProps) {
    const hasExercises = day.exerciseCount > 0;

    return (
        <div className={`group bg-white rounded-2xl p-5 md:p-6 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${hasExercises ? 'border-primary/30 shadow-sm hover:border-primary/50' : 'border-gray-100 hover:border-gray-200'
            }`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <DayIcon dayNumber={day.dayNumber} hasExercises={hasExercises} />
                    <div>
                        <h3 className="text-base md:text-lg font-semibold text-dark group-hover:text-dark">
                            {day.name}
                        </h3>
                        {day.workoutTitle && (
                            <p className="text-xs text-primary font-medium">{day.workoutTitle}</p>
                        )}
                    </div>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${hasExercises
                    ? 'bg-primary/10 text-primary-dark group-hover:bg-primary/20'
                    : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                    }`}>
                    <span className="text-lg">{day.exerciseCount}</span>
                    <span className="text-xs hidden sm:inline">
                        {day.exerciseCount === 1 ? 'exercício' : 'exercícios'}
                    </span>
                </div>
            </div>

            <div className="mb-4 min-h-10">
                {hasExercises ? (
                    <div className="flex flex-wrap gap-2">
                        {day.preview.slice(0, 4).map((exercise, index) => (
                            <span
                                key={index}
                                className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg text-xs text-dark font-medium transition-all duration-300 group-hover:border-primary/30 group-hover:from-primary/5 group-hover:to-primary-light/5"
                            >
                                {exercise}
                            </span>
                        ))}
                        {day.preview.length > 4 && (
                            <span className="text-xs text-primary font-medium px-3 py-1.5 bg-primary/10 rounded-lg transition-all duration-300 group-hover:bg-primary/20">
                                +{day.preview.length - 4} mais
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p className="italic text-sm">Dia de descanso ou sem treino</p>
                    </div>
                )}
            </div>

            <button
                onClick={() => onViewDay(day.dayKey)}
                className={`w-full flex items-center justify-center gap-2 font-medium px-6 py-3 rounded-xl transition-all duration-300 text-sm md:text-base ${hasExercises
                    ? 'bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white shadow-sm hover:shadow-md hover:scale-[1.02]'
                    : 'bg-gray-100 hover:bg-primary/10 text-gray-600 hover:text-primary-dark'
                    }`}
            >
                {hasExercises ? (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver Treino
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Adicionar Treino
                    </>
                )}
            </button>
        </div>
    );
}
