"use client"

import { ItemsEntity } from "@/lib/database/items";
import { CardDemo } from "./form/card";

export interface PageCreateProps extends React.HTMLAttributes<HTMLDivElement> {
    existingItems?: ItemsEntity[]
}

export function PageCreate({
    existingItems = []
}: PageCreateProps) {
    return (
        <div className="flex items-center justify-center">
            <CardDemo items={existingItems} />
        </div>
    )
}