import { useState, useEffect } from "react";
import { workoutService } from "../services/workoutService";
import type { Workout, DayWorkout, WorkoutStats } from "../types/Workout";
import { toast } from "sonner";

const DAY_NAMES: Record<number, { name: string; key: string }> = {
    1: { name: "Segunda-feira", key: "segunda" },
    2: { name: "Terça-feira", key: "terca" },
    3: { name: "Quarta-feira", key: "quarta" },
    4: { name: "Quinta-feira", key: "quinta" },
    5: { name: "Sexta-feira", key: "sexta" },
    6: { name: "Sábado", key: "sabado" },
    7: { name: "Domingo", key: "domingo" },
};

export function useWorkouts() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWorkouts = async () => {
        try {
            setIsLoading(true);
            const data = await workoutService.getAll();
            setWorkouts(data);
        } catch {
            toast.error("Erro ao carregar treinos. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const weekDays: DayWorkout[] = Object.entries(DAY_NAMES).map(([dayNumber, { name, key }]) => {
        const dayNum = parseInt(dayNumber);
        const workout = workouts.find(w => w.day === dayNum);

        return {
            id: dayNumber,
            name,
            dayKey: key,
            dayNumber: dayNum,
            exerciseCount: workout?.ExercisesInWorkout?.length ?? 0,
            preview: workout?.ExercisesInWorkout?.slice(0, 3).map(e => e.exercise.name) ?? [],
            workoutId: workout?.id,
            workoutTitle: workout?.title,
        };
    });

    const stats: WorkoutStats = {
        totalExercises: workouts.reduce((acc, w) => acc + (w.ExercisesInWorkout?.length ?? 0), 0),
        activeDays: workouts.filter(w => w.ExercisesInWorkout?.length > 0).length,
        muscleGroups: new Set(
            workouts.flatMap(w => w.ExercisesInWorkout?.map(e => e.exercise.groupMuscleId) ?? [])
        ).size,
    };

    return { workouts, weekDays, stats, isLoading, refetch: fetchWorkouts };
}
