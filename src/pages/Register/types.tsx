import * as yup from "yup";

export const registerSchema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    password: yup.string().min(8, "Senha deve ter no mínimo 8 caracteres").required("Senha é obrigatória"),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password")], "As senhas devem corresponder")
        .required("Confirmação de senha é obrigatória"),
})

export type RegisterData = yup.InferType<typeof registerSchema>;