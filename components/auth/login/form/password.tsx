import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/core/input"
import { FORM_PASSWORD, LoginFormProps } from "./schema"

export function FormPassword({ form }: LoginFormProps) {
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