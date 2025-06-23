"use client"

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function PageHome({ }: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter();

    return (
        <div>
            <div>App HomePage</div>

            <Button onClick={() => router.push("/auth")}>Sign in</Button>
        </div>
    )
}