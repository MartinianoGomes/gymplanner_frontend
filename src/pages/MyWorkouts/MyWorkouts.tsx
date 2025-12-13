import { useNavigate } from "react-router";
import { useState } from "react";
import StatCard from "./components/StatCard";
import DayCard from "./components/DayCard";
import ReportSection from "./components/ReportSection";
import { useWorkouts } from "../../hooks/useWorkout";

export default function MyWorkouts() {
    const navigate = useNavigate();
    const { workouts, weekDays, stats, isLoading, error, refetch } = useWorkouts();
    const [activeTab, setActiveTab] = useState<"schedule" | "reports">("schedule");

    const handleViewDay = (dayKey: string) => {
        navigate(`/workout/${dayKey}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-dark-lighter font-medium">Carregando treinos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-center px-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-red-500 text-lg font-medium">{error}</p>
                    <button
                        onClick={refetch}
                        className="bg-linear-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 w-full flex items-center justify-center">
            <div className="w-full max-w-5xl mx-auto px-4 pt-20 pb-8 md:pt-24 md:pb-12">
                <div className="text-center mb-8 md:mb-10">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
                        </svg>
                        Seu Progresso
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3">
                        Meus Treinos
                    </h1>
                    <p className="text-dark-lighter text-base md:text-lg max-w-md mx-auto">
                        Gerencie sua rotina de exercícios e acompanhe seu progresso semanal
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-3 md:gap-5 mb-8 md:mb-10">
                    <StatCard title="Total de Exercícios" value={stats.totalExercises} icon="exercise" />
                    <StatCard title="Dias com Treino" value={stats.activeDays} icon="days" />
                    <StatCard title="Grupos Musculares" value={stats.muscleGroups} icon="muscle" />
                </div>

                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 inline-flex gap-1">
                        <button
                            onClick={() => setActiveTab("schedule")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "schedule"
                                ? "bg-linear-to-r from-primary to-primary-light text-white shadow-sm"
                                : "text-dark-lighter hover:text-dark hover:bg-gray-50"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Cronograma
                        </button>
                        <button
                            onClick={() => setActiveTab("reports")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "reports"
                                ? "bg-linear-to-r from-primary to-primary-light text-white shadow-sm"
                                : "text-dark-lighter hover:text-dark hover:bg-gray-50"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Relatórios
                        </button>
                    </div>
                </div>

                {activeTab === "schedule" ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg md:text-xl font-semibold text-dark flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Cronograma Semanal
                            </h2>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            {weekDays.map((day) => (
                                <DayCard
                                    key={day.id}
                                    day={day}
                                    onViewDay={handleViewDay}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <ReportSection workouts={workouts} />
                )}
            </div>
        </div>
    );
}
