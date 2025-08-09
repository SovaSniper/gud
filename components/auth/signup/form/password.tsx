import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/core/input"
import { FORM_PASSWORD, SignupFormProps } from "./schema"

export function SignupFormPassword({ form }: SignupFormProps) {
    return (
        <FormField
            control={form.control}
            name={FORM_PASSWORD}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            type="password"
                            {...field}
                            label={FORM_PASSWORD}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}