"use client"

import { Switch } from "@/components/ui/switch"
import { useSession, signIn } from "next-auth/react";
import { CountriesInput } from "./countries-input";
import { EmailDialog } from "./dialog-email";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogDOB } from "./dialog-dob";

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

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-1">
                    <div className="font-semibold">DOB</div>
                </div>

                <DialogDOB />
            </div>

            {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-1">
                    <div className="font-semibold">Gender</div>
                </div>
            </div> */}

            <div>Profile</div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-1">
                    <div className="font-semibold">Country</div>
                </div>
                <CountriesInput />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-1">
                    <div className="font-semibold">Hidden</div>
                </div>
                <Switch />
            </div>

        </div>
    )
}