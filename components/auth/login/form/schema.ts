import { UseFormReturn } from "react-hook-form";
import z from "zod";

export const FORM_EMAIL = "email"
export const FORM_PASSWORD = "password"

export const formSchema = z.object({
    [FORM_EMAIL]: z.string().email({
        message: "Please enter a valid email address.",
    }),
    [FORM_PASSWORD]: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export type LoginFormData = z.infer<typeof formSchema>;

export interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<LoginFormData>
}