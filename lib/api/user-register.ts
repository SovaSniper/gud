export interface UserRegisterRequest {
    firstname: string;
    surname: string;
    email: string;
    gender: string;
    dob: Date;
    password: string;
}

export interface UserRegisterResponse {
    firstname: string;
    surname: string;
    email: string;
    gender: string;
    dob: Date;
    password: string;
}

export const register = async (registration: UserRegisterRequest): Promise<UserRegisterResponse> => {
    const response = await fetch(`/api/user/register`, {
        method: "POST",
        body: JSON.stringify(registration),
    })

    return response.json()
}