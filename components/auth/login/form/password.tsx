import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FORM_PASSWORD, LoginFormProps } from "./schema"

export function LoginFormPassword({ form }: LoginFormProps) {
    return (
        <FormField
            control={form.control}
            name={FORM_PASSWORD}
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