import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { FORM_EMAIL, LoginFormProps } from "./schema"
import { Input } from "@/components/core/input"

export function FormEmail({ form }: LoginFormProps) {
    return (
        <FormField
            control={form.control}
            name={FORM_EMAIL}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input {...field} label={FORM_EMAIL} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}