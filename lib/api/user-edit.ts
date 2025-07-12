export interface UserEditRequest {
    email?: string;
    dob?: Date;
    password?: string;
}

export interface UserEditResponse {
    result: boolean;
}

export const userEdit = async (request: UserEditRequest): Promise<UserEditResponse> => {
    const response = await fetch(`/api/user/edit`, {
        method: "POST",
        body: JSON.stringify(request),
    })

    return response.json()
}