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
import { Input } from "@/components/ui/input"
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
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

export type RegisterFormData = z.infer<typeof formSchema>;

export function EmailDialog() {
    const [isLoading, setIsLoading] = useState(false)
    const form: UseFormReturn<RegisterFormData> = useForm<RegisterFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            console.log("HERE")
            const result = await userEdit({
                email: values.email
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
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} value="jogn@gmail.com" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
