import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { REGISTER_FORM_FIRSTNAME, RegisterFormComponentProps } from "./constants"

export function FormFirstname({ form }: RegisterFormComponentProps) {
    return (
        <FormField
            control={form.control}
            name={REGISTER_FORM_FIRSTNAME}
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