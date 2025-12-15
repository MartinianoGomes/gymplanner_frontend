export interface Exercise {
    id: string;
    name: string;
    description?: string;
    groupMuscleId: string;
}

export interface GroupMuscle {
    id: string;
    name: string;
    description?: string;
}

export interface ExerciseInWorkout {
    id: string;
    exerciseId: string;
    series: number;
    reps: number;
    exercise: Exercise;
}

export interface Workout {
    id: string;
    title: string;
    description?: string;
    day: number;
    userId: string;
    ExercisesInWorkout: ExerciseInWorkout[];
}

export interface SelectedExercise {
    exerciseId: string;
    name: string;
    series: number;
    reps: number;
    groupMuscleName: string;
}

export interface DayInfo {
    name: string;
    number: number;
}

export const DAY_NAMES: Record<string, DayInfo> = {
    segunda: { name: "Segunda-feira", number: 1 },
    terca: { name: "Terça-feira", number: 2 },
    quarta: { name: "Quarta-feira", number: 3 },
    quinta: { name: "Quinta-feira", number: 4 },
    sexta: { name: "Sexta-feira", number: 5 },
    sabado: { name: "Sábado", number: 6 },
    domingo: { name: "Domingo", number: 7 },
};
