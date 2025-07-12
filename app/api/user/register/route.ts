import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { UserRegisterRequest } from "@/lib/api/user/register";
import { UserDatabase } from "@/lib/database/db";
import { User } from "@/lib/models/user";

export async function POST(request: NextRequest) {
    const registration: UserRegisterRequest = await request.json()

    const hashedPassword = await hash(registration.password, 12);

    const user: User = {
        handler: registration.handler,
        email: registration.email,
        firstName: registration.firstname,
        surname: registration.surname,
        hashedPassword,
        createdAt: new Date()
    }
    const db = new UserDatabase()
    const objId = await db.storeUser(user)

    console.log(objId, user)
    return NextResponse.json({ handler: registration.handler })
}