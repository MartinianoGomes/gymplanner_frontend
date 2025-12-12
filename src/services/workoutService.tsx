import { api } from "./api/api";
import type { Workout, ExerciseInWorkout } from "../types/Workout";

export const workoutService = {
    create: (
        data: {
            title: string;
            description?: string;
            day: number;
            userId: string;
            exercisesInWorkout?: { exerciseId: string; series: number; reps: number }[];
        }) =>
        api.post<Workout>("/workout/create", data).then(res => res.data),

    getById: (id: string) =>
        api.get<Workout>(`/workout/${id}`).then(res => res.data),

    getMyWorkouts: () =>
        api.get<Workout[]>("/workout").then(res => res.data),

    update: (id: string, data: { title?: string; description?: string; day?: number }) =>
        api.patch<Workout>(`/workout/update/${id}`, data).then(res => res.data),

    delete: (id: string) =>
        api.delete(`/workout/delete/${id}`),

    addExercise: (workoutId: string, data: { exerciseId: string; series: number; reps: number }) =>
        api.post<ExerciseInWorkout>(`/workout/exercise/add/${workoutId}`, data).then(res => res.data),

    removeExercise: (exerciseInWorkoutId: string) =>
        api.delete(`/workout/exercise/delete/${exerciseInWorkoutId}`),
};
