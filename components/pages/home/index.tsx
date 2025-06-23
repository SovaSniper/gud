"use client"

import { useSession, signIn } from "next-auth/react";

export function PageHome({ }: React.HTMLAttributes<HTMLDivElement>) {
    const { data: session } = useSession();

    if (!session) {
        return <button onClick={() => signIn()}>Sign in</button>;
    }

    console.log(session)
    return (
        <div>
            <div className="text-center">Git Gud</div>
        </div>
    )
}