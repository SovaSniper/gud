import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { CreateFormComponentProps, REGISTER_FORM_VISIBILITY } from "./constants"
import { Globe } from "lucide-react"

export function FormVisibility({ form }: CreateFormComponentProps) {
    return (
        <FormField
            control={form.control}
            name={REGISTER_FORM_VISIBILITY}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shadow-none">
                                <Globe />
                                <SelectValue placeholder="PUBLIC" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="PUBLIC">PUBLIC</SelectItem>
                            <SelectItem value="PRIVATE">PRIVATE</SelectItem>
                        </SelectContent>
                    </Select>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}