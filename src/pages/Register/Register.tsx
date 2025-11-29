import { useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { api } from '../../services/api/api';
import { AxiosError } from 'axios';

import type RegisterFormInputs from './types';
import logoImage from '../../../public/logo-1.svg';

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<RegisterFormInputs>()
    const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
        api.post('/auth/register', data)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                }
            });
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-2">
            <div
                className="flex-1 h-auto bg-[url('../../assets/register/image-woman-2.png')] bg-cover bg-center bg-no-repeat bg-orange-500 max-md:hidden"
            ></div>

            <div className="flex flex-col justify-center m-auto px-3 min-w-[80%] bg-white md:max-w-[80%] md:justify-center">
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
                        required
                        {...register("name", { required: true })}
                        className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 text-sm transition-all mb-6 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_#f97316]"
                    />

                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-sm">E-mail</label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu e-mail"
                        required
                        {...register("email", { required: true })}
                        className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 text-sm transition-all mb-6 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_#f97316]"
                    />

                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2 text-sm">Senha</label>

                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha"
                        required
                        {...register("password", { required: true })}
                        className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 text-sm transition-all mb-6 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_#f97316]"
                    />

                    <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2 text-sm">Confirmar Senha</label>

                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirme sua senha"
                        required
                        {...register("confirmPassword", { required: true })}
                        className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 text-sm transition-all mb-6 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_#f97316]"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 px-4 border-none rounded-md text-base cursor-pointer mb-2 transition-colors bg-orange-600 text-white hover:bg-orange-700"
                    >
                        Entrar
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