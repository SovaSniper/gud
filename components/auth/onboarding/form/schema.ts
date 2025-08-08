import { UseFormReturn } from "react-hook-form";
import z from "zod";

export const FORM_FIRSTNAME = "firstname"
export const FORM_LASTNAME = "lastname"

export const formSchema = z.object({
    [FORM_FIRSTNAME]: z.string().min(3, {
        message: `${FORM_FIRSTNAME} must be at least 3 characters.`,
    }),
    [FORM_LASTNAME]: z.string().min(3, {
        message: `${FORM_LASTNAME} must be at least 3 characters.`,
    }),
})

export type OnboardingFormData = z.infer<typeof formSchema>;

export interface OnboardingFormProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<OnboardingFormData>
}