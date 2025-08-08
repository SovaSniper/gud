"use client"

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner"
import { CreateFormData, formSchema } from "./schema";
import { FormImage } from "./image";
import { FormName } from "./name";
import { FormCondition } from "./condition";
import { listingCreate } from "@/lib/api/listing/create";
import { FormLicense } from "./license";
import { useCreateListing } from "../../provider";

export function CreateForm({ }: React.HTMLAttributes<HTMLDivElement>) {
    const { setItemId, userItems, addUserItems } = useCreateListing()

    const [isLoading, setIsLoading] = useState(false)

    const form: UseFormReturn<CreateFormData> = useForm<CreateFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)

            if (userItems.length >= 5) {
                toast("Limit of 5 items in draft", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })

                return;
            }
            const response = await listingCreate({
                item: {
                    name: values.name,
                    condition: values.condition,
                    license: values.license,
                }
            });

            console.log(response.id)

            if (response.id) {
                setItemId(response.id.toString())

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
                    <FormName form={form} />
                    <FormImage form={form} />
                    <FormLicense form={form} />
                    <FormCondition form={form} />

                    {JSON.stringify(form.getValues())}

                    <Button type="submit" disabled={isLoading}>Create</Button>
                </form>
            </Form>
        </>
    )
}