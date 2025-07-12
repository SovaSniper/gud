export interface UserRegisterRequest {
    handler: string;
    firstname: string;
    surname: string;
    email: string;
    password: string;
}

export interface UserRegisterResponse {
    handler: string;
}

export const register = async (request: UserRegisterRequest): Promise<UserRegisterResponse> => {
    const response = await fetch(`/api/user/register`, {
        method: "POST",
        body: JSON.stringify(request),
    })

    return response.json()
}