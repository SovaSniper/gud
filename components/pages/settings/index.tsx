"use client"

import { Switch } from "@/components/ui/switch"
import { useSession, signIn } from "next-auth/react";
import { EmailDialog } from "./dialog-email";

export function PageSettings({ }: React.HTMLAttributes<HTMLDivElement>) {
    const { data: session } = useSession();

    if (!session) {
        return <button onClick={() => signIn()}>Sign in</button>;
    }

    console.log(session)
    return (
        <div>
            <div>Basic</div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-1">
                    <div className="font-semibold">Email</div>
                </div>

                <EmailDialog />
            </div>

            <div>Profile</div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-1">
                    <div className="font-semibold">Hidden</div>
                </div>
                <Switch />
            </div>

        </div>
    )
}