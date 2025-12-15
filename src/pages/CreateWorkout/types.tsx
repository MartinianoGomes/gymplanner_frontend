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

export interface SelectedExercise {
    exerciseId: string;
    name: string;
    series: number;
    reps: number;
    groupMuscleName: string;
}

export interface WorkoutFormData {
    title: string;
    description: string;
    day: number;
}

export const DAYS_OF_WEEK = [
    { value: 1, label: "Segunda-feira" },
    { value: 2, label: "Terça-feira" },
    { value: 3, label: "Quarta-feira" },
    { value: 4, label: "Quinta-feira" },
    { value: 5, label: "Sexta-feira" },
    { value: 6, label: "Sábado" },
    { value: 7, label: "Domingo" },
];
