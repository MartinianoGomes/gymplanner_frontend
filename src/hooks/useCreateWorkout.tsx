import { useState, useEffect } from "react";
import { toast } from "sonner";
import { exerciseService } from "../services/exerciseService";
import { workoutService } from "../services/workoutService";
import type { Exercise, GroupMuscle, SelectedExercise, WorkoutFormData } from "../pages/CreateWorkout/types";

export function useCreateWorkout(userId: string | undefined, onSuccess: () => void) {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [groupMuscles, setGroupMuscles] = useState<GroupMuscle[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const [selectedGroupMuscle, setSelectedGroupMuscle] = useState<string>("");
    const [selectedExercise, setSelectedExercise] = useState<string>("");
    const [series, setSeries] = useState<number>(3);
    const [reps, setReps] = useState<number>(12);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [exercisesData, groupMusclesData] = await Promise.all([
                    exerciseService.getAll(),
                    exerciseService.getGroupMuscles(),
                ]);
                setExercises(exercisesData);
                setGroupMuscles(groupMusclesData);
            } catch {
                toast.error("Erro ao carregar dados. Tente novamente.");
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchData();
    }, []);

    const filteredExercises = selectedGroupMuscle
        ? exercises.filter((ex) => ex.groupMuscleId === selectedGroupMuscle)
        : exercises;

    const handleAddExercise = () => {
        if (!selectedExercise) {
            toast.error("Selecione um exercício");
            return;
        }

        const exercise = exercises.find((ex) => ex.id === selectedExercise);
        const groupMuscle = groupMuscles.find((gm) => gm.id === exercise?.groupMuscleId);

        if (!exercise) return;

        const alreadyAdded = selectedExercises.some(
            (ex) => ex.exerciseId === selectedExercise
        );

        if (alreadyAdded) {
            toast.error("Este exercício já foi adicionado");
            return;
        }

        setSelectedExercises((prev) => [
            ...prev,
            {
                exerciseId: exercise.id,
                name: exercise.name,
                series,
                reps,
                groupMuscleName: groupMuscle?.name || "Desconhecido",
            },
        ]);

        setSelectedExercise("");
        setSeries(3);
        setReps(12);
        toast.success("Exercício adicionado!");
    };

    const handleRemoveExercise = (exerciseId: string) => {
        setSelectedExercises((prev) =>
            prev.filter((ex) => ex.exerciseId !== exerciseId)
        );
    };

    const handleSubmit = async (data: WorkoutFormData) => {
        if (!userId) {
            toast.error("Usuário não identificado");
            return;
        }

        if (selectedExercises.length === 0) {
            toast.error("Adicione pelo menos um exercício ao treino");
            return;
        }

        setIsLoading(true);

        try {
            await workoutService.create({
                title: data.title,
                description: data.description,
                day: Number(data.day),
                userId: userId,
                exercisesInWorkout: selectedExercises.map((ex) => ({
                    exerciseId: ex.exerciseId,
                    series: ex.series,
                    reps: ex.reps,
                })),
            });

            toast.success("Treino criado com sucesso!");
            onSuccess();
        } catch {
            toast.error("Erro ao criar treino. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        exercises,
        groupMuscles,
        selectedExercises,
        isLoading,
        isLoadingData,
        selectedGroupMuscle,
        setSelectedGroupMuscle,
        selectedExercise,
        setSelectedExercise,
        series,
        setSeries,
        reps,
        setReps,
        filteredExercises,
        handleAddExercise,
        handleRemoveExercise,
        handleSubmit,
    };
}
