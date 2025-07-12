export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    email: string;
    password: string;
}

export const login = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
    const response = await fetch(`/api/user/login`, {
        method: "POST",
        body: JSON.stringify(request),
    })

    return response.json()
}