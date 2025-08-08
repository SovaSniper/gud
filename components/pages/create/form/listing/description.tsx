import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { CreateListingFormProps, FORM_DESCRIPTION } from "./schema"

export function FormDescription({ form }: CreateListingFormProps) {
    return (
        <FormField
            control={form.control}
            name={FORM_DESCRIPTION}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Descrption</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Placeholder"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}