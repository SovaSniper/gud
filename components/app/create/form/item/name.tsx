import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/core/input"
import { CreateFormProps, FORM_NAME } from "./schema"

export function FormName({ form }: CreateFormProps) {
    return (
        <FormField
            control={form.control}
            name={FORM_NAME}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            className="!border-none p-0 !text-2xl !font-semibold"
                            label="Items or Service Name"
                            {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}