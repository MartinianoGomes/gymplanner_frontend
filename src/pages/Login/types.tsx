import * as yup from "yup";

export const loginFormSchema = yup.object({
    email: yup.string().email("E-mail inválido!").required("E-mail é obrigatório!"),
    password: yup.string().required("Senha é obrigatória!").min(8, "Senha deve ter no mínimo 8 caracteres."),
})

export type LoginFormData = yup.InferType<typeof loginFormSchema>;