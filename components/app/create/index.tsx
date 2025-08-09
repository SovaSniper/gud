"use client"

import { ItemsEntity } from "@/lib/database/items";
import { CreateForm } from "./form";

export interface PageCreateProps extends React.HTMLAttributes<HTMLDivElement> {
    existingItems?: ItemsEntity[]
}

export function PageCreate({
    existingItems = []
}: PageCreateProps) {
    return (
        <div className="flex items-center justify-center w-full">
            <CreateForm items={existingItems} />
        </div>
    )
}