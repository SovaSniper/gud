import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterFormData } from "./form"

interface FormSurnameProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<RegisterFormData>
}

export function FormSurname({ form }: FormSurnameProps) {
    return (
        <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}