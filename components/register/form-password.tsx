import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { REGISTER_FORM_PASSWORD, RegisterFormComponentProps } from "./constants"

export function FormPassword({ form }: RegisterFormComponentProps) {
    return (
        <FormField
            control={form.control}
            name={REGISTER_FORM_PASSWORD}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
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