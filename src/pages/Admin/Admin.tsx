import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "../../services/api/api";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router";

interface GroupMuscle {
    id: string;
    name: string;
    description?: string;
    createdAt?: string;
}

interface Exercise {
    id: string;
    name: string;
    description?: string;
    groupMuscleId: string;
    createdAt?: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
}

type Tab = "groupMuscles" | "exercises" | "users";

export default function Admin() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>("users");

    // Estados para Grupos Musculares
    const [groupMuscles, setGroupMuscles] = useState<GroupMuscle[]>([]);
    const [isLoadingGroups, setIsLoadingGroups] = useState(true);
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupDescription, setNewGroupDescription] = useState("");
    const [editingGroup, setEditingGroup] = useState<GroupMuscle | null>(null);
    const [isSubmittingGroup, setIsSubmittingGroup] = useState(false);

    // Estados para Exercícios
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoadingExercises, setIsLoadingExercises] = useState(true);
    const [newExerciseName, setNewExerciseName] = useState("");
    const [newExerciseDescription, setNewExerciseDescription] = useState("");
    const [newExerciseGroupId, setNewExerciseGroupId] = useState("");
    const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
    const [isSubmittingExercise, setIsSubmittingExercise] = useState(false);

    // Estados para Usuários
    const [users, setUsers] = useState<User[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);

    // Verificar se é admin
    useEffect(() => {
        if (user && user.role !== "ADMIN") {
            toast.error("Acesso negado. Você não tem permissão para acessar esta página.");
            navigate("/workouts");
        }
    }, [user, navigate]);

    // Carregar dados
    useEffect(() => {
        fetchGroupMuscles();
        fetchExercises();
        fetchUsers();
    }, []);

    const fetchGroupMuscles = async () => {
        try {
            const response = await api.get<GroupMuscle[]>("/groupMuscle");
            setGroupMuscles(response.data);
        } catch (error) {
            toast.error("Erro ao carregar grupos musculares");
        } finally {
            setIsLoadingGroups(false);
        }
    };

    const fetchExercises = async () => {
        try {
            const response = await api.get<Exercise[]>("/exercise");
            setExercises(response.data);
        } catch (error) {
            toast.error("Erro ao carregar exercícios");
        } finally {
            setIsLoadingExercises(false);
        }
    };

    // Funções para Grupos Musculares
    const handleCreateGroup = async () => {
        if (!newGroupName.trim()) {
            toast.error("Nome do grupo é obrigatório");
            return;
        }

        setIsSubmittingGroup(true);
        try {
            await api.post("/admin/groupMuscle/create", {
                name: newGroupName,
                description: newGroupDescription,
            });
            toast.success("Grupo muscular criado com sucesso!");
            setNewGroupName("");
            setNewGroupDescription("");
            fetchGroupMuscles();
        } catch (error) {
            toast.error("Erro ao criar grupo muscular");
        } finally {
            setIsSubmittingGroup(false);
        }
    };

    const handleUpdateGroup = async () => {
        if (!editingGroup) return;

        setIsSubmittingGroup(true);
        try {
            await api.patch(`/admin/groupMuscle/update/${editingGroup.id}`, {
                name: editingGroup.name,
                description: editingGroup.description,
            });
            toast.success("Grupo muscular atualizado com sucesso!");
            setEditingGroup(null);
            fetchGroupMuscles();
        } catch (error) {
            toast.error("Erro ao atualizar grupo muscular");
        } finally {
            setIsSubmittingGroup(false);
        }
    };

    const handleDeleteGroup = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este grupo muscular? Todos os exercícios vinculados também serão excluídos.")) return;

        try {
            await api.delete(`/admin/groupMuscle/delete/${id}`);
            toast.success("Grupo muscular excluído com sucesso!");
            fetchGroupMuscles();
            fetchExercises(); // Atualiza a lista de exercícios também
        } catch (error) {
            toast.error("Erro ao excluir grupo muscular.");
        }
    };

    // Funções para Exercícios
    const handleCreateExercise = async () => {
        if (!newExerciseName.trim()) {
            toast.error("Nome do exercício é obrigatório");
            return;
        }
        if (!newExerciseGroupId) {
            toast.error("Selecione um grupo muscular");
            return;
        }

        setIsSubmittingExercise(true);
        try {
            await api.post("/admin/exercise/create", {
                name: newExerciseName,
                description: newExerciseDescription,
                groupMuscleId: newExerciseGroupId,
            });
            toast.success("Exercício criado com sucesso!");
            setNewExerciseName("");
            setNewExerciseDescription("");
            setNewExerciseGroupId("");
            fetchExercises();
        } catch (error) {
            toast.error("Erro ao criar exercício");
        } finally {
            setIsSubmittingExercise(false);
        }
    };

    const handleUpdateExercise = async () => {
        if (!editingExercise) return;

        setIsSubmittingExercise(true);
        try {
            await api.patch(`/admin/exercise/update/${editingExercise.id}`, {
                name: editingExercise.name,
                description: editingExercise.description,
                groupMuscleId: editingExercise.groupMuscleId,
            });
            toast.success("Exercício atualizado com sucesso!");
            setEditingExercise(null);
            fetchExercises();
        } catch (error) {
            toast.error("Erro ao atualizar exercício");
        } finally {
            setIsSubmittingExercise(false);
        }
    };

    const handleDeleteExercise = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este exercício?")) return;

        try {
            await api.delete(`/admin/exercise/delete/${id}`);
            toast.success("Exercício excluído com sucesso!");
            fetchExercises();
        } catch (error) {
            toast.error("Erro ao excluir exercício");
        }
    };

    const getGroupName = (groupId: string) => {
        return groupMuscles.find((g) => g.id === groupId)?.name || "Desconhecido";
    };

    // Funções para Usuários
    const fetchUsers = async () => {
        try {
            const response = await api.get<User[]>("/admin/user");
            setUsers(response.data);
        } catch (error) {
            toast.error("Erro ao carregar usuários");
        } finally {
            setIsLoadingUsers(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.")) return;

        try {
            await api.delete(`/admin/user/delete/${id}`);
            toast.success("Usuário excluído com sucesso!");
            fetchUsers();
        } catch (error: any) {
            console.error("Erro ao excluir usuário:", error);
            const message = error?.response?.data?.error || error?.response?.data?.details || "Erro ao excluir usuário";
            toast.error(message);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("pt-BR");
    };

    if (user?.role !== "ADMIN") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-dark-lighter font-medium">Verificando permissões...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
            <div className="w-full max-w-6xl mx-auto px-4 pt-20 pb-8 md:pt-24 md:pb-12">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Painel Admin
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3">
                        Administração
                    </h1>
                    <p className="text-dark-lighter text-base md:text-lg max-w-md mx-auto">
                        Gerencie grupos musculares, exercícios e usuários do sistema
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 inline-flex gap-1">
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "users"
                                ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-sm"
                                : "text-dark-lighter hover:text-dark hover:bg-gray-50"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Usuários
                        </button>
                        <button
                            onClick={() => setActiveTab("groupMuscles")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "groupMuscles"
                                ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-sm"
                                : "text-dark-lighter hover:text-dark hover:bg-gray-50"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                            </svg>
                            Grupos Musculares
                        </button>
                        <button
                            onClick={() => setActiveTab("exercises")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "exercises"
                                ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-sm"
                                : "text-dark-lighter hover:text-dark hover:bg-gray-50"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
                            </svg>
                            Exercícios
                        </button>
                    </div>
                </div>

                {/* Conteúdo - Grupos Musculares */}
                {activeTab === "groupMuscles" && (
                    <div className="space-y-6">
                        {/* Formulário de criação */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                {editingGroup ? "Editar Grupo Muscular" : "Novo Grupo Muscular"}
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block text-dark font-medium mb-2 text-sm">Nome *</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Peito, Costas, Pernas..."
                                        value={editingGroup ? editingGroup.name : newGroupName}
                                        onChange={(e) =>
                                            editingGroup
                                                ? setEditingGroup({ ...editingGroup, name: e.target.value })
                                                : setNewGroupName(e.target.value)
                                        }
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                    />
                                </div>
                                <div>
                                    <label className="block text-dark font-medium mb-2 text-sm">Descrição</label>
                                    <input
                                        type="text"
                                        placeholder="Descrição do grupo muscular"
                                        value={editingGroup ? editingGroup.description || "" : newGroupDescription}
                                        onChange={(e) =>
                                            editingGroup
                                                ? setEditingGroup({ ...editingGroup, description: e.target.value })
                                                : setNewGroupDescription(e.target.value)
                                        }
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-4">
                                {editingGroup ? (
                                    <>
                                        <button
                                            onClick={handleUpdateGroup}
                                            disabled={isSubmittingGroup}
                                            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl transition-all shadow-sm"
                                        >
                                            {isSubmittingGroup ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                            Salvar
                                        </button>
                                        <button
                                            onClick={() => setEditingGroup(null)}
                                            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-dark font-medium rounded-xl transition-all"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleCreateGroup}
                                        disabled={isSubmittingGroup}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl transition-all shadow-sm"
                                    >
                                        {isSubmittingGroup ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        )}
                                        Criar Grupo
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Lista de grupos */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                Grupos Cadastrados ({groupMuscles.length})
                            </h2>

                            {isLoadingGroups ? (
                                <div className="flex justify-center py-8">
                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : groupMuscles.length === 0 ? (
                                <p className="text-dark-lighter text-center py-8">Nenhum grupo muscular cadastrado</p>
                            ) : (
                                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                    {groupMuscles.map((group) => (
                                        <div
                                            key={group.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-all group"
                                        >
                                            <div>
                                                <p className="font-medium text-dark">{group.name}</p>
                                                {group.description && (
                                                    <p className="text-sm text-dark-lighter truncate max-w-[200px]">
                                                        {group.description}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => setEditingGroup(group)}
                                                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                                    title="Editar"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteGroup(group.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Excluir"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Conteúdo - Exercícios */}
                {activeTab === "exercises" && (
                    <div className="space-y-6">
                        {/* Formulário de criação */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                {editingExercise ? "Editar Exercício" : "Novo Exercício"}
                            </h2>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <label className="block text-dark font-medium mb-2 text-sm">Nome *</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Supino Reto, Agachamento..."
                                        value={editingExercise ? editingExercise.name : newExerciseName}
                                        onChange={(e) =>
                                            editingExercise
                                                ? setEditingExercise({ ...editingExercise, name: e.target.value })
                                                : setNewExerciseName(e.target.value)
                                        }
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                    />
                                </div>
                                <div>
                                    <label className="block text-dark font-medium mb-2 text-sm">Grupo Muscular *</label>
                                    <select
                                        value={editingExercise ? editingExercise.groupMuscleId : newExerciseGroupId}
                                        onChange={(e) =>
                                            editingExercise
                                                ? setEditingExercise({ ...editingExercise, groupMuscleId: e.target.value })
                                                : setNewExerciseGroupId(e.target.value)
                                        }
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                    >
                                        <option value="">Selecione...</option>
                                        {groupMuscles.map((gm) => (
                                            <option key={gm.id} value={gm.id}>
                                                {gm.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-dark font-medium mb-2 text-sm">Descrição</label>
                                    <input
                                        type="text"
                                        placeholder="Descrição do exercício"
                                        value={editingExercise ? editingExercise.description || "" : newExerciseDescription}
                                        onChange={(e) =>
                                            editingExercise
                                                ? setEditingExercise({ ...editingExercise, description: e.target.value })
                                                : setNewExerciseDescription(e.target.value)
                                        }
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-4">
                                {editingExercise ? (
                                    <>
                                        <button
                                            onClick={handleUpdateExercise}
                                            disabled={isSubmittingExercise}
                                            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl transition-all shadow-sm"
                                        >
                                            {isSubmittingExercise ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                            Salvar
                                        </button>
                                        <button
                                            onClick={() => setEditingExercise(null)}
                                            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-dark font-medium rounded-xl transition-all"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleCreateExercise}
                                        disabled={isSubmittingExercise}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl transition-all shadow-sm"
                                    >
                                        {isSubmittingExercise ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        )}
                                        Criar Exercício
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Lista de exercícios */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                Exercícios Cadastrados ({exercises.length})
                            </h2>

                            {isLoadingExercises ? (
                                <div className="flex justify-center py-8">
                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : exercises.length === 0 ? (
                                <p className="text-dark-lighter text-center py-8">Nenhum exercício cadastrado</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Nome</th>
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Grupo Muscular</th>
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Descrição</th>
                                                <th className="text-right py-3 px-4 text-sm font-semibold text-dark">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {exercises.map((exercise) => (
                                                <tr
                                                    key={exercise.id}
                                                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors group"
                                                >
                                                    <td className="py-3 px-4">
                                                        <span className="font-medium text-dark">{exercise.name}</span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="text-sm text-dark-lighter bg-primary/10 px-2 py-1 rounded-lg">
                                                            {getGroupName(exercise.groupMuscleId)}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="text-sm text-dark-lighter truncate max-w-[200px] block">
                                                            {exercise.description || "-"}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => setEditingExercise(exercise)}
                                                                className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                                                title="Editar"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteExercise(exercise.id)}
                                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                                title="Excluir"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Conteúdo - Usuários */}
                {activeTab === "users" && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Usuários Cadastrados ({users.length})
                            </h2>

                            {isLoadingUsers ? (
                                <div className="flex justify-center py-8">
                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : users.length === 0 ? (
                                <p className="text-dark-lighter text-center py-8">Nenhum usuário cadastrado</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Nome</th>
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Email</th>
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Tipo</th>
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Cadastro</th>
                                                <th className="text-right py-3 px-4 text-sm font-semibold text-dark">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((u) => (
                                                <tr
                                                    key={u.id}
                                                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors group"
                                                >
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                                <span className="text-primary font-semibold text-sm">
                                                                    {u.name.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <span className="font-medium text-dark">{u.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="text-sm text-dark-lighter">{u.email}</span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${u.role === "ADMIN"
                                                            ? "bg-purple-100 text-purple-700"
                                                            : "bg-gray-100 text-gray-600"
                                                            }`}>
                                                            {u.role === "ADMIN" ? "Administrador" : "Usuário"}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="text-sm text-dark-lighter">
                                                            {formatDate(u.createdAt)}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {u.id !== user?.id && (
                                                                <button
                                                                    onClick={() => handleDeleteUser(u.id)}
                                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                                    title="Excluir"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
