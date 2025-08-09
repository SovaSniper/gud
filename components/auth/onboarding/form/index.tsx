
"use client"

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormFirstname } from "./firstname";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, OnboardingFormData } from "./schema";
import { useForm, UseFormReturn } from "react-hook-form";
import { useState } from "react";
import z from "zod";
import { FormLastname } from "./lastname";
import { onboard } from "@/lib/api/user/onboard";
import { useRouter } from "next/navigation";

export function OnboardingForm({ }: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const form: UseFormReturn<OnboardingFormData> = useForm<OnboardingFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)

            const response = await onboard({
                firstname: values.firstname,
                lastname: values.lastname,
            })

            if (response.status) {
                router.push("/home");
            } else {
                console.log("There was an error")
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
                    <FormFirstname form={form} />
                    <FormLastname form={form} />

                    <Button type="submit" disabled={isLoading}>Next</Button>
                </form>
            </Form>
        </>
    )
}