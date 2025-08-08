import { OnboardingPage } from "@/components/auth/onboarding";
import { ONBOARDING_COOKIE_KEY } from "@/lib/supabase/utils/onboarding-cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const cookieStore = await cookies();
    const onboarding = cookieStore.get(ONBOARDING_COOKIE_KEY)?.value === "true"

    if (onboarding) {
        console.log("user already onboarded")
        redirect('/home')
    }

    return (
        <div className="h-[100vh] w-[100%]">
            <OnboardingPage />
        </div>
    );
}
