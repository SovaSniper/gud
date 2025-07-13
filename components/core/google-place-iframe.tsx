"use client"

import { cn } from "@/lib/utils"

interface GooglePlaceIFrameProps extends React.HTMLAttributes<HTMLDivElement> {
    placeId: string
}

export function GooglePlaceIFrame({ className, placeId }: GooglePlaceIFrameProps) {
    return (
        <iframe
            className={cn("rounded-lg", className)}
            width="100%"
            height="256"
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&q=place_id:${placeId}&zoom=15`}>
        </iframe>
    )
}