import { OnboardingSection } from "@/components/auth/onboarding";
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
        <div className="min-h-screen min-w-screen max-h-screen flex items-center justify-center">
            <OnboardingSection />
        </div>
    );
}
