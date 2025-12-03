import Logout from "./assets/Logout.svg"
import { api } from "../../../services/api/api";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { LoggedUser } from "./types";

export default function NavMenu() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState<LoggedUser | null>(null);

    useEffect(() => {
        api.get("/me")
            .then(res => {
                setUser(res.data);
            })
            .catch(() => {
                toast.error("Você não está autenticado.");
                navigate("/login");
            });
    }, []);

    const handleLogout = () => {
        setIsLoading(true);
        api.post('/auth/logout')
            .then(() => {
                toast.success('Logout realizado com sucesso!');
                navigate('/login');
            })
            .catch(() => {
                toast.error('Erro ao realizar logout.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="flex flex-row h-full">
            <div className="flex flex-col justify-between bg-[#EFEFEF]">
                <div className="mx-4 mt-10">
                    <ul className="flex flex-col gap-5">
                        <li className="p-5 hover:bg-[#D9D9D9] rounded-lg cursor-pointer">Meus treinos</li>
                        <li className="p-5 hover:bg-[#D9D9D9] rounded-lg cursor-pointer">Criar treino</li>
                        <li className="p-5 hover:bg-[#D9D9D9] rounded-lg cursor-pointer">Sugestões</li>
                        <li className="p-5 hover:bg-[#D9D9D9] rounded-lg cursor-pointer">Minhas refeições</li>
                    </ul>
                </div>

                <div className="bg-[#DBDBDB] rounded-tl-lg rounded-tr-lg">
                    <div className="mx-8 py-7 flex items-center justify-between gap-25 text-sm">
                        <div className="flex flex-col">
                            <span>{user?.name ?? "Carregando..."}</span>
                            <span>{user?.email ?? "Carregando..."}</span>
                        </div>

                        <button
                            disabled={isLoading}
                            onClick={handleLogout}
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <img className="w-6" src={Logout} alt="Logout" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
