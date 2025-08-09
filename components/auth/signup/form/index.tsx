"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import { SignUpFormEmail } from "./email"
import { Dispatch, SetStateAction, useState } from "react"
import {
    formSchema,
    RegisterFormData
} from "./schema"
import { SignupFormPassword } from "./password"
import { signup } from "../server"
import { redirect } from "next/navigation"
import { SignUpActions } from "../enum"
import { FormTermsPolicy } from "./terms-policy"

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {
    callback: (...args: any[]) => any;
}

export function SignUpForm({ callback }: SignUpFormProps) {
    const [isLoading, setIsLoading] = useState(false)

    const form: UseFormReturn<RegisterFormData> = useForm<RegisterFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            const result = await signup({
                email: values.email,
                password: values.password,
            })

            console.log(result)

            if (result === SignUpActions.DEFAULT) {
                redirect("/")
            }

            callback(result)
        } catch {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
                    <SignUpFormEmail form={form} />
                    <SignupFormPassword form={form} />

                    <FormTermsPolicy form={form} />
                    <Button type="submit" disabled={isLoading}>Submit</Button>
                </form>
            </Form>
        </>
    )
}