export interface GroupMuscle {
    id: string;
    name: string;
    description?: string;
    createdAt?: string;
}

export interface Exercise {
    id: string;
    name: string;
    description?: string;
    groupMuscleId: string;
    createdAt?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
}

export type Tab = "groupMuscles" | "exercises" | "users";
