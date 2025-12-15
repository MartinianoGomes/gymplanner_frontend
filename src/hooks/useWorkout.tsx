import { useState, useEffect } from "react";
import { workoutService } from "../services/workoutService";
import type { Workout, DayWorkout, WorkoutStats } from "../types/Workout";
import { toast } from "sonner";
import { useUser } from "./useUser";

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
    const { user } = useUser();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWorkouts = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await workoutService.getMyWorkouts();
            setWorkouts(data);
        } catch {
            setError("Erro ao carregar treinos. Tente novamente.");
            toast.error("Erro ao carregar treinos. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Limpa os treinos quando o usuário muda
        setWorkouts([]);
        if (user?.id) {
            fetchWorkouts();
        }
    }, [user?.id]);

    const weekDays: DayWorkout[] = Object.entries(DAY_NAMES).map(([dayNumber, { name, key }]) => {
        const dayNum = parseInt(dayNumber);
        const workout = workouts.find(w => w.day === dayNum);

        // Filtrar exercícios que podem ter sido deletados (exercise pode ser null)
        const validExercises = workout?.ExercisesInWorkout?.filter(e => e.exercise && e.exercise.name) ?? [];

        return {
            id: dayNumber,
            name,
            dayKey: key,
            dayNumber: dayNum,
            exerciseCount: validExercises.length,
            preview: validExercises.slice(0, 3).map(e => e.exercise.name),
            workoutId: workout?.id,
            workoutTitle: workout?.title,
        };
    });

    const stats: WorkoutStats = {
        totalExercises: workouts.reduce((acc, w) => acc + (w.ExercisesInWorkout?.length || 0), 0),
        activeDays: new Set(workouts.filter(w => (w.ExercisesInWorkout?.length || 0) > 0).map(w => w.day)).size,
        muscleGroups: new Set(
            workouts.flatMap(w => w.ExercisesInWorkout?.map(e => e.exercise.groupMuscleId) || [])
        ).size,
    };

    return { workouts, weekDays, stats, isLoading, error, refetch: fetchWorkouts };
}
