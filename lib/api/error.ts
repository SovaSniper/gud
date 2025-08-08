export interface APIErrorResponse {
    message: string;
}

export const ResponseError = ({ message, status = 500 }: {
    message: string;
    status?: number;
}): Response => {
    return new Response(JSON.stringify({ message }), {
        status,
        headers: {
            "Content-Type": "application/json",
        },
    });
};