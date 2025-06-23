"use client"

import React, { JSX, useState } from "react"
import { ChevronDown, ChevronUp, Delete } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface CollapsibleChevronProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: JSX.Element
    name?: string
    onClosed?: () => void
}

export function CollapsibleChevron({
    logo,
    name = "Metadata",
    onClosed,
    className,
    children,
}: CollapsibleChevronProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className={cn("my-1 gap-2", className)}
        >
            <CollapsibleTrigger className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "flex w-full flex-1 cursor-pointer items-center gap-3 border rounded-2xl !px-5 !py-3 transition-colors pt-0 justify-between")}>
                <div className="flex items-center space-x-2 truncate text-lg">
                    {logo && React.cloneElement(logo, {
                        className: 'shrink-0 size-[24px]',
                    })}
                    <div>{name}</div>
                </div>
                <div className="flex space-x-2">
                    <div
                        className={buttonVariants({ variant: "ghost", size: "icon" })}
                    >
                        {isOpen
                            ? <ChevronUp className="shrink-0 size-[24px]" />
                            : <ChevronDown className="shrink-0 size-[24px]" />
                        }
                    </div>
                    {onClosed && (
                        <div
                            className={buttonVariants({ variant: "ghost", size: "icon" })}
                            onClick={onClosed}
                        >
                            <Delete />
                        </div>
                    )}
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="">{children}</CollapsibleContent>
        </Collapsible>
    )
}