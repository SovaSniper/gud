import { UseFormReturn } from "react-hook-form";
import z from "zod";

export const FORM_TITLE = "title"
export const FORM_DESCRIPTION = "description"
export const FORM_LOCATION = "location"
export const FORM_CATEGORY = "category"

const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
});

export const formSchema = z.object({
    [FORM_TITLE]: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    [FORM_DESCRIPTION]: z.string(),
    [FORM_LOCATION]: z.any(),
    [FORM_CATEGORY]: z.array(optionSchema).min(1, {
        message: "Please select at least one item"
    }),
})

export type CreateListingFormData = z.infer<typeof formSchema>;

export interface CreateListingFormProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<CreateListingFormData>
}