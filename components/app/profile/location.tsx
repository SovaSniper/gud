"use client"

import {
    Search,
    Smile,
} from "lucide-react"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { GooglePlace, GooglePlacesSearchTextResponse, placesSearchText } from "@/lib/google/places/api"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { userUpdate } from "@/lib/api/user/update"
import { useApp } from "../provider"
import { toast } from "sonner"
import { LocationTab } from "@/components/core/location-tab"

export function ProfileLocation({ }: React.HTMLAttributes<HTMLDivElement>) {
    const { locationPreference, setLocationPreference } = useApp()
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const [isUpdating, setIsUpdating] = useState<boolean>(false)

    const [value, setValue] = useState<string | undefined>()
    const [locationValue, setLocationValue] = useState<GooglePlace | undefined>(locationPreference)

    const [response, setResponse] = useState<GooglePlacesSearchTextResponse | null>(null)
    const onSearch = async (value: string) => {
        if (!value) {
            return;
        }

        setIsHidden(false)
        const places = await placesSearchText({
            textQuery: value
        })

        console.log(places)
        setResponse(places)
    }

    const onUpdate = async () => {
        try {
            if (!locationValue) return
            if (locationValue.id === locationPreference?.id) return

            setIsUpdating(true)
            const response = await userUpdate({
                request: {
                    location: locationValue,
                }
            })

            if (response) {
                setLocationPreference(locationValue)
                toast("Location updated")
            }
        } catch (e: any) {
            console.log("error", e.message)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <>
            {locationPreference && <div className="flex items-center gap-2">
                <div>Current Location:</div>
                <LocationTab place={locationPreference} />
            </div>}

            <Command className="rounded-lg my-2">
                <div className="w-full">
                    <div className="relative">
                        <Input
                            className="border"
                            placeholder="Filter..."
                            value={value}
                            onChange={(e) => {
                                // form.resetField(FORM_LOCATION)
                                setValue(e.target.value)
                            }}
                        />
                        {<Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            onClick={() => {
                                onSearch(value || '')
                            }}
                        >
                            <Search />
                        </Button>}
                    </div>
                </div>

                {response && !isHidden && <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {response.places.map((place, index) => {
                            return (
                                <CommandItem key={index}
                                    onSelect={() => {
                                        setValue(place.displayName.text)
                                        setLocationValue(place)
                                        setIsHidden(true)
                                    }}
                                >
                                    <Smile />
                                    <span>{place.displayName.text}</span>
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>
                    <CommandSeparator />
                </CommandList>}
            </Command>

            <Button size="sm" onClick={onUpdate} disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Location"}
            </Button>
            {/* <iframe
                className="rounded-lg"
                width="100%"
                height="256"
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&q=place_id:${field.value?.id || "ChIJ3S-JXmauEmsRUcIaWtf4MzE"}&zoom=15`}>
            </iframe> */}
        </>
    )
}
