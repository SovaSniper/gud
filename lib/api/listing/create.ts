import { GooglePlace } from "@/lib/google/places/api";
import { APIErrorResponse } from "../error";

export interface ListingCreateRequest {
    item?: {
        name: string;
        condition: string;
        license: boolean;
    },
    listing?: {
        itemId: string;
        title: string;
        description: string;
        location: GooglePlace;
        category: string[]
    }
}

export interface ListingCreateResponse {
    id: string;
}

export const listingCreate = async (request: ListingCreateRequest, image?: File): Promise<ListingCreateResponse> => {
    const formData = new FormData()

    if (image) {
        formData.append('image', image)
    }

    formData.append('event', JSON.stringify(request))

    const response = await fetch(`/api/listing/create`, {
        method: "POST",
        body: formData,
    })

    if (!response.ok) {
        const errorData: APIErrorResponse = await response.json();
        console.error("API error:", errorData.message);
        throw new Error(errorData.message);
    }

    return response.json()
}