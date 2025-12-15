import { api } from "./api/api";
import type { ProfileFormData } from "../pages/Profile/types";

export const profileService = {
    async updateProfile(data: ProfileFormData): Promise<void> {
        await api.patch("/updateProfile", {
            name: data.name,
            email: data.email,
        });
    },

    async changePassword(newPassword: string): Promise<void> {
        await api.patch("/updateProfile", {
            password: newPassword,
        });
    },

    async deleteAccount(): Promise<void> {
        await api.delete("/deleteProfile");
    },
};
