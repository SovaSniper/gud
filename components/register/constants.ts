import { UseFormReturn } from "react-hook-form"
import { RegisterFormData } from "./form"

export interface RegisterFormComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<RegisterFormData>
}

export const REGISTER_FORM_HANDLER = "handler"
export const REGISTER_FORM_EMAIL = "email"
export const REGISTER_FORM_FIRSTNAME = "firstname"
export const REGISTER_FORM_SURNAME = "surname"
export const REGISTER_FORM_PASSWORD = "password"

