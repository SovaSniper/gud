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

interface FormTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<CreateFormData>
}

export function FormTitle({ form }: FormTitleProps) {
    return (
        <FormField
            control={form.control}
            name="title"
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