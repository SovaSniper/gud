"use client"

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function PageHome({ }: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter();

    return (
        <div>
            <div className="text-center text-xl my-2">Git GUD</div>

            <Button onClick={() => router.push("/auth")}>Sign in</Button>
            <Button onClick={() => router.push("/register")}>Register</Button>
        </div>
    )
}