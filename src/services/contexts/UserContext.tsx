import { useEffect, useState } from "react";
import { api } from "../api/api";
import { UserContextType } from "../../types/UserContextType";
import type { User } from "../../types/User";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const logout = async () => {
        api.post('/auth/logout')
            .then(() => {
                toast.success("Logout realizado com sucesso.");
                setUser(null);
                navigate('/login');
            })
            .catch(() => {
                toast.error("Erro ao fazer logout. Recarregue a página e tente novamente.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const refreshUser = async () => {
        try {
            const response = await api.get("/me");
            setUser(response.data);
        } catch {
            navigate("/login");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <UserContextType.Provider value={{ user, isLoading, refreshUser, logout }}>
            {children}
        </UserContextType.Provider>
    );
};
