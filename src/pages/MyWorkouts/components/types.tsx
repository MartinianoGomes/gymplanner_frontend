export type LoggedUser = {
    name: string;
    id: string;
    email: string;
    role: string | null;
    createdAt: Date;
    updatedAt: Date | null;
};