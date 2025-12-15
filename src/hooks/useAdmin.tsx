import { useState, useEffect } from "react";
import { toast } from "sonner";
import { adminService } from "../services/adminService";
import type { GroupMuscle, Exercise, User } from "../pages/Admin/types";

export function useAdmin() {
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

    // Carregar dados
    useEffect(() => {
        fetchGroupMuscles();
        fetchExercises();
        fetchUsers();
    }, []);

    // Funções de fetch
    const fetchGroupMuscles = async () => {
        try {
            const data = await adminService.getGroupMuscles();
            setGroupMuscles(data);
        } catch {
            toast.error("Erro ao carregar grupos musculares");
        } finally {
            setIsLoadingGroups(false);
        }
    };

    const fetchExercises = async () => {
        try {
            const data = await adminService.getExercises();
            setExercises(data);
        } catch {
            toast.error("Erro ao carregar exercícios");
        } finally {
            setIsLoadingExercises(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await adminService.getUsers();
            setUsers(data);
        } catch {
            toast.error("Erro ao carregar usuários");
        } finally {
            setIsLoadingUsers(false);
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
            await adminService.createGroupMuscle({
                name: newGroupName,
                description: newGroupDescription,
            });
            toast.success("Grupo muscular criado com sucesso!");
            setNewGroupName("");
            setNewGroupDescription("");
            fetchGroupMuscles();
        } catch {
            toast.error("Erro ao criar grupo muscular");
        } finally {
            setIsSubmittingGroup(false);
        }
    };

    const handleUpdateGroup = async () => {
        if (!editingGroup) return;

        setIsSubmittingGroup(true);
        try {
            await adminService.updateGroupMuscle(editingGroup.id, {
                name: editingGroup.name,
                description: editingGroup.description,
            });
            toast.success("Grupo muscular atualizado com sucesso!");
            setEditingGroup(null);
            fetchGroupMuscles();
        } catch {
            toast.error("Erro ao atualizar grupo muscular");
        } finally {
            setIsSubmittingGroup(false);
        }
    };

    const handleDeleteGroup = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este grupo muscular? Todos os exercícios vinculados também serão excluídos.")) return;

        try {
            await adminService.deleteGroupMuscle(id);
            toast.success("Grupo muscular excluído com sucesso!");
            fetchGroupMuscles();
            fetchExercises();
        } catch {
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
            await adminService.createExercise({
                name: newExerciseName,
                description: newExerciseDescription,
                groupMuscleId: newExerciseGroupId,
            });
            toast.success("Exercício criado com sucesso!");
            setNewExerciseName("");
            setNewExerciseDescription("");
            setNewExerciseGroupId("");
            fetchExercises();
        } catch {
            toast.error("Erro ao criar exercício");
        } finally {
            setIsSubmittingExercise(false);
        }
    };

    const handleUpdateExercise = async () => {
        if (!editingExercise) return;

        setIsSubmittingExercise(true);
        try {
            await adminService.updateExercise(editingExercise.id, {
                name: editingExercise.name,
                description: editingExercise.description,
                groupMuscleId: editingExercise.groupMuscleId,
            });
            toast.success("Exercício atualizado com sucesso!");
            setEditingExercise(null);
            fetchExercises();
        } catch {
            toast.error("Erro ao atualizar exercício");
        } finally {
            setIsSubmittingExercise(false);
        }
    };

    const handleDeleteExercise = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este exercício?")) return;

        try {
            await adminService.deleteExercise(id);
            toast.success("Exercício excluído com sucesso!");
            fetchExercises();
        } catch {
            toast.error("Erro ao excluir exercício");
        }
    };

    // Funções para Usuários
    const handleDeleteUser = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.")) return;

        try {
            await adminService.deleteUser(id);
            toast.success("Usuário excluído com sucesso!");
            fetchUsers();
        } catch (error: unknown) {
            console.error("Erro ao excluir usuário:", error);
            const axiosError = error as { response?: { data?: { error?: string; details?: string } } };
            const message = axiosError?.response?.data?.error || axiosError?.response?.data?.details || "Erro ao excluir usuário";
            toast.error(message);
        }
    };

    // Utilitários
    const getGroupName = (groupId: string) => {
        return groupMuscles.find((g) => g.id === groupId)?.name || "Desconhecido";
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("pt-BR");
    };

    return {
        // Grupos Musculares
        groupMuscles,
        isLoadingGroups,
        newGroupName,
        setNewGroupName,
        newGroupDescription,
        setNewGroupDescription,
        editingGroup,
        setEditingGroup,
        isSubmittingGroup,
        handleCreateGroup,
        handleUpdateGroup,
        handleDeleteGroup,

        // Exercícios
        exercises,
        isLoadingExercises,
        newExerciseName,
        setNewExerciseName,
        newExerciseDescription,
        setNewExerciseDescription,
        newExerciseGroupId,
        setNewExerciseGroupId,
        editingExercise,
        setEditingExercise,
        isSubmittingExercise,
        handleCreateExercise,
        handleUpdateExercise,
        handleDeleteExercise,

        // Usuários
        users,
        isLoadingUsers,
        handleDeleteUser,

        // Utilitários
        getGroupName,
        formatDate,
    };
}
