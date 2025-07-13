"use client"

import { SignInAsUserButton } from "./sign-in-as-user";

export function PageHome({ }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="flex items-center justify-center">
            <div>
                <div className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">BBM</div>

                <SignInAsUserButton />
            </div>
        </div>
    )
}