import { UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RegisterFormData } from "./form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calender"

interface FormDOBProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<RegisterFormData>
}

export function FormDOB({ form }: FormDOBProps) {
    return (
        <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                captionLayout="dropdown"
                                onSelect={field.onChange}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormDescription>Must be over 18</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}