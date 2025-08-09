export interface UserOnboardRequest {
    firstname: string;
    lastname: string;
}

export interface UserOnboardResponse {
    status: string;
}

export const onboard = async (request: UserOnboardRequest): Promise<UserOnboardResponse> => {
    const response = await fetch(`/api/user/onboard`, {
        method: "POST",
        body: JSON.stringify(request),
    })

    return response.json()
}