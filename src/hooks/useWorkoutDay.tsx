import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { exerciseService } from "../services/exerciseService";
import { workoutService } from "../services/workoutService";
import { useUser } from "./useUser";
import type {
    Exercise,
    GroupMuscle,
    Workout,
    SelectedExercise,
    DayInfo,
    DAY_NAMES
} from "../pages/WorkoutDay/types";

interface UseWorkoutDayParams {
    dayKey: string | undefined;
    dayNames: typeof DAY_NAMES;
}

export function useWorkoutDay({ dayKey, dayNames }: UseWorkoutDayParams) {
    const navigate = useNavigate();
    const { user } = useUser();

    const [workout, setWorkout] = useState<Workout | null>(null);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [groupMuscles, setGroupMuscles] = useState<GroupMuscle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([]);

    // Add exercise states
    const [selectedGroupMuscle, setSelectedGroupMuscle] = useState<string>("");
    const [selectedExercise, setSelectedExercise] = useState<string>("");
    const [series, setSeries] = useState<number>(3);
    const [reps, setReps] = useState<number>(12);
    const [showAddForm, setShowAddForm] = useState(false);

    const dayInfo: DayInfo | null = dayKey ? dayNames[dayKey] : null;

    useEffect(() => {
        if (!dayInfo) {
            toast.error("Dia inválido");
            navigate("/workouts");
            return;
        }

        const fetchData = async () => {
            try {
                const [exercisesData, groupMusclesData, workoutsData] = await Promise.all([
                    exerciseService.getAll(),
                    exerciseService.getGroupMuscles(),
                    workoutService.getAll(),
                ]);

                setExercises(exercisesData);
                setGroupMuscles(groupMusclesData);

                // Find workout for this day
                const dayWorkout = workoutsData.find(w => w.day === dayInfo.number);
                if (dayWorkout) {
                    setWorkout(dayWorkout);
                    setTitle(dayWorkout.title);
                    setDescription(dayWorkout.description || "");
                }
            } catch {
                toast.error("Erro ao carregar dados");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dayInfo, navigate]);

    const getGroupMuscleName = (groupMuscleId: string) => {
        return groupMuscles.find(g => g.id === groupMuscleId)?.name || "Desconhecido";
    };

    const filteredExercises = selectedGroupMuscle
        ? exercises.filter((ex) => ex.groupMuscleId === selectedGroupMuscle)
        : exercises;

    const handleAddExercise = () => {
        if (!selectedExercise) {
            toast.error("Selecione um exercício");
            return;
        }

        const exercise = exercises.find(ex => ex.id === selectedExercise);
        if (!exercise) return;

        const alreadyAdded = selectedExercises.some(ex => ex.exerciseId === selectedExercise);
        if (alreadyAdded) {
            toast.error("Este exercício já foi adicionado");
            return;
        }

        setSelectedExercises([
            ...selectedExercises,
            {
                exerciseId: exercise.id,
                name: exercise.name,
                series,
                reps,
                groupMuscleName: getGroupMuscleName(exercise.groupMuscleId),
            },
        ]);

        setSelectedExercise("");
        setSeries(3);
        setReps(12);
        setShowAddForm(false);
        toast.success("Exercício adicionado");
    };

    const handleRemoveExercise = (exerciseId: string) => {
        setSelectedExercises(selectedExercises.filter(ex => ex.exerciseId !== exerciseId));
    };

    const handleRemoveExistingExercise = async (exerciseInWorkoutId: string) => {
        if (!confirm("Tem certeza que deseja remover este exercício?")) return;

        try {
            await workoutService.removeExercise(exerciseInWorkoutId);
            setWorkout(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    ExercisesInWorkout: prev.ExercisesInWorkout.filter(e => e.id !== exerciseInWorkoutId),
                };
            });
            toast.success("Exercício removido");
        } catch {
            toast.error("Erro ao remover exercício");
        }
    };

    const handleCreateWorkout = async () => {
        if (!title.trim()) {
            toast.error("Digite um título para o treino");
            return;
        }

        if (selectedExercises.length === 0) {
            toast.error("Adicione pelo menos um exercício");
            return;
        }

        if (!user?.id || !dayInfo) return;

        setIsCreating(true);
        try {
            await workoutService.create({
                title,
                description,
                day: dayInfo.number,
                userId: user.id,
                exercisesInWorkout: selectedExercises.map(ex => ({
                    exerciseId: ex.exerciseId,
                    series: ex.series,
                    reps: ex.reps,
                })),
            });

            toast.success("Treino criado com sucesso!");
            navigate("/workouts");
        } catch {
            toast.error("Erro ao criar treino");
        } finally {
            setIsCreating(false);
        }
    };

    const handleAddExerciseToExistingWorkout = async () => {
        if (!selectedExercise || !workout) {
            toast.error("Selecione um exercício");
            return;
        }

        const alreadyExists = workout.ExercisesInWorkout.some(e => e.exerciseId === selectedExercise);
        if (alreadyExists) {
            toast.error("Este exercício já está no treino");
            return;
        }

        setIsSaving(true);
        try {
            const newExercise = await workoutService.addExercise(workout.id, {
                exerciseId: selectedExercise,
                series,
                reps,
            });

            setWorkout(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    ExercisesInWorkout: [...prev.ExercisesInWorkout, newExercise],
                };
            });

            setSelectedExercise("");
            setSeries(3);
            setReps(12);
            setShowAddForm(false);
            toast.success("Exercício adicionado ao treino");
        } catch {
            toast.error("Erro ao adicionar exercício");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteWorkout = async () => {
        if (!workout) return;
        if (!confirm("Tem certeza que deseja excluir este treino? Esta ação não pode ser desfeita.")) return;

        try {
            await workoutService.delete(workout.id);
            toast.success("Treino excluído com sucesso");
            navigate("/workouts");
        } catch (error) {
            console.error("Erro ao excluir treino:", error);
            toast.error("Erro ao excluir treino");
        }
    };

    return {
        // Data
        workout,
        exercises,
        groupMuscles,
        dayInfo,
        filteredExercises,

        // Loading states
        isLoading,
        isCreating,
        isSaving,

        // Form states
        title,
        setTitle,
        description,
        setDescription,
        selectedExercises,
        selectedGroupMuscle,
        setSelectedGroupMuscle,
        selectedExercise,
        setSelectedExercise,
        series,
        setSeries,
        reps,
        setReps,
        showAddForm,
        setShowAddForm,

        // Handlers
        handleAddExercise,
        handleRemoveExercise,
        handleRemoveExistingExercise,
        handleCreateWorkout,
        handleAddExerciseToExistingWorkout,
        handleDeleteWorkout,
        getGroupMuscleName,

        // Navigation
        navigate,
    };
}
