import { useState } from "react";
import Logout from "./assets/Logout.svg"
import { useUser } from "../hooks/useUser";
import BackImage from "./assets/Back.svg"
import ForwardImage from "./assets/Forward.svg"
import { useNavigate, useLocation } from "react-router";

export default function NavMenu() {
    const { user, isLoading, logout } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        {
            path: '/workouts', label: 'Meus treinos', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h2m12 0h2M6 7v10M18 7v10M8 7h8M8 17h8M6 12h12" />
                </svg>
            )
        },
        {
            path: '/create-workout', label: 'Criar treino', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            )
        },
        {
            path: '/blog', label: 'Blog', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            )
        },
        ...(user?.role === 'ADMIN' ? [{
            path: '/admin', label: 'Administração', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        }] : [])
    ];

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            <div className={`fixed top-0 left-0 h-full z-40 transform transition-all duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute top-4 -right-15 bg-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 hover:bg-linear-to-br hover:from-primary hover:to-primary-light group"
                >
                    <img
                        src={isOpen ? BackImage : ForwardImage}
                        alt={isOpen ? "Fechar" : "Abrir"}
                        className="w-5 h-5 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                    />
                </button>
                <div className="flex flex-col justify-between rounded-r-2xl bg-white h-full shadow-2xl border-r border-gray-100 w-72">
                    <div className="flex flex-col">
                        <div className="px-6 py-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <img src="/logo-2.svg" alt="GymPlanner Logo" className="w-10 h-10" />
                                <div>
                                    <h1 className="text-xl font-bold text-dark">GymPlanner</h1>
                                    <p className="text-xs text-dark-lighter">Seu treino organizado</p>
                                </div>
                            </div>
                        </div>

                        <nav className="px-4 py-4">
                            <ul className="flex flex-col gap-1">
                                {menuItems.map((item) => (
                                    <li key={item.path}>
                                        <button
                                            onClick={() => {
                                                navigate(item.path);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${isActive(item.path)
                                                ? 'bg-linear-to-r from-primary to-primary-light text-white shadow-sm'
                                                : 'text-dark hover:bg-primary/10 hover:text-primary-dark'
                                                }`}
                                        >
                                            <span className={isActive(item.path) ? 'text-white' : 'text-dark-lighter'}>
                                                {item.icon}
                                            </span>
                                            <span className="font-medium">{item.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="border-t border-gray-100 bg-linear-to-br from-gray-50 to-gray-100 rounded-br-2xl">
                        <div className="px-6 py-5 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-primary font-bold text-sm">
                                        {user?.name?.charAt(0).toUpperCase() || '?'}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-dark truncate">
                                        {user?.name ?? "Carregando..."}
                                    </p>
                                    <p className="text-xs text-dark-lighter truncate">
                                        {user?.email ?? "Carregando..."}
                                    </p>
                                </div>
                            </div>

                            <button
                                disabled={isLoading}
                                onClick={logout}
                                className="p-2 rounded-lg hover:bg-red-50 transition-all group shrink-0"
                                title="Sair"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <img className="w-5 h-5 group-hover:opacity-80" src={Logout} alt="Logout" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
