import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateFormData } from "."
import { Textarea } from "@/components/ui/textarea"

interface FormDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<CreateFormData>
}

export function FormDescription({ form }: FormDescriptionProps) {
    return (
        <FormField
            control={form.control}
            name="description"
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