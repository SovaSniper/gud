"use client"

import * as React from "react"
import { Check, ChevronsUpDown, CircleX } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useCreateListing } from "./provider"
import { getItemsCondition } from "@/lib/database/enum/items-condition"
import { ItemsEntity } from "@/lib/database/items"
import { useEffect, useState } from "react"

export interface UserItemsProps extends React.HTMLAttributes<HTMLDivElement> {
    items: ItemsEntity[]
}

export function UserItems({ items }: UserItemsProps) {
    const { itemId, setItemId } = useCreateListing()
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<ItemsEntity | undefined>()

    useEffect(() => {
        const selectedItem = items.find((item) => item.id.toString() === itemId)
        setSelectedItem(selectedItem)
    }, [itemId])

    return (
        <div className="flex items-center justify-center">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between h-full"
                    >
                        {selectedItem
                            ? <>
                                <div className="flex items-center gap-4">
                                    <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full">
                                        <img
                                            className="h-full w-full object-cover"
                                            alt="Image"
                                            src="https://placehold.co/600x400"
                                        />
                                    </span>
                                    <div>
                                        <p className="text-sm leading-none font-medium">{selectedItem.name} ({getItemsCondition(parseInt(selectedItem.condition))})</p>
                                        <p className="text-muted-foreground text-sm">Created on {selectedItem.createdAt}</p>
                                    </div>
                                </div>

                            </>
                            : "Select Item"}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {items.map((item) => (
                                    <CommandItem
                                        key={item.id}
                                        value={item.id.toString()}
                                        onSelect={(currentValue) => {
                                            setItemId(item.id.toString())
                                            setOpen(false)
                                        }}
                                    >
                                        {item.name}{getItemsCondition(parseInt(item.condition))}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                itemId === item.id.toString() ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Button onClick={() => setItemId("")}>
                <CircleX />
            </Button>
        </div>
    )
}
