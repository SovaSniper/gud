import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateListingFormProps, FORM_TITLE } from "./schema"

export function FormTitle({ form }: CreateListingFormProps) {
    return (
        <FormField
            control={form.control}
            name={FORM_TITLE}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            className="!border-none p-0 !text-2xl !font-semibold"
                            placeholder="Event Name"
                            {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}