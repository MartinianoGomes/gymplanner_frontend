import { useEffect, useState } from "react";
import { api } from "../api/api";
import { UserContextType } from "../../types/UserContextType";
import type { User } from "../../types/User";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const refreshUser = async () => {
        try {
            const response = await api.get("/me");
            setUser(response.data);
        } catch {
            toast.error("Erro ao buscar dados do usuário. Faça login novamente.");
            navigate("/login");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/forgot-password' && location.pathname !== '/') {
            refreshUser();
        }
    }, [location.pathname]);

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

    const clearUser = () => {
        setUser(null);
    };

    return (
        <UserContextType.Provider value={{ user, isLoading, refreshUser, logout, clearUser }}>
            {children}
        </UserContextType.Provider>
    );
};
