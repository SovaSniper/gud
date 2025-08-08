"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

interface ErrorPageProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: string
}

export function ErrorPage({ text }: ErrorPageProps) {
    const router = useRouter();

    return (
        <div className="h-[100vh] w-[100%] flex flex-col items-center justify-center text-center space-y-2">
            <code className="text-2xl">404 Error</code>
            {text && <div>{text}</div>}
            <Button onClick={() => router.push("/")} variant="outline">Home</Button>
        </div>
    )
}
