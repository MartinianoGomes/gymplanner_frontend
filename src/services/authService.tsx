import { api } from "./api/api";

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export const authService = {
    login: async (data: LoginData) => {
        const response = await api.post("/auth/login", data);
        return response;
    },

    register: async (data: RegisterData) => {
        const response = await api.post("/auth/register", data);
        return response;
    },

    logout: async () => {
        const response = await api.post("/auth/logout");
        return response;
    },
};
