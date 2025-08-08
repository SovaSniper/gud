import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FORM_EMAIL, LoginFormProps } from "./schema"

export function LoginFormEmail({ form }: LoginFormProps) {
    return (
        <FormField
            control={form.control}
            name={FORM_EMAIL}
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