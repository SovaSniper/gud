import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { REGISTER_FORM_HANDLER, RegisterFormComponentProps } from "./constants"
import { AtSign } from "lucide-react"

export function FormHandler({ form }: RegisterFormComponentProps) {
    return (
        <FormField
            control={form.control}
            name={REGISTER_FORM_HANDLER}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            leftIcon={<AtSign />}
                            placeholder="Handler"
                            {...field}
                            className="pl-10"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}