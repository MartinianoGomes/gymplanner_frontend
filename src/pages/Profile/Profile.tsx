import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useProfile } from "../../hooks/useProfile";
import type { ProfileFormData, PasswordFormData } from "./types";

export default function Profile() {
    const {
        user,
        isUpdating,
        isChangingPassword,
        isDeleting,
        showPasswordForm,
        setShowPasswordForm,
        showDeleteConfirm,
        setShowDeleteConfirm,
        onUpdateProfile,
        onChangePassword,
        handleDeleteAccount,
        getInitials,
        formatDate,
    } = useProfile();

    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        formState: { errors: profileErrors },
        reset: resetProfile,
    } = useForm<ProfileFormData>({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
        },
    });

    // Atualiza os valores do formulário quando o usuário mudar
    useEffect(() => {
        if (user) {
            resetProfile({
                name: user.name,
                email: user.email,
            });
        }
    }, [user, resetProfile]);

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: passwordErrors },
        reset: resetPassword,
        watch,
    } = useForm<PasswordFormData>();

    const newPassword = watch("newPassword");

    if (!user) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-dark-lighter font-medium">Carregando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 w-full">
            <div className="w-full max-w-3xl mx-auto px-4 pt-20 pb-8 md:pt-24 md:pb-12">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Minha Conta
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3">
                        Meu Perfil
                    </h1>
                    <p className="text-dark-lighter text-base md:text-lg max-w-md mx-auto">
                        Gerencie suas informações pessoais e configurações de conta
                    </p>
                </div>

                {/* Avatar e Info */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary to-primary-light flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {getInitials(user.name)}
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold text-dark">{user.name}</h2>
                            <p className="text-dark-lighter">{user.email}</p>
                            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${user.role === "ADMIN"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-primary/10 text-primary-dark"
                                    }`}>
                                    {user.role === "ADMIN" ? "Administrador" : "Usuário"}
                                </span>
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-dark-lighter">
                                    Membro desde {formatDate(user.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulário de Perfil */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Informações Pessoais
                    </h3>

                    <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-4">
                        <div>
                            <label className="block text-dark font-medium mb-2 text-sm">Nome</label>
                            <input
                                type="text"
                                {...registerProfile("name", { required: "Nome é obrigatório" })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                            />
                            {profileErrors.name && (
                                <p className="text-red-500 text-xs mt-1">{profileErrors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-dark font-medium mb-2 text-sm">Email</label>
                            <input
                                type="email"
                                {...registerProfile("email", {
                                    required: "Email é obrigatório",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email inválido",
                                    },
                                })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                            />
                            {profileErrors.email && (
                                <p className="text-red-500 text-xs mt-1">{profileErrors.email.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                        >
                            {isUpdating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Salvar Alterações
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Alterar Senha */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-dark flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Segurança
                        </h3>
                        {!showPasswordForm && (
                            <button
                                onClick={() => setShowPasswordForm(true)}
                                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                            >
                                Alterar senha
                            </button>
                        )}
                    </div>

                    {showPasswordForm ? (
                        <form onSubmit={handleSubmitPassword(async (data) => {
                            const success = await onChangePassword(data);
                            if (success) resetPassword();
                        })} className="space-y-4">
                            <div>
                                <label className="block text-dark font-medium mb-2 text-sm">Nova Senha</label>
                                <input
                                    type="password"
                                    {...registerPassword("newPassword", {
                                        required: "Nova senha é obrigatória",
                                        minLength: {
                                            value: 6,
                                            message: "A senha deve ter pelo menos 6 caracteres",
                                        },
                                    })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                />
                                {passwordErrors.newPassword && (
                                    <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-dark font-medium mb-2 text-sm">Confirmar Nova Senha</label>
                                <input
                                    type="password"
                                    {...registerPassword("confirmPassword", {
                                        required: "Confirmação é obrigatória",
                                        validate: (value) =>
                                            value === newPassword || "As senhas não coincidem",
                                    })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark text-sm transition-all placeholder:text-dark-lighter focus:outline-none focus:bg-white focus:border-primary focus:shadow-input-focus"
                                />
                                {passwordErrors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword.message}</p>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={isChangingPassword}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl transition-all shadow-sm disabled:opacity-50"
                                >
                                    {isChangingPassword ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "Alterar Senha"
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordForm(false);
                                        resetPassword();
                                    }}
                                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-dark font-medium rounded-xl transition-all"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p className="text-dark-lighter text-sm">
                            Sua senha está protegida. Clique em "Alterar senha" para modificá-la.
                        </p>
                    )}
                </div>

                {/* Zona de Perigo */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
                    <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Zona de Perigo
                    </h3>

                    {!showDeleteConfirm ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-dark">Excluir conta</p>
                                <p className="text-sm text-dark-lighter">
                                    Esta ação é irreversível e todos os seus dados serão perdidos.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-all text-sm"
                            >
                                Excluir conta
                            </button>
                        </div>
                    ) : (
                        <div className="bg-red-50 rounded-xl p-4">
                            <p className="text-red-700 font-medium mb-3">
                                Tem certeza que deseja excluir sua conta?
                            </p>
                            <p className="text-red-600 text-sm mb-4">
                                Todos os seus treinos, dados e configurações serão permanentemente excluídos.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={isDeleting}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all disabled:opacity-50"
                                >
                                    {isDeleting ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Sim, excluir minha conta
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2.5 bg-white hover:bg-gray-100 text-dark font-medium rounded-xl transition-all border border-gray-200"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
