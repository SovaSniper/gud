import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { REGISTER_FORM_SURNAME, RegisterFormComponentProps } from "./constants"

export function FormSurname({ form }: RegisterFormComponentProps) {
    return (
        <FormField
            control={form.control}
            name={REGISTER_FORM_SURNAME}
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