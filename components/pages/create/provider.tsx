"use client"

import { ItemsEntity } from "@/lib/database/items"
import React, { createContext, useContext, useEffect, useState } from "react"

export const CreateListingProvider = ({ children, initalUserItems = [] }: CreateListingProviderProps) => {
    const [itemId, setItemId] = useState<string>()
    const [userItems, setUserItems] = useState<ItemsEntity[]>([])

    const addUserItems = (item: ItemsEntity) => {
        setUserItems((prev) => [...prev, item]);
    }

    useEffect(() => {
        setUserItems(initalUserItems)
    }, [])

    return (
        <ListingContext.Provider
            value={{
                itemId,
                setItemId,
                userItems,
                addUserItems
            }}
        >
            {children}
        </ListingContext.Provider>
    )
}

interface CreateListingProviderProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string
    initalUserItems?: ItemsEntity[]
}

export const ListingContext = createContext({
    itemId: "" as string | undefined,
    setItemId: (_: string) => { },
    userItems: [] as ItemsEntity[],
    addUserItems: (_: ItemsEntity) => { }
})

export const useCreateListing = () => useContext(ListingContext)
