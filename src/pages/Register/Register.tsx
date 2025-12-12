import { useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { api } from '../../services/api/api';
import { AxiosError } from 'axios';

import { registerSchema, type RegisterData } from './types';
import logoImage from '../../assets/global/logo-1.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Register() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterData>({
        resolver: yupResolver(registerSchema)
    })

    const onSubmit: SubmitHandler<RegisterData> = (data) => {
        setIsLoading(true);

        api.post('/auth/register', data)
            .then(() => {
                toast.success('Cadastro realizado com sucesso! Faça login para continuar.');

                navigate('/login');
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message || 'Erro ao realizar cadastro. Tente novamente.');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-2">
            <div
                className="flex-1 h-auto bg-[url('../../assets/register/image-woman-2.png')] bg-cover bg-center bg-no-repeat bg-orange-500 max-md:hidden"
            ></div>

            <div className="flex flex-col justify-center m-auto px-10 min-w-[70%] bg-white md:justify-center">
                <div className="mb-8 text-center">
                    <img src={logoImage} alt="Logo GymPlanner" className="h-auto mx-auto" />
                </div>

                <h2 className="text-2xl font-bold mb-2.5">Cadastrar</h2>

                <p className="text-sm text-gray-600 mb-8">
                    Realize seu cadastro na nossa plataforma e aproveite todos os benefícios gratuitamente.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2 text-sm">Nome</label>

                    <input
                        type="text"
                        id="name"
                        placeholder="Digite seu nome completo"
                        {...register("name")}
                        className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 text-sm transition-all placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_#f97316]"
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
                    )}

                    <label htmlFor="email" className="block text-gray-700 font-bold mt-5 mb-2 text-sm">E-mail</label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu e-mail"
                        {...register("email")}
                        className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 text-sm transition-all placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_#f97316]"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
                    )}

                    <label htmlFor="password" className="block text-gray-700 font-bold mt-5 mb-2 text-sm">Senha</label>

                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha"
                        {...register("password")}
                        className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 text-sm transition-all placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_#f97316]"
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
                    )}

                    <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mt-5 mb-2 text-sm">Confirmar Senha</label>

                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirme sua senha"
                        {...register("confirmPassword")}
                        className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 text-sm transition-all placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_#f97316]"
                    />

                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-2">{errors.confirmPassword.message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex items-center justify-center w-full py-3 px-4 border-none rounded-md text-base cursor-pointer mt-5 mb-2 transition-colors ${isLoading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-500 hover:not-focus:bg-orange-600"} text-white`}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <div>Cadastrar</div>
                        )}
                    </button>

                    <p className="text-[13px] text-gray-600 text-center mt-2">
                        Já possui conta? {' '}
                        <a href="/login" className="no-underline text-orange-500 hover:underline">
                            Clique aqui e realize seu login
                        </a>
                        .
                    </p>
                </form>
            </div>
        </div>
    )
}