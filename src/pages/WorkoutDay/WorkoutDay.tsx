import { useParams } from "react-router";
import { useWorkoutDay } from "../../hooks/useWorkoutDay";
import { DAY_NAMES } from "./types";

export default function WorkoutDay() {
    const { dayKey } = useParams<{ dayKey: string }>();

    const {
        workout,
        groupMuscles,
        dayInfo,
        filteredExercises,
        isLoading,
        isCreating,
        isSaving,
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
        handleAddExercise,
        handleRemoveExercise,
        handleRemoveExistingExercise,
        handleCreateWorkout,
        handleAddExerciseToExistingWorkout,
        handleDeleteWorkout,
        getGroupMuscleName,
        navigate,
    } = useWorkoutDay({ dayKey, dayNames: DAY_NAMES });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-dark-lighter font-medium">Carregando...</p>
                </div>
            </div>
        );
    }

    if (!dayInfo) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
            <div className="w-full max-w-4xl mx-auto px-4 pt-20 pb-8 md:pt-24 md:pb-12">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/workouts")}
                        className="flex items-center gap-2 text-dark-lighter hover:text-dark transition-colors mb-4"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar para Meus Treinos
                    </button>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {dayInfo.name}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-dark">
                                {workout ? workout.title : "Criar Novo Treino"}
                            </h1>
                            {workout?.description && (
                                <p className="text-dark-lighter mt-1">{workout.description}</p>
                            )}
                        </div>

                        {workout && (
                            <button
                                onClick={handleDeleteWorkout}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                title="Excluir treino"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Se não tem treino, mostrar formulário de criação */}
                {!workout ? (
                    <div className="space-y-6">
                        {/* Informações do treino */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Informações do Treino
                            </h2>

                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-dark font-medium mb-2 text-sm">Título *</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Ex: Treino de Peito e Tríceps"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                    />
                                </div>
                                <div>
                                    <label className="block text-dark font-medium mb-2 text-sm">Descrição (opcional)</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Descreva seu treino..."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Exercícios selecionados */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-dark flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
                                    </svg>
                                    Exercícios ({selectedExercises.length})
                                </h2>
                                <button
                                    onClick={() => setShowAddForm(!showAddForm)}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary-dark font-medium rounded-xl hover:bg-primary/20 transition-all text-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Adicionar
                                </button>
                            </div>

                            {/* Formulário de adicionar exercício */}
                            {showAddForm && (
                                <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-dark font-medium mb-2 text-sm">Grupo Muscular</label>
                                            <select
                                                value={selectedGroupMuscle}
                                                onChange={(e) => {
                                                    setSelectedGroupMuscle(e.target.value);
                                                    setSelectedExercise("");
                                                }}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:border-primary focus:shadow-input-focus"
                                            >
                                                <option value="">Todos os grupos</option>
                                                {groupMuscles.map((gm) => (
                                                    <option key={gm.id} value={gm.id}>{gm.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-dark font-medium mb-2 text-sm">Exercício *</label>
                                            <select
                                                value={selectedExercise}
                                                onChange={(e) => setSelectedExercise(e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:border-primary focus:shadow-input-focus"
                                            >
                                                <option value="">Selecione...</option>
                                                {filteredExercises.map((ex) => (
                                                    <option key={ex.id} value={ex.id}>{ex.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 grid-cols-2">
                                        <div>
                                            <label className="block text-dark font-medium mb-2 text-sm">Séries</label>
                                            <input
                                                type="number"
                                                value={series}
                                                onChange={(e) => setSeries(Number(e.target.value))}
                                                min={1}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:border-primary focus:shadow-input-focus"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-dark font-medium mb-2 text-sm">Repetições</label>
                                            <input
                                                type="number"
                                                value={reps}
                                                onChange={(e) => setReps(Number(e.target.value))}
                                                min={1}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:border-primary focus:shadow-input-focus"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleAddExercise}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl transition-all"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Confirmar
                                        </button>
                                        <button
                                            onClick={() => setShowAddForm(false)}
                                            className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-dark font-medium rounded-xl transition-all"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Lista de exercícios */}
                            {selectedExercises.length === 0 ? (
                                <div className="text-center py-8 text-dark-lighter">
                                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
                                    </svg>
                                    <p>Nenhum exercício adicionado ainda</p>
                                    <p className="text-sm mt-1">Clique em "Adicionar" para começar</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {selectedExercises.map((ex, index) => (
                                        <div
                                            key={ex.exerciseId}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 bg-primary/10 text-primary font-semibold rounded-lg flex items-center justify-center text-sm">
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <p className="font-medium text-dark">{ex.name}</p>
                                                    <p className="text-sm text-dark-lighter">
                                                        {ex.groupMuscleName} • {ex.series} séries × {ex.reps} reps
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveExercise(ex.exerciseId)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Botão criar */}
                        <button
                            onClick={handleCreateWorkout}
                            disabled={isCreating || selectedExercises.length === 0 || !title.trim()}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCreating ? (
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
                ) : (
                    /* Se já tem treino, mostrar exercícios existentes */
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-dark flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
                                    </svg>
                                    Exercícios ({workout.ExercisesInWorkout.length})
                                </h2>
                                <button
                                    onClick={() => setShowAddForm(!showAddForm)}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary-dark font-medium rounded-xl hover:bg-primary/20 transition-all text-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Adicionar
                                </button>
                            </div>

                            {/* Formulário de adicionar exercício ao treino existente */}
                            {showAddForm && (
                                <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-dark font-medium mb-2 text-sm">Grupo Muscular</label>
                                            <select
                                                value={selectedGroupMuscle}
                                                onChange={(e) => {
                                                    setSelectedGroupMuscle(e.target.value);
                                                    setSelectedExercise("");
                                                }}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:border-primary focus:shadow-input-focus"
                                            >
                                                <option value="">Todos os grupos</option>
                                                {groupMuscles.map((gm) => (
                                                    <option key={gm.id} value={gm.id}>{gm.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-dark font-medium mb-2 text-sm">Exercício *</label>
                                            <select
                                                value={selectedExercise}
                                                onChange={(e) => setSelectedExercise(e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:border-primary focus:shadow-input-focus"
                                            >
                                                <option value="">Selecione...</option>
                                                {filteredExercises.map((ex) => (
                                                    <option key={ex.id} value={ex.id}>{ex.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 grid-cols-2">
                                        <div>
                                            <label className="block text-dark font-medium mb-2 text-sm">Séries</label>
                                            <input
                                                type="number"
                                                value={series}
                                                onChange={(e) => setSeries(Number(e.target.value))}
                                                min={1}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:border-primary focus:shadow-input-focus"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-dark font-medium mb-2 text-sm">Repetições</label>
                                            <input
                                                type="number"
                                                value={reps}
                                                onChange={(e) => setReps(Number(e.target.value))}
                                                min={1}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:border-primary focus:shadow-input-focus"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleAddExerciseToExistingWorkout}
                                            disabled={isSaving}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl transition-all disabled:opacity-50"
                                        >
                                            {isSaving ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                            Confirmar
                                        </button>
                                        <button
                                            onClick={() => setShowAddForm(false)}
                                            className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-dark font-medium rounded-xl transition-all"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Lista de exercícios existentes */}
                            {workout.ExercisesInWorkout.length === 0 ? (
                                <div className="text-center py-8 text-dark-lighter">
                                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
                                    </svg>
                                    <p>Nenhum exercício neste treino</p>
                                    <p className="text-sm mt-1">Clique em "Adicionar" para começar</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {workout.ExercisesInWorkout.filter(ex => ex.exercise && ex.exercise.name).map((ex, index) => (
                                        <div
                                            key={ex.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 bg-primary/10 text-primary font-semibold rounded-lg flex items-center justify-center text-sm">
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <p className="font-medium text-dark">{ex.exercise.name}</p>
                                                    <p className="text-sm text-dark-lighter">
                                                        {getGroupMuscleName(ex.exercise.groupMuscleId)} • {ex.series} séries × {ex.reps} reps
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveExistingExercise(ex.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sumário do treino */}
                        <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-2xl p-6 border border-primary/10">
                            <h3 className="font-semibold text-dark mb-3">Resumo do Treino</h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-2xl font-bold text-primary">{workout.ExercisesInWorkout.filter(ex => ex.exercise && ex.exercise.name).length}</p>
                                    <p className="text-sm text-dark-lighter">Exercícios</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-primary">
                                        {workout.ExercisesInWorkout.filter(ex => ex.exercise && ex.exercise.name).reduce((acc, ex) => acc + ex.series, 0)}
                                    </p>
                                    <p className="text-sm text-dark-lighter">Séries totais</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-primary">
                                        {new Set(workout.ExercisesInWorkout.filter(ex => ex.exercise && ex.exercise.groupMuscleId).map(ex => ex.exercise.groupMuscleId)).size}
                                    </p>
                                    <p className="text-sm text-dark-lighter">Grupos musculares</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
