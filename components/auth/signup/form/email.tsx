import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { REGISTER_FORM_EMAIL, SignupFormProps } from "./schema"
import { Mail } from "lucide-react"

export function SignUpFormEmail({ form }: SignupFormProps) {
    return (
        <FormField
            control={form.control}
            name={REGISTER_FORM_EMAIL}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-2xl">Let&apos;s start with your email</FormLabel>
                    <FormControl>
                        <Input placeholder="Email" {...field} leftIcon={<Mail />} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}