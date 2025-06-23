import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { UserRegisterRequest } from "@/lib/api/user-register";
import { UserDatabase } from "@/lib/database/db";

export async function POST(request: NextRequest) {
    const registration: UserRegisterRequest = await request.json()

    const hashedPassword = await hash(registration.password, 12);

    const db = new UserDatabase()
    const user = await db.storeUser({ ...registration, password: hashedPassword })
    console.log(user)
    return NextResponse.json({ ...registration, password: hashedPassword })
}