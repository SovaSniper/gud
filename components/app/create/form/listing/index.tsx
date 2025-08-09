"use client"

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateListingFormData, formSchema } from "./schema";
import { FormTitle } from "./title";
import { FormCategory } from "./category";
import { FormDescription } from "./description";
import { FormLocation } from "./location";
import { listingCreate } from "@/lib/api/listing/create";
import { useCreateListing } from "../../provider";

export function CreateListingForm({ }: React.HTMLAttributes<HTMLDivElement>) {
    const { itemId } = useCreateListing()
    const [isLoading, setIsLoading] = useState(false)

    const form: UseFormReturn<CreateListingFormData> = useForm<CreateListingFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)

            const response = await listingCreate({
                listing: {
                    itemId: itemId!,
                    title: values.title,
                    description: values.description,
                    location: values.location,
                    category: values.category.map(x => x.value),
                }
            });

            console.log(response)
        } catch {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">

                    <FormTitle form={form} />
                    <FormDescription form={form} />

                    <FormLocation form={form} />
                    <FormCategory form={form} />

                    {JSON.stringify(form.getValues())}

                    <Button type="submit" disabled={isLoading}>Create</Button>
                </form>
            </Form>
        </>
    )
}