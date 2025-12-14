import { useMemo } from "react";
import type { Workout } from "../../../types/Workout";

interface ReportSectionProps {
    workouts: Workout[];
}

interface MuscleGroupData {
    name: string;
    count: number;
    percentage: number;
    color: string;
}

const MUSCLE_GROUP_NAMES: Record<string, string> = {
    "peito": "Peito",
    "costas": "Costas",
    "pernas": "Pernas",
    "ombros": "Ombros",
    "biceps": "Bíceps",
    "triceps": "Tríceps",
    "abdomen": "Abdômen",
    "gluteos": "Glúteos",
    "panturrilha": "Panturrilha",
    "antebraco": "Antebraço",
};

const COLORS = [
    "bg-primary",
    "bg-primary-dark",
    "bg-primary-light",
    "bg-dark",
    "bg-dark-light",
    "bg-dark-lighter",
    "bg-primary-700",
    "bg-dark-muted",
    "bg-primary-300",
    "bg-dark-disabled",
];

export default function ReportSection({ workouts }: ReportSectionProps) {
    const reportData = useMemo(() => {
        // Contagem de exercícios por grupo muscular
        const muscleGroupCount: Record<string, number> = {};
        let totalExercises = 0;

        workouts.forEach(workout => {
            workout.ExercisesInWorkout?.forEach(exercise => {
                const groupId = exercise.exercise.groupMuscleId;
                muscleGroupCount[groupId] = (muscleGroupCount[groupId] || 0) + 1;
                totalExercises++;
            });
        });

        // Converter para array ordenado
        const muscleGroups: MuscleGroupData[] = Object.entries(muscleGroupCount)
            .map(([id, count], index) => ({
                name: MUSCLE_GROUP_NAMES[id] || `Grupo ${id.slice(0, 8)}`,
                count,
                percentage: totalExercises > 0 ? Math.round((count / totalExercises) * 100) : 0,
                color: COLORS[index % COLORS.length],
            }))
            .sort((a, b) => b.count - a.count);

        // Exercícios por dia da semana
        const exercisesByDay = Array(7).fill(0);
        workouts.forEach(workout => {
            if (workout.day >= 1 && workout.day <= 7) {
                exercisesByDay[workout.day - 1] = workout.ExercisesInWorkout?.length || 0;
            }
        });

        // Total de séries e repetições
        let totalSeries = 0;
        let totalReps = 0;
        workouts.forEach(workout => {
            workout.ExercisesInWorkout?.forEach(exercise => {
                totalSeries += exercise.series || 0;
                totalReps += (exercise.series || 0) * (exercise.reps || 0);
            });
        });

        return {
            muscleGroups,
            totalExercises,
            exercisesByDay,
            totalSeries,
            totalReps,
            avgExercisesPerDay: workouts.length > 0
                ? Math.round(totalExercises / workouts.filter(w => (w.ExercisesInWorkout?.length || 0) > 0).length) || 0
                : 0,
        };
    }, [workouts]);

    const dayNames = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    const maxExercises = Math.max(...reportData.exercisesByDay, 1);

    if (reportData.totalExercises === 0) {
        return (
            <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-6 md:p-8 border border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-dark mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Relatórios
                </h2>
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <p className="text-dark-lighter">Adicione exercícios aos seus treinos para ver os relatórios</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-6 md:p-8 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Relatórios
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
                            </svg>
                        </div>
                        <span className="text-xs text-dark-lighter">Total Séries</span>
                    </div>
                    <p className="text-2xl font-bold text-dark">{reportData.totalSeries}</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <span className="text-xs text-dark-lighter">Total Reps</span>
                    </div>
                    <p className="text-2xl font-bold text-dark">{reportData.totalReps}</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-xs text-dark-lighter">Média/Dia</span>
                    </div>
                    <p className="text-2xl font-bold text-dark">{reportData.avgExercisesPerDay}</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                            </svg>
                        </div>
                        <span className="text-xs text-dark-lighter">Grupos</span>
                    </div>
                    <p className="text-2xl font-bold text-dark">{reportData.muscleGroups.length}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4 text-dark-lighter" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Exercícios por Dia
                    </h3>
                    <div className="flex items-end justify-between h-32 gap-2">
                        {reportData.exercisesByDay.map((count, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                                <div
                                    className={`w-full rounded-t-md transition-all duration-300 ${count > 0 ? 'bg-linear-to-t from-primary-dark to-primary' : 'bg-gray-200'
                                        }`}
                                    style={{
                                        height: `${count > 0 ? (count / maxExercises) * 100 : 10}%`,
                                        minHeight: '8px'
                                    }}
                                />
                                <span className="text-xs text-dark-lighter mt-2 font-medium">{dayNames[index]}</span>
                                <span className="text-xs text-dark-muted">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4 text-dark-lighter" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                        Grupos Musculares
                    </h3>
                    <div className="space-y-3">
                        {reportData.muscleGroups.slice(0, 5).map((group, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${group.color}`} />
                                <div className="flex-1">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-dark font-medium">{group.name}</span>
                                        <span className="text-dark-lighter">{group.count} ex. ({group.percentage}%)</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${group.color} transition-all duration-500`}
                                            style={{ width: `${group.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {reportData.muscleGroups.length === 0 && (
                            <p className="text-dark-lighter text-sm text-center py-4">
                                Nenhum grupo muscular registrado
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm text-dark font-medium">Dica de treino</p>
                    <p className="text-xs text-dark-light mt-1">
                        Para um treino equilibrado, tente distribuir os exercícios entre diferentes grupos musculares
                        e mantenha pelo menos 1 dia de descanso entre treinos do mesmo grupo.
                    </p>
                </div>
            </div>
        </div>
    );
}
