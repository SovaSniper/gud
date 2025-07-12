"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import { FormFirstname } from "./form-firstname"
import { FormSurname } from "./form-surname"
import { FormEmail } from "./form-email"
import { FormPassword } from "./form-password"
import { useEffect, useState } from "react"
import { register } from "@/lib/api/user/register"
import { verifyEmail } from "@/lib/api/auth-email"
import { useRouter } from "next/navigation"
import { FormHandler } from "./form-handler"
import {
    REGISTER_FORM_EMAIL,
    REGISTER_FORM_FIRSTNAME,
    REGISTER_FORM_HANDLER,
    REGISTER_FORM_PASSWORD,
    REGISTER_FORM_SURNAME
} from "./constants"

const formSchema = z.object({
    [REGISTER_FORM_EMAIL]: z.string().email({
        message: "Please enter a valid email address.",
    }),
    [REGISTER_FORM_HANDLER]: z.string()
        .min(3, {
            message: "First name must be at least 2 characters.",
        })
        .regex(/^[a-zA-Z0-9]+$/, {
            message: "Handler can only contain letters and numbers (no spaces or symbols).",
        }),
    [REGISTER_FORM_FIRSTNAME]: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    [REGISTER_FORM_SURNAME]: z.string().min(2, {
        message: "Surname must be at least 2 characters.",
    }),
    [REGISTER_FORM_PASSWORD]: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export type RegisterFormData = z.infer<typeof formSchema>;

export function ProfileForm() {
    const router = useRouter();
    const [step, setStep] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const totalSteps = 3

    const form: UseFormReturn<RegisterFormData> = useForm<RegisterFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            handler: "",
            firstname: "",
            surname: "",
            email: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            const result = await register({
                handler: values.handler,
                email: values.email,
                firstname: values.firstname,
                surname: values.surname,
                password: values.password,
            })

            if (result.handler) {
                router.push("/app/home")
            }
        } catch {

        } finally {
            setIsLoading(false)
        }
    }

    const onNext = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        if (step === 0) {
            const valid = await form.trigger([REGISTER_FORM_EMAIL, REGISTER_FORM_HANDLER])
            if (valid) {
                // Check if new email
                const [email, handler] = form.getValues([REGISTER_FORM_EMAIL, REGISTER_FORM_HANDLER]);
                const result = await verifyEmail({ email, handler })
                if (!result.isUserNameAvailable) {
                    form.setError(REGISTER_FORM_EMAIL, { message: "Please try different email" })
                }

                if (!result.isUserNameAvailable) {
                    form.setError(REGISTER_FORM_HANDLER, { message: "Please try different handler" })
                }

                setStep(step + 1)
            }
        } else if (step === 1) {
            const valid = await form.trigger([REGISTER_FORM_FIRSTNAME, REGISTER_FORM_SURNAME])
            if (valid) {
                setStep(step + 1)
            }
        } else if (step === 2) {
            const valid = await form.trigger([REGISTER_FORM_PASSWORD])
            if (valid) {
                setStep(step + 1)
            }
        }
    }

    const onBack = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        if (step > 0) {
            setStep(step - 1)
        }
    }

    useEffect(() => {
        console.log("Clear Form")
        form.clearErrors()
    }, [step])

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
                    {step === 0 && (
                        <>
                            <FormEmail form={form} />
                            <FormHandler form={form} />
                        </>
                    )}
                    {step === 1 && (
                        <>
                            <FormFirstname form={form} />
                            <FormSurname form={form} />
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <FormPassword form={form} />
                        </>
                    )}

                    <div className="items-center flex justify-between">
                        {step > 0 && <Button type="button" variant="link" onClick={onBack}>Back</Button>}
                        {step !== (totalSteps - 1)
                            ? <Button type="button" onClick={onNext}>Continue</Button>
                            : <Button type="submit" disabled={isLoading}>Submit</Button>
                        }
                    </div>
                </form>
            </Form>
        </>
    )
}