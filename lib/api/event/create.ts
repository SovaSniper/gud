import { Place } from "@/lib/models/event";

export interface EventCreateRequest {
    title: string;
    description: string;
    visibility: string;
    location: Place;
    time: Date;
}

export interface EventCreateResponse {
    id: string;
}

export const eventCreate = async (request: EventCreateRequest, image?: File): Promise<EventCreateResponse> => {
    const formData = new FormData()

    if (image) {
        formData.append('image', image)
    }

    formData.append('event', JSON.stringify(request))

    const response = await fetch(`/api/event/create`, {
        method: "POST",
        body: formData,
    })

    return response.json()
}