import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../../services/api/api";
import { workoutService } from "../../services/workoutService";
import { useUser } from "../../hooks/useUser";

interface Exercise {
    id: string;
    name: string;
    description?: string;
    groupMuscleId: string;
}

interface GroupMuscle {
    id: string;
    name: string;
    description?: string;
}

interface SelectedExercise {
    exerciseId: string;
    name: string;
    series: number;
    reps: number;
    groupMuscleName: string;
}

interface WorkoutFormData {
    title: string;
    description: string;
    day: number;
}

const DAYS_OF_WEEK = [
    { value: 1, label: "Segunda-feira" },
    { value: 2, label: "Terça-feira" },
    { value: 3, label: "Quarta-feira" },
    { value: 4, label: "Quinta-feira" },
    { value: 5, label: "Sexta-feira" },
    { value: 6, label: "Sábado" },
    { value: 7, label: "Domingo" },
];

export default function CreateWorkout() {
    const navigate = useNavigate();
    const { user } = useUser();

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [groupMuscles, setGroupMuscles] = useState<GroupMuscle[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const [selectedGroupMuscle, setSelectedGroupMuscle] = useState<string>("");
    const [selectedExercise, setSelectedExercise] = useState<string>("");
    const [series, setSeries] = useState<number>(3);
    const [reps, setReps] = useState<number>(12);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WorkoutFormData>({
        defaultValues: {
            title: "",
            description: "",
            day: 1,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [exercisesRes, groupMusclesRes] = await Promise.all([
                    api.get<Exercise[]>("/exercise"),
                    api.get<GroupMuscle[]>("/groupMuscle"),
                ]);
                setExercises(exercisesRes.data);
                setGroupMuscles(groupMusclesRes.data);
            } catch (error) {
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

    const onSubmit = async (data: WorkoutFormData) => {
        if (!user?.id) {
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
                userId: user.id,
                exercisesInWorkout: selectedExercises.map((ex) => ({
                    exerciseId: ex.exerciseId,
                    series: ex.series,
                    reps: ex.reps,
                })),
            });

            toast.success("Treino criado com sucesso!");
            navigate("/workouts");
        } catch (error) {
            toast.error("Erro ao criar treino. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-dark-lighter font-medium">Carregando dados...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
            <div className="w-full max-w-4xl mx-auto px-4 pt-20 pb-8 md:pt-24 md:pb-12">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Novo Treino
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3">
                        Criar Treino
                    </h1>
                    <p className="text-dark-lighter text-base md:text-lg max-w-md mx-auto">
                        Monte seu treino personalizado escolhendo exercícios e definindo séries e repetições
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Informações básicas */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Informações do Treino
                        </h2>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-dark font-medium mb-2 text-sm">
                                    Nome do Treino *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Treino de Peito e Tríceps"
                                    {...register("title", { required: "Nome é obrigatório" })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-dark font-medium mb-2 text-sm">
                                    Dia da Semana *
                                </label>
                                <select
                                    {...register("day", { required: "Selecione um dia" })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                >
                                    {DAYS_OF_WEEK.map((day) => (
                                        <option key={day.value} value={day.value}>
                                            {day.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-dark font-medium mb-2 text-sm">
                                    Descrição (opcional)
                                </label>
                                <textarea
                                    placeholder="Descreva seu treino..."
                                    {...register("description")}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Adicionar exercícios */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
                            </svg>
                            Adicionar Exercícios
                        </h2>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                            <div>
                                <label className="block text-dark font-medium mb-2 text-sm">
                                    Grupo Muscular
                                </label>
                                <select
                                    value={selectedGroupMuscle}
                                    onChange={(e) => {
                                        setSelectedGroupMuscle(e.target.value);
                                        setSelectedExercise("");
                                    }}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                >
                                    <option value="">Todos os grupos</option>
                                    {groupMuscles.map((gm) => (
                                        <option key={gm.id} value={gm.id}>
                                            {gm.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-dark font-medium mb-2 text-sm">
                                    Exercício
                                </label>
                                <select
                                    value={selectedExercise}
                                    onChange={(e) => setSelectedExercise(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                >
                                    <option value="">Selecione...</option>
                                    {filteredExercises.map((ex) => (
                                        <option key={ex.id} value={ex.id}>
                                            {ex.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-dark font-medium mb-2 text-sm">
                                    Séries
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={series}
                                    onChange={(e) => setSeries(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                />
                            </div>

                            <div>
                                <label className="block text-dark font-medium mb-2 text-sm">
                                    Repetições
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={50}
                                    value={reps}
                                    onChange={(e) => setReps(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddExercise}
                            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-primary/10 text-dark hover:text-primary-dark font-medium rounded-xl transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Adicionar Exercício
                        </button>
                    </div>

                    {/* Lista de exercícios selecionados */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            Exercícios Selecionados ({selectedExercises.length})
                        </h2>

                        {selectedExercises.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <p className="text-dark-lighter">
                                    Nenhum exercício adicionado ainda
                                </p>
                                <p className="text-dark-muted text-sm mt-1">
                                    Use o formulário acima para adicionar exercícios
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {selectedExercises.map((exercise, index) => (
                                    <div
                                        key={exercise.exerciseId}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary font-bold text-sm rounded-lg">
                                                {index + 1}
                                            </span>
                                            <div>
                                                <p className="font-medium text-dark">{exercise.name}</p>
                                                <p className="text-sm text-dark-lighter">
                                                    {exercise.groupMuscleName} • {exercise.series} séries x {exercise.reps} reps
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExercise(exercise.exerciseId)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Botões de ação */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                        <button
                            type="button"
                            onClick={() => navigate("/workouts")}
                            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-dark font-medium rounded-xl transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || selectedExercises.length === 0}
                            className={`flex items-center justify-center gap-2 px-8 py-3 font-medium rounded-xl transition-all ${isLoading || selectedExercises.length === 0
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white shadow-sm hover:shadow-md"
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Criando...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Criar Treino
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
