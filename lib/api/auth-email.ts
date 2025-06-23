export interface AuthEmailRequest {
    value: string;
}

export interface AuthEmailResponse {
    available: boolean;
}

export const verifyEmail = async (registration: AuthEmailRequest): Promise<AuthEmailResponse> => {
    const response = await fetch(`/api/auth/email`, {
        method: "POST",
        body: JSON.stringify(registration),
    })

    return response.json()
}