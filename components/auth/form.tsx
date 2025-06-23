"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { FormEmail } from "./form-email";
import { FormPassword } from "./form-password";
import { Form } from "../ui/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export type RegisterFormData = z.infer<typeof formSchema>;

enum AuthEmailSteps {
    EMAIL = 0,
    PASSWORD = 1,
}

export function AuthEmail({ }: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter();
    const [step, setStep] = useState(AuthEmailSteps.EMAIL)
    const totalSteps = 2

    const form: UseFormReturn<RegisterFormData> = useForm<RegisterFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        // const result = await login({
        //     email: values.email,
        //     password: values.password
        // })
        const result = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });
        console.log(result)

        if (result?.ok && !result?.error) {
            console.log("Logging in")
            router.push("/app/home")
        } else {
            form.setError("password", { message: result?.error || "Please try again later" })
        }
    }

    const onNext = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        if (step === AuthEmailSteps.EMAIL) {
            const valid = await form.trigger(["email"])
            if (valid) {
                setStep(AuthEmailSteps.PASSWORD)
            }
        }
    }

    useEffect(() => {
        console.log("Clear Form")
        form.clearErrors()
    }, [step])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid space-y-2">
                {step === 0 && (
                    <FormEmail form={form} />
                )}
                {step === 1 && (
                    <FormPassword form={form} />
                )}
                {step !== (totalSteps - 1)
                    ? <Button type="button" onClick={onNext}>Sign In with Email</Button>
                    : <Button type="submit">Submit</Button>
                }
            </form>
        </Form>
    )
}