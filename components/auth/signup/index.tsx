"use client"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { SignUpForm } from "./form"
import { useState } from "react"
import { SignUpActions } from "./enum"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AuthHeader } from "../header"

export function SignUpSection({ }: React.HTMLAttributes<HTMLDivElement>) {
    const [signUpResult, setSignUpResult] = useState<SignUpActions>()

    const displayResult = () => {
        switch (signUpResult) {
            case SignUpActions.CONFIRM:
                return <SignUpConfirmEmail />
            case SignUpActions.ERROR:
            default:
                return (
                    <div>There was an error</div>
                )
        }
    }
    return (
        <Card className="w-full max-w-xl border-none shadow-none" >
            <CardContent>
                {signUpResult
                    ?
                    <div>{displayResult()}</div>
                    : <>
                        <AuthHeader className="my-4 text-center">Create an account</AuthHeader>
                        <SignUpForm callback={setSignUpResult} />
                    </>
                }
            </CardContent>
        </Card>
    )
}

function SignUpConfirmEmail() {
    const router = useRouter();

    const onClick = () => router.push("/login");

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <Mail size={64} className="text-primary" />
            <div className="text-center">
                🎉 Thanks for signing up!
                Please check your email for a confirmation link to activate your account.
            </div>

            <Button
                size="sm"
                variant="outline"
                onClick={onClick}>
                Login
            </Button>
        </div>
    )
}