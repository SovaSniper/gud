export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    email: string;
    password: string;
}

export const login = async (registration: UserLoginRequest): Promise<UserLoginResponse> => {
    const response = await fetch(`/api/user/login`, {
        method: "POST",
        body: JSON.stringify(registration),
    })

    return response.json()
}