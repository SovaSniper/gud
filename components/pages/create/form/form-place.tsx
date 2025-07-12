import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Calculator,
    Calendar,
    CreditCard,
    Search,
    Settings,
    Smile,
    User,
} from "lucide-react"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { CreateFormData } from "."
import { UseFormReturn } from "react-hook-form"
import { GooglePlacesSearchTextResponse, placesSearchText } from "@/lib/google/places/api"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface FormPlaceProps extends React.HTMLAttributes<HTMLDivElement> {
    form: UseFormReturn<CreateFormData>
}

export function FormPlace({ form }: FormPlaceProps) {
    const [value, setValue] = useState<string | undefined>()

    const [response, setResponse] = useState<GooglePlacesSearchTextResponse | null>(null)
    const onSearch = async (value: string) => {
        if (!value) {
            return;
        }

        const places = await placesSearchText({
            textQuery: value
        })

        console.log(places)
        setResponse(places)
    }
    return (
        <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Descrption</FormLabel>
                    <FormControl>
                        <Command className="rounded-lg border">
                            <div className="w-full">
                                <div className="relative">
                                    <Input
                                        placeholder="Filter..."
                                        value={value}
                                        onChange={(e) => {
                                            form.resetField("place")
                                            setValue(e.target.value)
                                        }}
                                    />
                                    {!form.getValues("place") && <Button
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

                            {response && !form.getValues("place") && <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Suggestions">
                                    {response.places.map((place, index) => {
                                        return (
                                            <CommandItem key={index}
                                                onSelect={() => {
                                                    setValue(place.displayName.text)
                                                    form.setValue("place", place)
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
                    </FormControl>
                    <FormMessage />

                    <iframe
                        className="rounded-lg"
                        width="100%"
                        height="256"
                        loading="lazy"
                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&q=place_id:${field.value?.id || "ChIJ3S-JXmauEmsRUcIaWtf4MzE"}&zoom=15`}>
                    </iframe>
                </FormItem>
            )}
        />
    )
}
