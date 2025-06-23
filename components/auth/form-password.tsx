import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RegisterFormData } from "./form"
import { Input } from "../ui/input"

interface FormPasswordProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<RegisterFormData>
}

export function FormPassword({ form }: FormPasswordProps) {
    return (
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                    <div>Password</div>
                    <FormControl>
                        <Input
                            type="password"
                            placeholder="Enter password"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}