import Logout from "./assets/Logout.svg"
import { useUser } from "../../../hooks/useUser";

export default function NavMenu() {
    const { user, isLoading, logout } = useUser();

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
                            onClick={logout}
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
