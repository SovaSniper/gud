export interface UserEditRequest {
    email?: string;
    dob?: Date;
    password?: string;
}

export interface UserEditResponse {
    result: boolean;
}

export const userEdit = async (registration: UserEditRequest): Promise<UserEditResponse> => {
    const response = await fetch(`/api/user/edit`, {
        method: "POST",
        body: JSON.stringify(registration),
    })

    return response.json()
}