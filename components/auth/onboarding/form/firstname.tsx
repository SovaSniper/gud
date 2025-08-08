import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FORM_FIRSTNAME, OnboardingFormProps } from "./schema"

export function FormFirstname({ form }: OnboardingFormProps) {
    return (
        <FormField
            control={form.control}
            name={FORM_FIRSTNAME}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input {...field}
                            placeholder="John"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}