// Tipos da API - Workout
export interface Workout {
    id: string;
    title: string;
    description?: string;
    day: number;
    userId: string;
    createdAt: string;
    updatedAt?: string;
    ExercisesInWorkout: ExerciseInWorkout[];
}

export interface ExerciseInWorkout {
    id: string;
    series: number;
    reps: number;
    workoutId: string;
    exerciseId: string;
    exercise: {
        id: string;
        name: string;
        description?: string;
        groupMuscleId: string;
        groupMuscle?: {
            id: string;
            name: string;
            description?: string;
        };
    };
}

// Tipos para a UI
export interface DayWorkout {
    id: string;
    name: string;
    dayKey: string;
    dayNumber: number;
    exerciseCount: number;
    preview: string[];
    workoutId?: string;
    workoutTitle?: string;
}

export interface WorkoutStats {
    totalExercises: number;
    activeDays: number;
    muscleGroups: number;
}
