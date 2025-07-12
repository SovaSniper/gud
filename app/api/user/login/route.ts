import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserLoginRequest } from "@/lib/api/user-login";
import { UserDatabase } from "@/lib/database/db";

export async function POST(request: NextRequest) {
    const { email, password }: UserLoginRequest = await request.json()

    const db = new UserDatabase()
    const user = await db.getUserByEmail(email)

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    // Strip password from response
    const { password: _p, ...safeUser } = user;
    return NextResponse.json({ ...safeUser })
}