export interface AuthEmailRequest {
    email: string;
    handler: string;
}

export interface AuthEmailResponse {
    isUserNameAvailable: boolean;
    isHandlerAvailable: boolean;
}

export const verifyEmail = async (request: AuthEmailRequest): Promise<AuthEmailResponse> => {
    const response = await fetch(`/api/auth/email`, {
        method: "POST",
        body: JSON.stringify(request),
    })

    return response.json()
}