"use client"

import { CardDemo } from "./form/card";

export function PageCreate({ }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="flex items-center justify-center">
            <CardDemo />
        </div>
    )
}