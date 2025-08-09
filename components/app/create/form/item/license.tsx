import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { CreateFormProps, FORM_LICENSE_REQUIRED } from "./schema"
import { Checkbox } from "@/components/ui/checkbox"

export function FormLicense({ form }: CreateFormProps) {
    return (
        <FormField
            control={form.control}
            name={FORM_LICENSE_REQUIRED}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                className="m-0"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            <p>Does this need license</p>
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}