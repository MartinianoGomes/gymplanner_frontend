import { api } from "./api/api";

export interface Exercise {
    id: string;
    name: string;
    description?: string;
    groupMuscleId: string;
}

export interface GroupMuscle {
    id: string;
    name: string;
    description?: string;
}

export const exerciseService = {
    getAll: async () => {
        const response = await api.get<Exercise[]>("/exercise");
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get<Exercise>(`/exercise/${id}`);
        return response.data;
    },

    getGroupMuscles: async () => {
        const response = await api.get<GroupMuscle[]>("/groupMuscle");
        return response.data;
    },

    getGroupMuscleById: async (id: string) => {
        const response = await api.get<GroupMuscle>(`/groupMuscle/${id}`);
        return response.data;
    },
};
