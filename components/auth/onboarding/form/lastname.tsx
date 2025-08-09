import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/core/input"
import { FORM_LASTNAME, OnboardingFormProps } from "./schema"

export function FormLastname({ form }: OnboardingFormProps) {
    return (
        <FormField
            control={form.control}
            name={FORM_LASTNAME}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input {...field} label={FORM_LASTNAME} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}