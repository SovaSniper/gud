"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { login } from "../server";
import { LoginFormEmail } from "./email";
import { LoginFormPassword } from "./password";
import { formSchema, LoginFormData } from "./schema";

export function LoginSection({ }: React.HTMLAttributes<HTMLDivElement>) {
    const [isLoading, setIsLoading] = useState(false)

    const form: UseFormReturn<LoginFormData> = useForm<LoginFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //     try {
    //         setIsLoading(true)
    //         // const result = await signIn("credentials", {
    //         //     email: values.email,
    //         //     password: values.password,
    //         //     redirect: false,
    //         // });

    //         // if (result?.ok && !result?.error) {
    //         //     console.log("Logging in")
    //         //     router.push("/home")
    //         // } else {
    //         //     form.setError("password", { message: result?.error || "Please try again later" })
    //         // }

    //     } catch (e: any) {

    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    return (
        <Form {...form}>
            <form
                // onSubmit={form.handleSubmit(onSubmit)}
                className="grid space-y-2">
                <LoginFormEmail form={form} />
                <LoginFormPassword form={form} />
                <Button type="submit" disabled={isLoading} formAction={login}>Git Log In</Button>
            </form>
        </Form>
    )
}