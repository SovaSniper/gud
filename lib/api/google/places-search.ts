import { GooglePlacesSearchTextRequest, GooglePlacesSearchTextResponse } from "@/lib/google/places/api";

export const googlePlacesSearch = async (request: GooglePlacesSearchTextRequest): Promise<GooglePlacesSearchTextResponse> => {
    const response = await fetch(`/api/google/places/search`, {
        method: "POST",
        headers: {
            'Referer': 'http://localhost:3000',
            'User-Agent': 'bbm',
        },
        body: JSON.stringify(request),
    })

    return response.json()
}