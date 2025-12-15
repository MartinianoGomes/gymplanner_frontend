import { api } from "./api/api";

// Types
export interface GroupMuscle {
    id: string;
    name: string;
    description?: string;
}

export interface Exercise {
    id: string;
    name: string;
    description?: string;
    groupMuscleId: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export interface CreateGroupMuscleData {
    name: string;
    description?: string;
}

export interface UpdateGroupMuscleData {
    name?: string;
    description?: string;
}

export interface CreateExerciseData {
    name: string;
    description?: string;
    groupMuscleId: string;
}

export interface UpdateExerciseData {
    name?: string;
    description?: string;
    groupMuscleId?: string;
}

export const adminService = {
    // Grupos Musculares
    getGroupMuscles: async () => {
        const response = await api.get<GroupMuscle[]>("/groupMuscle");
        return response.data;
    },

    createGroupMuscle: async (data: CreateGroupMuscleData) => {
        const response = await api.post("/admin/groupMuscle/create", data);
        return response.data;
    },

    updateGroupMuscle: async (id: string, data: UpdateGroupMuscleData) => {
        const response = await api.patch(`/admin/groupMuscle/update/${id}`, data);
        return response.data;
    },

    deleteGroupMuscle: async (id: string) => {
        const response = await api.delete(`/admin/groupMuscle/delete/${id}`);
        return response.data;
    },

    // Exercícios
    getExercises: async () => {
        const response = await api.get<Exercise[]>("/exercise");
        return response.data;
    },

    createExercise: async (data: CreateExerciseData) => {
        const response = await api.post("/admin/exercise/create", data);
        return response.data;
    },

    updateExercise: async (id: string, data: UpdateExerciseData) => {
        const response = await api.patch(`/admin/exercise/update/${id}`, data);
        return response.data;
    },

    deleteExercise: async (id: string) => {
        const response = await api.delete(`/admin/exercise/delete/${id}`);
        return response.data;
    },

    // Usuários
    getUsers: async () => {
        const response = await api.get<User[]>("/admin/user");
        return response.data;
    },

    deleteUser: async (id: string) => {
        const response = await api.delete(`/admin/user/delete/${id}`);
        return response.data;
    },
};
