import { UseFormReturn } from "react-hook-form"
import z from "zod"

export const REGISTER_FORM_HANDLER = "handler"
export const REGISTER_FORM_EMAIL = "email"
export const REGISTER_FORM_PASSWORD = "password"
export const REGISTER_FORM_FIRSTNAME = "firstname"
export const REGISTER_FORM_SURNAME = "surname"

export const formSchema = z.object({
    [REGISTER_FORM_EMAIL]: z.string().email({
        message: "Please enter a valid email address.",
    }),
    [REGISTER_FORM_PASSWORD]: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export type RegisterFormData = z.infer<typeof formSchema>;

export interface SignupFormProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<RegisterFormData>
}
