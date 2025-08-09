import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/core/input"
import { FORM_EMAIL, SignupFormProps } from "./schema"

export function SignUpFormEmail({ form }: SignupFormProps) {
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