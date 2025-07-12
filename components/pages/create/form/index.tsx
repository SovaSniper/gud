"use client"

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import z from "zod";
import { FormTitle } from "./form-title";
import { FormDescription } from "./form-description";
import { FormPlace } from "./form-place";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormTime } from "./form-time";
import { FormVisibility } from "./form-visibility";
import { eventCreate } from "@/lib/api/event/create";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    visibility: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    place: z.any(),
    time: z.coerce.date({
        required_error: "Date of birth is required.",
        invalid_type_error: "Invalid date format.",
    }),
    // tags: z.array(z.string())
})

export type CreateFormData = z.infer<typeof formSchema>;

export function CreateForm({ }: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false)

    const form: UseFormReturn<CreateFormData> = useForm<CreateFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            visibility: "PUBLIC"
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            const response = await eventCreate({
                title: values.title,
                description: values.description,
                visibility: values.visibility,
                location: values.place,
                time: values.time,
            });

            console.log(response)

            if (response.id) {
                router.push(`/e/${response.id}`)
            }
        } catch {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
                    <FormVisibility form={form} />
                    <FormTitle form={form} />
                    <FormDescription form={form} />
                    <FormTime form={form} />

                    <FormPlace form={form} />

                    {JSON.stringify(form.getValues())}

                    <Button type="submit" disabled={isLoading}>Create</Button>
                </form>
            </Form>
        </>
    )
}