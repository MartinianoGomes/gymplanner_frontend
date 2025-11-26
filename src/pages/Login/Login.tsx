import { useState } from 'react';

import logoImage from '../../assets/login/logo-1.svg';
import { api } from '../../services/api/api';
import { AxiosError } from 'axios';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = { email, password };

            const response = await api.post('/auth/login', data);

            alert(response.data.message ?? "Login feito com sucesso!");

            const user = await api.get('/me');

            console.log(JSON.stringify(user.data));
        } catch (error) {
            if (error instanceof AxiosError) {
                const status = error.response?.status;
                const backendErr = error.response?.data?.error;

                switch (status) {
                    case 400:
                        return alert("Credenciais inválidas.");
                    case 401:
                        return alert("E-mail ou senha incorretos.");
                }

                return alert(backendErr ?? "Erro inesperado ao fazer login.");
            }

            alert("Erro inesperado.");
        }
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-2">
            <div className="flex flex-col justify-center m-auto px-3 min-w-[80%] bg-white md:max-w-[80%] md:justify-center">
                <div className="mb-8 text-center">
                    <img src={logoImage} alt="Logo GymPlanner" className="h-auto mx-auto" />
                </div>

                <h2 className="text-2xl font-semibold mb-2.5">Entrar</h2>

                <p className="text-sm text-gray-600 mb-8">
                    Faça login na sua conta e aproveite todos os benefícios gratuitamente.
                </p>

                <form onSubmit={onSubmit} className="flex flex-col">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm">
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu e-mail"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 text-sm transition-all mb-6 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_#f97316]"
                    />

                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2 text-sm">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 text-sm transition-all mb-6 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_#f97316]"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 px-4 border-none rounded-md text-base cursor-pointer mb-4 transition-colors bg-orange-600 text-white hover:bg-orange-700"
                    >
                        Entrar
                    </button>

                    <p className="text-[13px] text-center text-gray-600">
                        Não possui conta?{' '}
                        <a href="/register" className="no-underline text-orange-500 hover:underline">
                            Clique aqui e realize seu cadastro
                        </a>
                    </p>
                </form>

                <footer className="text-xs text-center mt-8 text-gray-400">
                    © 2025 Copy. Todos os direitos reservados.
                </footer>
            </div>

            <div
                className="flex-1 h-auto bg-[url('../../assets/login/image-woman-1.png')] bg-cover bg-center bg-no-repeat bg-orange-500 max-md:hidden"
            />
        </div>
    );
};
