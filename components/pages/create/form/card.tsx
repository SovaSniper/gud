import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { CreateForm } from "./item"
import { UserItems } from "../user-items"
import { Separator } from "@/components/core/seperator"
import { useEffect, useState } from "react"
import { CreateListingForm } from "./listing"
import { useCreateListing } from "../provider"
import { ItemsEntity } from "@/lib/database/items"

enum PageCreateSteps {
    ITEMS_CREATION = 0,
    LISTING_CREATION = 1,
}

export interface PageCreateProps extends React.HTMLAttributes<HTMLDivElement> {
    items: ItemsEntity[]
}

export function CardDemo({ items }: PageCreateProps) {
    const { itemId } = useCreateListing()

    const [step, setStep] = useState(PageCreateSteps.ITEMS_CREATION)
    const totalSteps = 2

    useEffect(() => {
        setStep(itemId?.trim() ? PageCreateSteps.LISTING_CREATION : PageCreateSteps.ITEMS_CREATION);
    }, [itemId])

    return (
        <Card className="w-full max-w-xl border-none shadow-none">
            <CardContent>
                <UserItems items={items} />
                {step === PageCreateSteps.ITEMS_CREATION && (
                    <>
                        <h2>Create your items to list</h2>
                        <Separator text="or" />
                        <CreateForm />
                    </>
                )}
                {step === PageCreateSteps.LISTING_CREATION && (
                    <>
                        <h2>Create your listing</h2>
                        <CreateListingForm />
                    </>
                )}

            </CardContent>
        </Card>
    )
}
