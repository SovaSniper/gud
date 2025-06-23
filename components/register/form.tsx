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
import { UserGender } from "@/lib/models/user-gender"
import { FormGender } from "./form-gender"
import { FormPassword } from "./form-password"
import { FormDOB } from "./form-dob"
import { useEffect, useState } from "react"
import { register } from "@/lib/api/user-register"
import { verifyEmail } from "@/lib/api/auth-email"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    firstname: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    surname: z.string().min(2, {
        message: "Surname must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    gender: z.enum([UserGender.MALE, UserGender.FEMALE, UserGender.NON_BINARY, UserGender.OTHER], {
        message: "Please select a valid gender.",
    }),
    dob: z.coerce.date({
        required_error: "Date of birth is required.",
        invalid_type_error: "Invalid date format.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})
    .refine((data) => {
        if (!data.dob) return true;
        const today = new Date();
        const age = today.getFullYear() - data?.dob!.getFullYear();
        return age >= 18;
    }, {
        message: "You must be at least 18 years old.",
        path: ["dob"],
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
                firstname: values.firstname,
                surname: values.surname,
                password: values.password,
                dob: values.dob,
                gender: values.gender.toString(),
                email: values.email
            })

            if (result.email) {
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
            const valid = await form.trigger(["email"])
            if (valid) {
                // Check if new email
                const email = form.getValues("email");
                const result = await verifyEmail({ value: email })
                if (!result.available) {
                    form.setError("email", { message: "Please try different email" })
                } else {
                    setStep(step + 1)
                }
            }
        } else if (step === 1) {
            const valid = await form.trigger(["firstname", "surname", "gender", "dob"])
            if (valid) {
                setStep(step + 1)
            }
        } else if (step === 2) {
            const valid = await form.trigger(["password"])
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
                            <FormPassword form={form} />
                        </>
                    )}
                    {step === 1 && (
                        <>
                            <FormFirstname form={form} />
                            <FormSurname form={form} />
                            <FormGender form={form} />
                            <FormDOB form={form} />
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