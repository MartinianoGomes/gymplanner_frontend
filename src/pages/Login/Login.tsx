import { authService } from "../../services/authService";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import logoImage from "../../assets/global/logo-1.svg";
import { loginFormSchema, type LoginFormData } from "./types";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginFormSchema),
    });

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        setIsLoading(true);

        authService.login(data)
            .then(({ status }) => {
                if (status === 200) toast.success("Login realizado com sucesso!");

                navigate('/workouts');
            })
            .catch((error) => {
                if (error instanceof AxiosError && !error.response) toast.error("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");

                if (error instanceof AxiosError && error.response?.status === 401) toast.error(error.response?.data.message || "Credenciais inválidas. Por favor, tente novamente.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-2">
            <div className="flex flex-col justify-center m-auto px-10 min-w-[70%] bg-white md:justify-center">
                <div className="mb-8 text-center">
                    <img src={logoImage} alt="Logo GymPlanner" className="h-auto mx-auto" />
                </div>

                <h2 className="text-2xl font-bold mb-2.5 text-dark">Entrar</h2>

                <p className="text-sm text-dark-lighter mb-8">
                    Faça login na sua conta e aproveite todos os benefícios gratuitamente.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <label htmlFor="email" className="block text-dark font-bold mb-2 text-sm">E-mail</label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu e-mail"
                        {...register("email")}
                        className="w-full px-4 py-3 bg-gray-100 border-none rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:shadow-input-focus"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
                    )}

                    <label htmlFor="password" className="block text-dark font-bold mt-5 mb-2 text-sm">Senha</label>

                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha"
                        {...register("password")}
                        className="w-full px-4 py-3 bg-gray-100 border-none rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:shadow-input-focus"
                    />

                    {errors.password && (
                        <span className="text-red-500 text-sm mt-2">{errors.password.message}</span>
                    )}

                    <p className="text-[13px] text-dark-lighter mb-6 mt-3 text-right">
                        Esqueceu sua senha? {' '}
                        <a href="/forgot-password" className="no-underline text-primary hover:text-primary-dark hover:underline transition-colors">
                            Clique aqui
                        </a>
                        .
                    </p>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex items-center justify-center w-full py-3 px-4 border-none rounded-xl text-base cursor-pointer mb-2 transition-all font-medium ${isLoading
                            ? "bg-primary-light cursor-not-allowed"
                            : "bg-linear-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-sm hover:shadow"
                            } text-white`}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <div>Entrar</div>
                        )}
                    </button>

                    <p className="text-[13px] text-dark-lighter text-center mt-2">
                        Não possui conta? {' '}
                        <a href="/register" className="no-underline text-primary hover:text-primary-dark hover:underline transition-colors">
                            Clique aqui e realize seu cadastro
                        </a>
                        .
                    </p>
                </form>
            </div>

            <div
                className="flex-1 h-auto bg-[url('../../assets/login/image-woman-1.png')] bg-cover bg-center bg-no-repeat bg-primary max-md:hidden"
            ></div>
        </div >
    );
};
