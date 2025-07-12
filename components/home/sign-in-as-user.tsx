"use client"

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function SignInAsUserButton({ }: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter();

    const onLogin = async () => {
        const result = await signIn("credentials", {
            email: process.env.NEXT_PUBLIC_TEST_USERNAME,
            password: process.env.NEXT_PUBLIC_TEST_PW,
            redirect: false,
        });

        if (result?.ok && !result?.error) {
            console.log("Logging in")
            router.push("/app/home")
        }
    }
    return (
        <Button onClick={onLogin}>Sign In As User</Button>
    )
}