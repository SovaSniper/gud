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

interface FormFirstnameProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<RegisterFormData>
}

export function FormFirstname({ form }: FormFirstnameProps) {
    return (
        <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}