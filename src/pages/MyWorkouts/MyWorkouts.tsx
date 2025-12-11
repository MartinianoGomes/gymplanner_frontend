import { useNavigate } from "react-router";
import StatCard from "./components/StatCard";
import DayCard from "./components/DayCard";
import { useWorkouts } from "../../hooks/useWorkout";

export default function MyWorkouts() {
    const navigate = useNavigate();
    const { weekDays, stats, isLoading, error, refetch } = useWorkouts();

    const handleViewDay = (dayKey: string) => {
        navigate(`/workouts/${dayKey}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500">Carregando treinos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-center px-4">
                    <p className="text-red-500 text-lg">{error}</p>
                    <button
                        onClick={refetch}
                        className="bg-amber-400 hover:bg-amber-500 text-gray-800 font-medium px-6 py-2 rounded-lg transition-all"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white w-full">
            <div className="w-full max-w-4xl mx-auto px-4 pt-20 pb-8 md:pt-24 md:pb-12">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                        Cronograma Semanal
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base">
                        Visualize e gerencie seus treinos da semana
                    </p>
                </div>

                {/* Stats Cards - Grid responsivo */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-10">
                    <StatCard title="Total de Exercícios" value={stats.totalExercises} />
                    <StatCard title="Dias com Treino" value={stats.activeDays} />
                    <StatCard title="Grupos Musculares" value={stats.muscleGroups} />
                </div>

                {/* Days List */}
                <div className="flex flex-col gap-3 md:gap-4">
                    {weekDays.map((day) => (
                        <DayCard
                            key={day.id}
                            day={day}
                            onViewDay={handleViewDay}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
