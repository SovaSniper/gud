import { SignUpSection } from "@/components/auth/signup";

export default async function Page() {
    return (
        <div className="h-[100vh] w-[100%] flex items-center justify-center">
            <SignUpSection />
        </div>
    );
}
