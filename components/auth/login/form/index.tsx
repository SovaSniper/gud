"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { login } from "../server";
import { FormEmail } from "./email";
import { FormPassword } from "./password";
import { formSchema, LoginFormData } from "./schema";

export function LogInForm({ }: React.HTMLAttributes<HTMLDivElement>) {
    const [isLoading, setIsLoading] = useState(false)

    const form: UseFormReturn<LoginFormData> = useForm<LoginFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onFormAction = (formData: FormData) => {
        setIsLoading(true)
        login(formData)
    }

    return (
        <Form {...form}>
            <form
                className="grid space-y-2">
                <FormEmail form={form} />
                <FormPassword form={form} />
                <Button type="submit" disabled={isLoading} formAction={onFormAction}>Git Log In</Button>
            </form>
        </Form>
    )
}