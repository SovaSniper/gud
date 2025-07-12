import { UseFormReturn } from "react-hook-form"
import { CreateFormData } from "."

export interface CreateFormComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<CreateFormData>
}

export const REGISTER_FORM_TITLE = "title"
export const REGISTER_FORM_DESCRIPTION = "description"
export const REGISTER_FORM_VISIBILITY = "visibility"
export const REGISTER_FORM_PLACE = "place"
export const REGISTER_FORM_TIME = "time"
