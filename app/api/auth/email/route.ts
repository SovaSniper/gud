import { NextRequest, NextResponse } from "next/server";
import { UserDatabase } from "@/lib/database/db";
import { AuthEmailRequest, AuthEmailResponse } from "@/lib/api/auth-email";

export async function POST(request: NextRequest): Promise<NextResponse<AuthEmailResponse>> {
    const { email, handler }: AuthEmailRequest = await request.json()

    const db = new UserDatabase()
    const { emailExist, handlerExist } = await db.emailExists(email, handler)

    return NextResponse.json({
        isUserNameAvailable: !emailExist,
        isHandlerAvailable: !handlerExist
    })
}