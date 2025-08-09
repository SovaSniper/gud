import { UserOnboardRequest } from "@/lib/api/user/onboard";
import { createClient } from "@/lib/supabase/server";
import { ONBOARDING_COOKIE_KEY } from "@/lib/supabase/utils/onboarding-cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { firstname, lastname }: UserOnboardRequest = await request.json()

    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!user?.id) {
        return new Response("Unknown User", { status: 401 });
    }

    const { error: updateError } = await supabase
        .from("user")
        .update({
            firstname,
            lastname,
            onboarded: true,
        })
        .eq("uuid", user.id);

    if (updateError) {
        console.error(updateError);
        return new Response("Failed to update user", { status: 500 });
    }

    const cookieStore = await cookies()
    cookieStore.set(ONBOARDING_COOKIE_KEY, true.toString(), {
        path: '/',
        // httpOnly: false,
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({ status: true })
}