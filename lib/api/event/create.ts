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

export const eventCreate = async (request: EventCreateRequest): Promise<EventCreateResponse> => {
    const response = await fetch(`/api/event/create`, {
        method: "POST",
        body: JSON.stringify(request),
    })

    return response.json()
}