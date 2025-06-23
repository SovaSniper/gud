import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { UserEditRequest } from "@/lib/api/user-edit";
import { UserDatabase } from "@/lib/database/db";

export async function POST(request: NextRequest) {
    const { email, dob, password }: UserEditRequest = await request.json()

    const data = await getServerSession(authOptions);
    const user = data?.user?.email;
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const updateFields: Partial<UserEditRequest> = {};
    if (email !== undefined) updateFields.email = email;
    if (dob !== undefined) updateFields.dob = dob;
    if (password !== undefined) updateFields.password = password;

    // Optional: validate fields (e.g., password length, dob format)

    const repo = new UserDatabase()
    const context = await repo.context();
    const result = await context
        .collection("users")
        .updateOne(
            { email: user },
            { $set: updateFields }
        );

    if (result.modifiedCount === 0) {
        return new Response("No changes made", { status: 304 });
    }
    return NextResponse.json({ result: true })
}