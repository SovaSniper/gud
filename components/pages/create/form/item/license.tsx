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
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}

                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>Use different settings for my mobile devices</FormLabel>
                        <FormDescription>You can manage your mobile notifications in the mobile settings page.</FormDescription>
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    )
}