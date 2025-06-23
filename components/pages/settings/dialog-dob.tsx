import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calender"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { userEdit } from "@/lib/api/user-edit"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import z from "zod"

const formSchema = z.object({
    dob: z.coerce.date({
        required_error: "Date of birth is required.",
        invalid_type_error: "Invalid date format.",
    }),
})

export type RegisterFormData = z.infer<typeof formSchema>;

export function DialogDOB() {
    const [isLoading, setIsLoading] = useState(false)
    const form: UseFormReturn<RegisterFormData> = useForm<RegisterFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            console.log("HERE")
            const result = await userEdit({
                dob: values.dob
            })
            console.log(result)
        } catch {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <Dialog
                onOpenChange={() => {
                    form.reset();
                }}>
                <DialogTrigger asChild>
                    <Button variant="link">Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <FormDOB form={form} />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading}>Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >
        </Form >
    )
}

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
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}