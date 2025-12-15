import { createContext } from "react";
import type { User } from "./User";

export type UserContextType = {
    user: User | null;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
    clearUser: () => void;
}

export const UserContextType = createContext<UserContextType | null>(null);