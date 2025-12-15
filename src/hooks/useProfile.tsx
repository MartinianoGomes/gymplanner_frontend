import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useUser } from "./useUser";
import { profileService } from "../services/profileService";
import type { ProfileFormData, PasswordFormData } from "../pages/Profile/types";

export function useProfile() {
    const { user, refreshUser, clearUser } = useUser();
    const navigate = useNavigate();

    const [isUpdating, setIsUpdating] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const onUpdateProfile = async (data: ProfileFormData) => {
        setIsUpdating(true);
        try {
            await profileService.updateProfile(data);
            await refreshUser();
            toast.success("Perfil atualizado com sucesso!");
        } catch {
            toast.error("Erro ao atualizar perfil");
        } finally {
            setIsUpdating(false);
        }
    };

    const onChangePassword = async (data: PasswordFormData) => {
        // Validação de senha mínima de 8 caracteres
        if (data.newPassword.length < 8) {
            toast.error("A senha deve ter no mínimo 8 caracteres");
            return false;
        }

        if (data.newPassword !== data.confirmPassword) {
            toast.error("As senhas não coincidem");
            return false;
        }

        setIsChangingPassword(true);
        try {
            await profileService.changePassword(data.newPassword);
            toast.success("Senha alterada com sucesso!");
            setShowPasswordForm(false);
            return true;
        } catch {
            toast.error("Erro ao alterar senha");
            return false;
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            await profileService.deleteAccount();
            toast.success("Conta excluída com sucesso");
            clearUser();
            navigate("/login");
        } catch {
            toast.error("Erro ao excluir conta");
        } finally {
            setIsDeleting(false);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    return {
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
    };
}
