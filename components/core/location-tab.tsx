"use client"

import { Place } from "@/lib/models/event"
import { MapPin } from "lucide-react"

interface LocationTabProps extends React.HTMLAttributes<HTMLDivElement> {
    place: Place
}

export function LocationTab({ place }: LocationTabProps) {

    const getCountryAndSuburb = (address: string): string => {
        const parts = address.split(',').map(part => part.trim());

        if (parts.length >= 2) {
            return parts.slice(-2).join(', ');
        } else if (parts.length === 1) {
            return parts[0];
        } else {
            return '';
        }
    };

    return (
        <div className="flex items-center gap-2">
            <div className="border rounded-lg size-[50px] flex items-center justify-center">
                <MapPin />
            </div>

            <div>
                <a
                    className="font-semibold text-lg"
                    href={`https://www.google.com/maps/search/?api=1&query=${place.displayName.text}&query_place_id=${place.id}`}
                    target="_blank"
                >
                    {place.displayName.text}
                </a>

                <div className="text-muted-foreground">
                    {getCountryAndSuburb(place.formattedAddress)}
                </div>
            </div>
        </div>
    )
}