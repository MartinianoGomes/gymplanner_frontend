import { useContext } from "react";
import { UserContextType } from "../types/UserContextType";

export const useUser = () => {
    const context = useContext(UserContextType)
    if (!context) throw new Error("The useUser hook must be used within a UserProvider");

    return context;
}