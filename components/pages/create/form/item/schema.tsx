import { UseFormReturn } from "react-hook-form";
import z from "zod";

export const FORM_NAME = "name"
export const FORM_IMAGE = "image"
export const FORM_CONDITION = "condition"
export const FORM_LICENSE_REQUIRED = "license"

export const formSchema = z.object({
    [FORM_NAME]: z
        .string()
        .min(2, { message: "Title must be at least 2 characters." })
        .max(50, { message: "Title must be at most 50 characters." })
        .regex(/^[a-zA-Z0-9 ]+$/, { message: "Title must be alphanumeric only." }),
    [FORM_CONDITION]: z
        .string(),
    [FORM_IMAGE]: z
        .instanceof(File)
        .refine((file) => file.size > 0, { message: "Image is required." })
        .refine((file) => file.size < 5 * 1024 * 1024, { message: "Max image size is 5MB." })
        .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), { message: "Only JPEG or PNG allowed." }),
    [FORM_LICENSE_REQUIRED]: z.boolean(),
})

export type CreateFormData = z.infer<typeof formSchema>;

export interface CreateFormProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<CreateFormData>
}