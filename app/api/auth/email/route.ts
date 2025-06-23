import { NextRequest, NextResponse } from "next/server";
import { UserDatabase } from "@/lib/database/db";
import { AuthEmailRequest, AuthEmailResponse } from "@/lib/api/auth-email";

export async function POST(request: NextRequest) {
    const { value }: AuthEmailRequest = await request.json()

    const db = new UserDatabase()
    const exist = await db.emailExists(value)

    const response: AuthEmailResponse = { available: !exist }
    return NextResponse.json(response)
}