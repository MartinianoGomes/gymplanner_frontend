import { useState } from "react";
import Logout from "./assets/Logout.svg"
import { useUser } from "../hooks/useUser";
import BackImage from "./assets/Back.svg"
import ForwardImage from "./assets/Forward.svg"
import { useNavigate } from "react-router";

export default function NavMenu() {
    const { user, isLoading, logout } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute top-4 -right-15 bg-[#f5f5f5] hover:bg-[#D9D9D9] p-3 rounded-lg shadow-lg transition-all"
                >
                    {isOpen ? (
                        <img src={BackImage} alt="Back" />
                    ) : (
                        <img src={ForwardImage} alt="Forward" />
                    )}
                </button>

                <div className="flex flex-col justify-between rounded-r-lg bg-[#EFEFEF] h-full shadow-xl">
                    <div className="flex flex-col items-center mx-4">
                        <h1 className="text-2xl font-semibold mt-5 mb-5">Menu</h1>

                        <ul className="flex flex-col w-full gap-5">
                            <li
                                onClick={() => navigate('/workouts')}
                                className="p-5 hover:bg-[#D9D9D9] rounded-lg cursor-pointer">
                                Meus treinos
                            </li>
                            <li className="p-5 hover:bg-[#D9D9D9] rounded-lg cursor-pointer">Criar treino</li>
                            <li className="p-5 hover:bg-[#D9D9D9] rounded-lg cursor-pointer">Sugestões</li>
                            <li className="p-5 hover:bg-[#D9D9D9] rounded-lg cursor-pointer">Minhas refeições</li>
                        </ul>
                    </div>

                    <div className="bg-[#DBDBDB] rounded-t-lg rounded-br-lg">
                        <div className="mx-8 py-7 flex items-center justify-between gap-25 text-sm">
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">{user?.name ?? "Carregando..."}</span>
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
        </>
    );
}
