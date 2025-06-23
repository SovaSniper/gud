import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterFormData } from "./form"

interface FormEmailProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<RegisterFormData>
}

export function FormEmail({ form }: FormEmailProps) {
    return (
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}